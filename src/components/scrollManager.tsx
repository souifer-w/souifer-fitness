import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const positions = new Map<string, number>();

export default function ScrollManager() {
  const { pathname, key } = useLocation();
  const navigationType = useNavigationType();
  const previousKey = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (previousKey.current) {
      positions.set(previousKey.current, window.scrollY);
    }

    if (navigationType === "POP") {
      window.scrollTo({
        top: positions.get(key) ?? 0,
        left: 0,
        behavior: "instant",
      });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }

    previousKey.current = key;
  }, [pathname, key, navigationType]);

  return null;
}
