import { useEffect, useState } from "react";

export default function useLocalStorageNumber(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const valueStr = window.localStorage.getItem(key); //문자열이 저장되므로
    if (valueStr) {
      setValue(Number(valueStr));
    }
  }, [key]); //key가 변경될 때만 하면 됨

  useEffect(() => {
    const prev = window.localStorage.getItem(key);
    const next = String(value);
    if (prev !== next) {
      window.localStorage.setItem(key, next);
    }
  }, [key, value]);
  return [value, setValue];
}
