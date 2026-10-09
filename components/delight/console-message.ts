"use client";

import { useEffect } from "react";

export function ConsoleMessage() {
  useEffect(() => {
    const style =
      "color:#D4A574;font-family:Georgia,serif;font-size:14px;font-weight:600;";
    console.log(
      "%cPrince Pandey · AI/ML Engineer\n%cMumbai · Python · ML · LLM apps\n\nHiring? princep22196@gmail.com\nhttps://github.com/Prince-8286",
      style,
      "color:#A8A59C;font-size:12px;",
    );
  }, []);

  return null;
}
