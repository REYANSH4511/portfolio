"use client";

import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

const commands = [
  { cmd: "whoami", out: "Reyansh Joshi" },
  { cmd: "curl -s reyansh.dev/health", out: '{"status":"healthy","uptime":"99.9%"}' },
  { cmd: "ls ./expertise", out: "nodejs react python aws mongodb langchain" },
];

export function TypingTerminal() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "output" | "deleting">("typing");
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursor = setInterval(() => setShowCursor((s) => !s), 530);
    return () => clearInterval(cursor);
  }, []);

  useEffect(() => {
    const current = commands[index];
    let timer: NodeJS.Timeout;

    if (phase === "typing") {
      if (text.length < current.cmd.length) {
        timer = setTimeout(() => {
          setText(current.cmd.slice(0, text.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => setPhase("output"), 700);
      }
    } else if (phase === "output") {
      timer = setTimeout(() => setPhase("deleting"), 2200);
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 40);
      } else {
        timer = setTimeout(() => {
          setIndex((i) => (i + 1) % commands.length);
          setPhase("typing");
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [text, phase, index]);

  return (
    <div className="rounded-xl border border-border bg-elevated p-4 font-mono text-sm shadow-sm backdrop-blur-sm sm:p-5">
      <div className="flex items-center gap-2 border-b border-border pb-2 mb-3">
        <Terminal className="h-4 w-4 text-muted" />
        <span className="text-xs text-muted">reyansh@portfolio ~ </span>
      </div>
      <div className="min-h-20 space-y-1.5">
        <p className="break-words text-fg">
          <span className="text-success">$</span>{" "}
          {text}
          <span
            className={`inline-block w-2 h-4 align-middle bg-current ml-0.5 ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
          />
        </p>
        {phase === "output" && (
          <p className="text-muted animate-in fade-in duration-200">
            {commands[index].out}
          </p>
        )}
      </div>
    </div>
  );
}
