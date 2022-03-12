//keyboard 조작 handler
//hotkey.js 라이브러리 사용
//hotkeys(key, () => {});

import hotkeys from "hotkeys-js";

const observerMap = {};
export function addKeyObserver(key, callBack) {
  if (!observerMap[key]) {
    observerMap[key] = [];
    hotkeys(key, () => executeCallbacks(key));
  }
  observerMap[key].push(callBack);
}

export function removeKeyObserver(key, callBack) {
  observerMap[key] = observerMap[key].filter((item) => item !== callBack); //callback이 아닌것만 제거
}

function executeCallbacks(key) {
  for (const ob of observerMap[key]) {
    ob();
  }
}
