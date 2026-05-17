export type ResearchPrompt = {
  id: string;
  question: string;
};

export const researchPrompts: ResearchPrompt[] = [
  {
    id: "tpu-nvidia",
    question: "Google TPU 会影响 NVIDIA 吗？",
  },
  {
    id: "ai-chain",
    question: "纳指100里的 AI 主线应该怎么看？",
  },
  {
    id: "rates",
    question: "美债利率上行会怎样影响纳指100？",
  },
  {
    id: "valuation",
    question: "当前估值处在什么风险区间？",
  },
  {
    id: "mega-cap",
    question: "七巨头对指数结构有什么影响？",
  },
  {
    id: "risks",
    question: "现在观察纳指100最该注意哪些风险？",
  },
];
