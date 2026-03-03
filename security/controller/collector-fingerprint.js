/**
 * collector-fingerprint.js
 * 룰 베이스 Bot Detection - Static / Fingerprint 수집
 */

'use client';

export function collectFingerprint() {
  if (typeof window === 'undefined') return {};

  const fp = {};

  // 1. WebDriver 체크
  fp.webdriver = !!navigator.webdriver;

  // 2. Selenium 및 자동화 도구 흔적
  fp.seleniumArtifact =
    Object.keys(window).some(
      (key) => key.startsWith('cdc_') || key.startsWith('$cdc_')
    ) ||
    !!document.documentElement.getAttribute('webdriver') ||
    !!window.__webdriver_evaluate ||
    !!window.__selenium_evaluate;

  // 3. Headless 브라우저 특징 (Chrome 기준)
  fp.headlessFlag =
    !window.chrome ||
    navigator.plugins.length === 0 ||
    navigator.languages.length === 0;

  // 4. User-Agent 분석
  const ua = navigator.userAgent.toLowerCase();
  fp.uaBotKeyword = /bot|headless|pixel|selenium|phantomjs|puppeteer/.test(ua);

  // 5. UA 구조 이상 (Chrome 버전 빌드 번호 검증 등)
  const chromeMatch = navigator.userAgent.match(/Chrome\/(\d+)\.(\d+)\.(\d+)\.(\d+)/);
  fp.uaStructure = chromeMatch ? parseInt(chromeMatch[3]) > 9999 : false;

  // 6. 하드웨어 정보 불일치 (Plugins 0인데 Memory 정보 없음 등)
  fp.noPluginsMemory = navigator.plugins.length === 0 && navigator.deviceMemory === undefined;

  // 7. WebGL GPU 가속 정보 (가상 환경 탐지)
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
        fp.swiftShader = renderer.includes('swiftshader') || renderer.includes('llvmpipe');
      }
      fp.lowTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) < 4096;
    }
  } catch (e) {
    fp.swiftShader = false;
    fp.lowTextureSize = false;
  }

  // 8. 터치 지원과 UA 불일치
  const isMobileUa = /android|iphone|ipad|mobile/i.test(ua);
  const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  fp.touchUaMismatch = isMobileUa && !hasTouchSupport;

  return fp;
}