/**
 * rule-engine.js
 * 룰 베이스 Bot Detection - 백엔드 판정 엔진
 *
 * 역할: 프론트에서 수집된 fingerprint를 받아 점수 계산 후 판정 반환
 * 반환값: 'BLOCK' | 'CHALLENGE' | 'ALLOW'
 *
 * ⚠️ 점수/threshold 변경은 rules-config.js에서만 하세요.
 */

const {
  THRESHOLDS,
  CRITICAL_AUTOMATION_GROUP,
  CRITICAL_SINGLE_RULES,
  SWIFT_SHADER_COMBOS,
  RULES,
} = require('./rules-config');

/**
 * 메인 판정 함수
 *
 * @param {Object} signals - 프론트 collector.js가 수집한 신호 객체
 * @returns {{ action: string, score: number, triggeredRules: string[] }}
 */
function evaluate(signals) {
  const triggeredRules = [];

  // ─────────────────────────────────────────────
  // 1단계: Critical 룰 체크 (즉시 BLOCK)
  // ─────────────────────────────────────────────

  // Automation Detection 그룹 (webdriver / selenium / headless)
  // 셋 중 하나라도 걸리면 100점 고정, 중복 방지
  const automationHit = CRITICAL_AUTOMATION_GROUP.find(ruleId => signals[ruleId]);
  if (automationHit) {
    CRITICAL_AUTOMATION_GROUP.forEach(id => {
      if (signals[id]) triggeredRules.push(id);
    });
    return buildResult('BLOCK', 100, triggeredRules);
  }

  // 단독 Critical 룰 (UA 봇 키워드, Honeypot)
  for (const ruleId of CRITICAL_SINGLE_RULES) {
    if (signals[ruleId]) {
      triggeredRules.push(ruleId);
      return buildResult('BLOCK', 100, triggeredRules);
    }
  }

  // ─────────────────────────────────────────────
  // 2단계: 조합 룰 (SwiftShader)
  // ─────────────────────────────────────────────
  if (signals.swiftShader) {
    triggeredRules.push('swiftShader');

    let compositeScore = SWIFT_SHADER_COMBOS.baseScore;
    const bonuses = SWIFT_SHADER_COMBOS.bonusScores;

    if (signals.noMouse)     { compositeScore += bonuses.noMouse;     triggeredRules.push('noMouse_combo'); }
    if (signals.uaStructure) { compositeScore += bonuses.uaStructure; triggeredRules.push('uaStructure_combo'); }
    if (signals.noFocusBlur) { compositeScore += bonuses.noFocusBlur; triggeredRules.push('noFocusBlur_combo'); }

    if (compositeScore >= SWIFT_SHADER_COMBOS.blockThreshold) {
      return buildResult('BLOCK', compositeScore, triggeredRules);
    }
    // 조합 미달이면 compositeScore는 버리고 아래 일반 룰에서 swiftShader 점수만 누적
  }

  // ─────────────────────────────────────────────
  // 3단계: 일반 룰 누적 점수 계산
  // ─────────────────────────────────────────────
  // swiftShader 조합 체크에서 이미 triggeredRules에 들어간 룰은 중복 추가 방지
  const alreadyTracked = new Set(triggeredRules);
  let totalScore = 0;

  for (const rule of RULES) {
    if (signals[rule.id]) {
      totalScore += rule.score;
      if (!alreadyTracked.has(rule.id)) {
        triggeredRules.push(rule.id);
      }
    }
  }

  // ─────────────────────────────────────────────
  // 최종 판정
  // ─────────────────────────────────────────────
  if (totalScore >= THRESHOLDS.BLOCK)     return buildResult('BLOCK',     totalScore, triggeredRules);
  if (totalScore >= THRESHOLDS.CHALLENGE) return buildResult('CHALLENGE', totalScore, triggeredRules);
  return buildResult('ALLOW', totalScore, triggeredRules);
}

/**
 * 결과 객체 생성 헬퍼
 */
function buildResult(action, score, triggeredRules) {
  return { action, score, triggeredRules };
}

module.exports = { evaluate };


// ─────────────────────────────────────────────
// 로컬 테스트용 (node rule-engine.js 로 직접 실행 시)
// ─────────────────────────────────────────────
if (require.main === module) {
  const testCases = [
    {
      label: '🤖 명확한 봇 (webdriver + UA 키워드)',
      signals: { webdriver: true, uaBotKeyword: true },
    },
    {
      label: '🤖 Selenium 봇',
      signals: { seleniumArtifact: true },
    },
    {
      label: '⚠️ SwiftShader 조합 봇 (compositeScore 205)',
      signals: { swiftShader: true, noMouse: true, uaStructure: true, noFocusBlur: true },
    },
    {
      label: '⚠️ SwiftShader 단독 (조합 미달 → 일반 누적)',
      signals: { swiftShader: true },
    },
    {
      label: '⚠️ 마라톤 타이밍 봇 (3초 + 800ms + 마우스 없음)',
      signals: { submitWithin3s: true, submitWithin800ms: true, noMouse: true },
    },
    {
      label: '⚠️ CHALLENGE 구간 (스크롤 없음 + clipboard + backgroundTab)',
      signals: { noScroll: true, clipboardOveruse: true, backgroundTab: true },
    },
    {
      label: '✅ 정상 사용자',
      signals: {},
    },
  ];

  console.log('=== Rule Engine Test ===\n');
  for (const tc of testCases) {
    const result = evaluate(tc.signals);
    console.log(`${tc.label}`);
    console.log(`  → action: ${result.action} | score: ${result.score}`);
    if (result.triggeredRules.length > 0) {
      console.log(`  → triggered: ${result.triggeredRules.join(', ')}`);
    }
    console.log();
  }
}