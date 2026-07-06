import { useState, useRef, useEffect } from "react";
import {
  Send, Paperclip, Mic, Image, Globe, FileText, Bot, Sparkles,
  ChevronDown, Copy, RotateCcw, ThumbsUp, ThumbsDown, Code2, StopCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  model?: string;
  ts: Date;
}

const models = [
  { id: "gpt5", name: "GPT-5", provider: "OpenAI" },
  { id: "claude", name: "Claude 4", provider: "Anthropic" },
  { id: "gemini", name: "Gemini Ultra", provider: "Google" },
  { id: "deepseek", name: "DeepSeek V3", provider: "DeepSeek" },
  { id: "qwen", name: "Qwen 3", provider: "Alibaba" },
  { id: "grok", name: "Grok 3", provider: "xAI" },
  { id: "mistral", name: "Mistral Large", provider: "Mistral" },
];

const sampleReplies = [
  "I'll help you with that. Here's my analysis:\n\n```typescript\nconst agent = new AIAgent({\n  model: 'gpt-5',\n  tools: ['code', 'search', 'browser'],\n  memory: true\n});\n\nawait agent.execute(task);\n```\n\nThis creates an agent with code generation, web search, and browser automation capabilities. The agent persists memory across sessions for context continuity.",
  "Based on my research, here are the key findings:\n\n1. **Architecture**: Microservices pattern with event-driven communication\n2. **Stack**: Next.js + FastAPI + PostgreSQL + Redis\n3. **AI Layer**: LangChain orchestration with multi-model routing\n4. **Deployment**: Kubernetes with auto-scaling\n\nWould you like me to generate the implementation plan?",
  "I've analyzed the document and extracted the following insights:\n\n- Revenue increased 34% QoQ\n- Customer acquisition cost decreased by 12%\n- Net promoter score: 72 (up from 65)\n\n**Recommendation**: Focus on retention strategies in Q3 while maintaining current acquisition channels.",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("gpt5");
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input, ts: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsStreaming(true);

    // Simulate streaming response
    const reply = sampleReplies[messages.length % sampleReplies.length];
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      model: models.find((m) => m.id === model)?.name,
      ts: new Date(),
    };
    setMessages((m) => [...m, assistantMsg]);

    let i = 0;
    const interval = setInterval(() => {
      i += Math.floor(Math.random() * 3) + 1;
      if (i >= reply.length) {
        i = reply.length;
        clearInterval(interval);
        setIsStreaming(false);
      }
      setMessages((msgs) =>
        msgs.map((m) => (m.id === assistantMsg.id ? { ...m, content: reply.slice(0, i) } : m))
      );
    }, 15);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] max-w-4xl mx-auto">
      {/* Model selector */}
      <div className="flex items-center justify-between py-3 border-b border-border">
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger className="w-[200px] bg-secondary border-border text-xs h-8">
            <Bot className="w-3.5 h-3.5 mr-1.5 text-primary" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {models.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                <span className="font-medium">{m.name}</span>
                <span className="text-muted-foreground ml-1.5">· {m.provider}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-success" />
          Streaming enabled
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6">
        {messages.length === 0 && <EmptyState />}
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary border border-border"
                }`}
              >
                <MessageContent content={msg.content} />
                {msg.role === "assistant" && msg.content && !isStreaming && (
                  <div className="flex items-center gap-1 mt-3 pt-2 border-t border-border">
                    {[Copy, RotateCcw, ThumbsUp, ThumbsDown].map((Icon, i) => (
                      <button key={i} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <Icon className="w-3 h-3" />
                      </button>
                    ))}
                    {msg.model && (
                      <span className="ml-auto text-[9px] text-muted-foreground">{msg.model}</span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isStreaming && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Generating...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border pt-4 pb-2">
        <div className="border border-border rounded-2xl bg-card focus-within:border-primary/50 transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything... Code, research, analyze, generate..."
            className="w-full bg-transparent px-4 pt-4 pb-2 text-sm resize-none focus:outline-none min-h-[80px] text-foreground placeholder:text-muted-foreground"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
            }}
          />
          <div className="flex items-center justify-between px-3 py-2 border-t border-border">
            <div className="flex gap-1">
              {[Paperclip, Image, FileText, Globe, Code2, Mic].map((Icon, i) => (
                <button key={i} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
            {isStreaming ? (
              <Button size="icon" variant="destructive" className="w-8 h-8 rounded-full" onClick={() => setIsStreaming(false)}>
                <StopCircle className="w-4 h-4" />
              </Button>
            ) : (
              <Button size="icon" onClick={handleSend} disabled={!input.trim()} className="w-8 h-8 rounded-full bg-primary">
                <Send className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  // Simple markdown-like rendering for code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);
  return (
    <div className="space-y-2">
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const code = part.replace(/```\w*\n?/, "").replace(/```$/, "");
          return (
            <pre key={i} className="bg-background rounded-xl p-3 text-xs font-mono overflow-x-auto border border-border">
              <code>{code}</code>
            </pre>
          );
        }
        return part.split("\n").map((line, j) => {
          const bold = line.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
          return <p key={`${i}-${j}`} className="text-sm" dangerouslySetInnerHTML={{ __html: bold || "&nbsp;" }} />;
        });
      })}
    </div>
  );
}

function EmptyState() {
  const suggestions = [
    "Build a multi-agent workflow for code review",
    "Analyze this PDF and create a summary",
    "Generate a landing page with Next.js",
    "Research competitor pricing strategies",
    "Create a marketing automation pipeline",
    "Write unit tests for my API endpoints",
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Sparkles className="w-7 h-7 text-primary" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-foreground">GSQoderAI Chat</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Chat with AI. Supports code, research, analysis, image generation, and multi-agent collaboration.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center max-w-lg">
        {suggestions.map((s) => (
          <button key={s} className="px-3 py-1.5 rounded-xl border border-border bg-secondary/40 text-[11px] text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
