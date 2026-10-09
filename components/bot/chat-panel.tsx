"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bird, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GREETING, QUICK_REPLIES, answer, type BotLink } from "./brain";

type Msg = { from: "bot" | "user"; text: string; links?: BotLink[] };

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 px-1 py-2" aria-label="typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-text-muted"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: GREETING.text }]);
  const [typing, setTyping] = useState(false);
  const [val, setVal] = useState("");
  const timer = useRef<number | null>(null);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, typing]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [onClose]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setVal("");
    setTyping(true);
    timer.current = window.setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", ...answer(text) }]);
      setTyping(false);
    }, 750);
  };

  return (
    <motion.div
      role="dialog"
      aria-label="Chat with Prince's AI"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 left-4 right-4 z-[80] flex max-h-[68vh] flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border-default bg-surface-1 shadow-[var(--shadow-lg)] sm:left-auto sm:w-[380px]"
    >
      <div className="flex items-center gap-2.5 border-b border-border-subtle px-4 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-text-inverse">
          <Bird className="h-4 w-4" aria-hidden />
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium text-text-primary">Prince&apos;s AI</p>
          <p className="flex items-center gap-1.5 font-mono text-[0.65rem] text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
            answers from the portfolio
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-md p-1.5 text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={m.from === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={
                m.from === "user"
                  ? "max-w-[85%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2.5 text-sm text-text-inverse"
                  : "max-w-[85%] rounded-2xl rounded-bl-md border border-border-subtle bg-surface-2 px-3.5 py-2.5 text-sm text-text-primary"
              }
            >
              <p>{m.text}</p>
              {m.links?.length ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.links.map((l) => (
                    <a
                      key={l.href + l.label}
                      href={l.href}
                      className="rounded-md border border-accent/40 px-2 py-1 font-mono text-[0.7rem] text-accent transition-colors hover:bg-accent-muted"
                    >
                      {l.label} →
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {typing ? (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md border border-border-subtle bg-surface-2 px-3.5">
              <TypingDots />
            </div>
          </div>
        ) : null}
        <div ref={bottom} />
      </div>

      <div className="border-t border-border-subtle px-3 pb-2 pt-2.5">
        <div className="flex gap-1.5 overflow-x-auto pb-2">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              className="whitespace-nowrap rounded-full border border-border-default px-2.5 py-1 font-mono text-[0.68rem] text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"
            >
              {q}
            </button>
          ))}
        </div>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            send(val);
          }}
        >
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Ask about skills, projects…"
            aria-label="Ask Prince's AI"
            className="h-10 flex-1 rounded-[var(--radius-md)] border border-border-default bg-surface-0 px-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
          />
          <Button type="submit" size="icon" aria-label="Send message">
            <Send className="h-4 w-4" aria-hidden />
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
