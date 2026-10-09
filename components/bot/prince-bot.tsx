"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BirdLauncher } from "./bird-launcher";
import { ChatPanel } from "./chat-panel";

export function PrinceBot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BirdLauncher onToggle={() => setOpen((o) => !o)} />
      <AnimatePresence>
        {open ? <ChatPanel onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}
