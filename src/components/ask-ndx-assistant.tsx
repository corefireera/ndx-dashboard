"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { assistantDisclaimer, assistantIntro } from "@/data/disclaimers";
import { assistantInsights, defaultInsight } from "@/data/insights";
import { researchPrompts } from "@/data/topics";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    content: assistantIntro,
  },
];

const coveredInsightIds = [
  "google-tpu-nvidia-moat-2025-11",
  "ai-chain",
  "valuation",
];

function normalizeText(text: string) {
  return text.trim().toLowerCase();
}

function getLocalAnswer(question: string) {
  const normalized = normalizeText(question);

  const matchedInsight = assistantInsights
    .map((insight) => {
      const score = insight.keywords.reduce((total, keyword) => {
        const normalizedKeyword = keyword.toLowerCase();
        return normalized.includes(normalizedKeyword) ? total + 1 : total;
      }, 0);

      return {
        insight,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)[0];

  return matchedInsight?.insight.answer ?? defaultInsight;
}

export default function AskNdxAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const nextIdRef = useRef(2);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isOpen]);

  const recommendedQuestions = useMemo(
    () =>
      researchPrompts.filter((prompt) =>
        coveredInsightIds.includes(prompt.id)
      ),
    []
  );

  const askQuestion = (question: string) => {
    const trimmed = question.trim();

    if (!trimmed) {
      return;
    }

    const userMessage: ChatMessage = {
      id: nextIdRef.current++,
      role: "user",
      content: trimmed,
    };
    const assistantMessage: ChatMessage = {
      id: nextIdRef.current++,
      role: "assistant",
      content: getLocalAnswer(trimmed),
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
    setIsOpen(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    askQuestion(input);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-20 z-50 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_28px_rgba(15,23,42,0.22)] transition hover:bg-slate-800 focus:ring-2 focus:ring-slate-300 focus:outline-none sm:right-6"
        aria-label="Open Ask NDX100 assistant"
      >
        <MessageCircle size={17} strokeWidth={2} />
        Ask NDX100
      </button>

      {isOpen ? (
        <div className="fixed right-4 bottom-32 z-50 h-[min(520px,78vh)] w-[calc(100vw-2rem)] max-w-[420px] sm:right-6 sm:bottom-36 sm:w-[420px]">
          <aside className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.16)]">
            <div className="shrink-0 border-b border-stone-200 px-4 py-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                    <Sparkles size={16} className="text-slate-500" />
                    AI Research Assistant
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    聚焦纳指成分股，把握科技主线
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close Ask NDX100 assistant"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="scrollbar-hide min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3">
              <div>
                <div className="mb-2 text-xs font-medium text-slate-400">
                  推荐问题
                </div>
                <div className="flex flex-wrap gap-2">
                  {recommendedQuestions.map((prompt) => (
                    <button
                      key={prompt.id}
                      type="button"
                      onClick={() => askQuestion(prompt.question)}
                      className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-left text-[13px] leading-5 text-slate-600 transition hover:border-slate-300 hover:bg-stone-50 hover:text-slate-950"
                    >
                      {prompt.question}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[92%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-[14px] ${
                        message.role === "user"
                          ? "bg-slate-950 leading-6 text-white"
                          : "bg-slate-50 leading-7 text-slate-700"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="shrink-0 border-t border-stone-200 bg-white px-3.5 py-3">
              <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <label className="sr-only" htmlFor="ask-ndx-input">
                  输入你的研究问题
                </label>
                <textarea
                  id="ask-ndx-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey &&
                      !event.nativeEvent.isComposing
                    ) {
                      event.preventDefault();
                      askQuestion(input);
                    }
                  }}
                  rows={2}
                  placeholder="输入问题，例如：英伟达的主要风险是什么？"
                  className="max-h-24 min-h-11 flex-1 resize-none rounded-2xl border border-stone-200 bg-white px-3.5 py-2 text-[13px] leading-5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                  disabled={!input.trim()}
                  aria-label="Send research question"
                >
                  <Send size={17} />
                </button>
              </form>

              <div className="mt-2 text-center text-[11px] leading-4 text-slate-400">
                {assistantDisclaimer}
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
