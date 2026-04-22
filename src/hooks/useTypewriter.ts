import { useEffect, useState } from "react";

export function useTypewriter(text: string, start: boolean, speed = 20) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    let i = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const type = () => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
        timeouts.push(setTimeout(type, speed));
      } else {
        setDone(true);
      }
    };
    type();

    return () => timeouts.forEach(clearTimeout);
  }, [text, start, speed]);

  return { displayed, done };
}
