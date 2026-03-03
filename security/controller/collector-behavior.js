/**
 * collector-behavior.js
 * 룰 베이스 Bot Detection - 사용자 행동 패턴 수집 훅
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { collectFingerprint } from './collector-fingerprint';

export function useCollector() {
  const state = useRef({
    pageLoadTime: null,
    firstInputTime: null,
    lastInputTime: null,
    mouseMoveCount: 0,
    scrollCount: 0,
    keydownCount: 0,
    inputEventCount: 0,
    focusCount: 0,
    blurCount: 0,
    pasteCount: 0,
    pastedFields: new Set(),
    submitAttemptCount: 0,
    lastSubmitTime: null,
    fastRetryCount: 0,
    honeypotFilled: false,
    hiddenDuration: 0,
    hiddenStart: null,
  });

  const fingerprint = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Strict Mode 대응: 최초 1회만 기록
    if (!state.current.pageLoadTime) {
      state.current.pageLoadTime = Date.now();
      fingerprint.current = collectFingerprint();
    }

    // 성능을 위한 passive listener 옵션
    const passiveOpt = { passive: true };
    const captureOpt = { capture: true, passive: true };

    const onMouseMove = () => { state.current.mouseMoveCount++; };
    const onScroll = () => { state.current.scrollCount++; };
    const onKeydown = () => { state.current.keydownCount++; };
    const onInput = () => {
      const now = Date.now();
      if (!state.current.firstInputTime) state.current.firstInputTime = now;
      state.current.lastInputTime = now;
      state.current.inputEventCount++;
    };
    const onFocus = () => { state.current.focusCount++; };
    const onBlur = () => { state.current.blurCount++; };
    const onPaste = (e) => {
      state.current.pasteCount++;
      if (e.target?.name) state.current.pastedFields.add(e.target.name);
    };
    const onVisibility = () => {
      if (document.hidden) {
        state.current.hiddenStart = Date.now();
      } else if (state.current.hiddenStart) {
        state.current.hiddenDuration += Date.now() - state.current.hiddenStart;
        state.current.hiddenStart = null;
      }
    };

    document.addEventListener('mousemove', onMouseMove, passiveOpt);
    document.addEventListener('scroll', onScroll, passiveOpt);
    document.addEventListener('keydown', onKeydown, passiveOpt);
    document.addEventListener('input', onInput, captureOpt);
    document.addEventListener('focus', onFocus, captureOpt);
    document.addEventListener('blur', onBlur, captureOpt);
    document.addEventListener('paste', onPaste, captureOpt);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.removeEventListener('mousemove', onMouseMove, passiveOpt);
      document.removeEventListener('scroll', onScroll, passiveOpt);
      document.removeEventListener('keydown', onKeydown, passiveOpt);
      document.removeEventListener('input', onInput, captureOpt);
      document.removeEventListener('focus', onFocus, captureOpt);
      document.removeEventListener('blur', onBlur, captureOpt);
      document.removeEventListener('paste', onPaste, captureOpt);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const getHoneypotProps = useCallback((name = 'website') => ({
    name,
    autoComplete: 'off',
    tabIndex: -1,
    'aria-hidden': true,
    style: { position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' },
    onChange: () => { state.current.honeypotFilled = true; },
  }), []);

  const recordSubmitAttempt = useCallback(() => {
    const now = Date.now();
    if (state.current.lastSubmitTime && (now - state.current.lastSubmitTime < 3000)) {
      state.current.fastRetryCount++;
    }
    state.current.submitAttemptCount++;
    state.current.lastSubmitTime = now;
  }, []);

  const getSignals = useCallback(() => {
    const s = state.current;
    const fp = fingerprint.current || {};
    const now = Date.now();
    const timeSinceLoad = s.pageLoadTime ? now - s.pageLoadTime : 0;
    const inputDur = (s.firstInputTime && s.lastInputTime) ? s.lastInputTime - s.firstInputTime : 0;

    return {
      // Fingerprint
      ...fp,
      // Timing
      submitWithin3s: timeSinceLoad < 3000,
      submitWithin800ms: timeSinceLoad < 800,
      inputUnder1s: inputDur > 0 && inputDur < 1000,
      uniformInputGap: inputDur > 0 && inputDur < 300,
      // Behavior
      noMouse: s.mouseMoveCount === 0,
      noScroll: s.scrollCount === 0,
      noFocusBlur: s.focusCount === 0 && s.blurCount === 0,
      fastRetry: s.fastRetryCount >= 3,
      // Input
      keydownMismatch: s.keydownCount < s.inputEventCount * 0.5,
      clipboardOveruse: s.pastedFields.size >= 3,
      honeypot: s.honeypotFilled,
      // Session
      referrerInvalid: !document.referrer,
      backgroundTab: s.hiddenDuration > 5000,
      // Meta
      _meta: { ...s, timeSinceLoad, inputDur, pastedFields: Array.from(s.pastedFields) }
    };
  }, []);

  return { getSignals, getHoneypotProps, recordSubmitAttempt };
}