import { useState } from "react";
import { Sparkles, Zap, DollarSign, ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

const models = [
  { name: "GPT-5", provider: "OpenAI", enabled: true, cost: "$30/1M tokens", speed: "Fast", quality: "Excellent", fallback: "Claude 4" },
  { name: "Claude 4 Opus", provider: "Anthropic", enabled: true, cost: "$15/1M tokens", speed: "Fast", quality: "Excellent", fallback: "GPT-5" },
  { name: "Claude 4 Sonnet", provider: "Anthropic", enabled: true, cost: "$3/1M tokens", speed: "Very Fast", quality: "Great", fallback: "Gemini Pro" },
  { name: "Gemini Ultra", provider: "Google", enabled: true, cost: "$7/1M tokens", speed: "Fast", quality: "Great", fallback: "Claude 4 Sonnet" },
  { name: "Gemini Pro", provider: "Google", enabled: false, cost: "$1.25/1M tokens", speed: "Very Fast", quality: "Good", fallback: "Qwen 3" },
  { name: "DeepSeek V3", provider: "DeepSeek", enabled: true, cost: "$0.27/1M tokens", speed: "Fast", quality: "Great", fallback: "Mistral Large" },
  { name: "Qwen 3", provider: "Alibaba", enabled: false, cost: "$0.40/1M tokens", speed: "Fast", quality: "Good", fallback: "DeepSeek V3" },
  { name: "Grok 3", provider: "xAI", enabled: false, cost: "$5/1M tokens", speed: "Medium", quality: "Great", fallback: "GPT-5" },
  { name: "Mistral Large", provider: "Mistral", enabled: true, cost: "$2/1M tokens", speed: "Fast", quality: "Great", fallback: "DeepSeek V3" },
  { name: "OpenRouter Auto", provider: "OpenRouter", enabled: true, cost: "Variable", speed: "Variable", quality: "Auto", fallback: "-" },
];

const routingRules = [
  { task: "Code Generation", model: "DeepSeek V3", reason: "Best code quality/cost ratio" },
  { task: "Creative Writing", model: "Claude 4 Opus", reason: "Superior creative output" },
  { task: "Research & Analysis", model: "GPT-5", reason: "Strongest reasoning" },
  { task: "Quick Tasks", model: "Claude 4 Sonnet", reason: "Speed + quality balance" },
  { task: "Data Analysis", model: "Gemini Ultra", reason: "Large context window" },
];

export default function ModelsPage() {
  const [modelList, setModelList] = useState(models);

  const toggleModel = (name: string) => {
    setModelList((m) => m.map((mod) => mod.name === name ? { ...mod, enabled: !mod.enabled } : mod));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Model Providers</h1>
        <p className="text-sm text-muted-foreground mt-0.5">LLM routing, cost optimization, fallback chains</p>
      </div>

      {/* Auto-routing */}
      <div className="border border-border rounded-2xl bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <p className="text-xs font-semibold text-foreground">Automatic Model Routing</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="space-y-2">
          {routingRules.map((rule) => (
            <div key={rule.task} className="flex items-center gap-3 text-xs">
              <span className="text-muted-foreground w-36">{rule.task}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
              <span className="font-medium text-primary">{rule.model}</span>
              <span className="text-muted-foreground ml-auto text-[10px] hidden sm:block">{rule.reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Models */}
      <div className="space-y-2">
        {modelList.map((mod, i) => (
          <motion.div
            key={mod.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-4 border border-border rounded-xl bg-card px-5 py-4 hover:border-primary/30 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{mod.name}</p>
              <p className="text-[10px] text-muted-foreground">{mod.provider} · Fallback: {mod.fallback}</p>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{mod.cost}</span>
              <span>{mod.speed}</span>
              <span>{mod.quality}</span>
            </div>
            <Switch checked={mod.enabled} onCheckedChange={() => toggleModel(mod.name)} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
