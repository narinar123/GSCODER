import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Globe, Settings, Search, Lightbulb, Code2, TestTube, Rocket, FlaskConical,
  Brain, Calendar, Mail, BarChart3, Phone, MessageCircle, Globe2, Activity,
  Zap, Monitor, Lock, Wrench, Clock, ChevronRight, Sparkles, Bot,
  ArrowRight, Menu, X
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL = "https://www.gsgroups.net/gslogo.png";

const steps = [
  { icon: Search, label: "RESEARCH" },
  { icon: Lightbulb, label: "IDEATE" },
  { icon: FlaskConical, label: "SOLUTIONS" },
  { icon: Code2, label: "IMPLEMENT" },
  { icon: TestTube, label: "TESTING" },
  { icon: Rocket, label: "SHIP & DEPLOY" },
];

const aliceApps = [
  { icon: Brain, label: "Memory" },
  { icon: Clock, label: "Scheduled" },
  { icon: Mail, label: "Email" },
  { icon: BarChart3, label: "Meetings AI" },
  { icon: Calendar, label: "Calendar" },
  { icon: Wrench, label: "Skills" },
  { icon: Lock, label: "Access" },
  { icon: MessageCircle, label: "Slack" },
  { icon: Phone, label: "Phone" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Globe2, label: "Browser" },
  { icon: Activity, label: "Activity" },
  { icon: Zap, label: "Triggers" },
  { icon: Monitor, label: "SaaS Analyst" },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <img src={LOGO_URL} alt="GS Logo" className="w-8 h-8 rounded-lg object-contain" />
          <span className="text-sm font-bold tracking-wider text-foreground">GSQODER.AI</span>
        </div>
        <button onClick={() => setMobileMenu(!mobileMenu)} className="p-2 rounded-xl hover:bg-muted text-foreground">
          {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-b border-border bg-card overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {["Home", "Agents", "Integrations", "Skills", "Settings"].map((item) => (
                <button key={item} className="block w-full text-left px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border rounded-2xl overflow-hidden bg-card">
          {/* Left Column */}
          <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[640px]">
            <div className="space-y-7">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <img src={LOGO_URL} alt="GS Logo" className="w-10 h-10 rounded-xl object-contain" />
                <div>
                  <span className="text-sm font-bold tracking-[0.15em] uppercase text-foreground">
                    GSQODER<span className="text-primary">.AI</span>
                  </span>
                  <p className="text-[10px] text-muted-foreground tracking-wider">652 Coworkers</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                  Hello there, let's build{" "}
                  <span className="gradient-text">smarter.</span>
                </h1>
                <div className="h-1 w-28 gradient-bar rounded-full" />
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                  Your AI workspace to research, ideate, implement and ship with confidence.
                </p>
              </motion.div>

              {/* Process Steps */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-2"
              >
                {steps.map((step, i) => (
                  <motion.button
                    key={step.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveStep(i)}
                    className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl border transition-all duration-200 text-[9px] tracking-[0.15em] font-semibold uppercase ${
                      activeStep === i
                        ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10"
                        : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    <step.icon className="w-4 h-4" />
                    {step.label}
                  </motion.button>
                ))}
              </motion.div>

              {/* AI Agent Quick Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-secondary/30"
              >
                <Bot className="w-5 h-5 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">AI Agent Ready</p>
                  <p className="text-[10px] text-muted-foreground">200+ skills • Automation • Generative AI • Marketing</p>
                </div>
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 pt-6"
            >
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => navigate("/")}
                  className="px-8 py-3 rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold text-sm gap-2 group"
                >
                  Login / Register
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
                <Select defaultValue="en">
                  <SelectTrigger className="w-[120px] rounded-full border-border bg-secondary/50 text-xs">
                    <Globe className="w-3.5 h-3.5 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="hi">हिन्दी</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <button className="flex items-center gap-2 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="w-3.5 h-3.5" /> Network Settings
              </button>
            </motion.div>
          </div>

          {/* Right Column — Alice's Apps Style */}
          <RightAppsPanel apps={aliceApps} hoveredApp={hoveredApp} setHoveredApp={setHoveredApp} />
        </div>
      </div>

      {/* Bottom App Bar (mobile) */}
      <div className="md:hidden border-t border-border bg-card px-2 py-2 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max justify-center">
          {aliceApps.map((app) => (
            <button key={app.label} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title={app.label}>
              <app.icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RightAppsPanel({
  apps,
  hoveredApp,
  setHoveredApp,
}: {
  apps: typeof aliceApps;
  hoveredApp: string | null;
  setHoveredApp: (v: string | null) => void;
}) {
  return (
    <div className="relative border-l border-border bg-card flex flex-col min-h-[640px]">
      {/* Window dots + title */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
        </div>
        <div className="flex-1 flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          Home
        </div>
      </div>

      {/* Chat bubble */}
      <div className="px-6 pt-5 pb-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">GSQODER AI</p>
            <div className="mt-1 px-3 py-2 rounded-xl bg-secondary/60 border border-border text-xs text-muted-foreground leading-relaxed">
              Hi — I'm your AI assistant. What can I help you with today?
            </div>
          </div>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="flex-1 px-6 pb-4 overflow-y-auto">
        <p className="text-sm font-bold text-foreground mb-4">Open AI Apps</p>
        <div className="grid grid-cols-4 gap-2.5">
          {apps.map((app, i) => (
            <motion.button
              key={app.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredApp(app.label)}
              onMouseLeave={() => setHoveredApp(null)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${
                hoveredApp === app.label
                  ? "border-primary/50 bg-primary/5 text-primary shadow-lg shadow-primary/5"
                  : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              <app.icon className="w-5 h-5" />
              <span className="text-[9px] font-medium truncate w-full text-center">{app.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Prompt Bar */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-secondary/40">
          <span className="text-xs text-muted-foreground flex-1">Ask me anything...</span>
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <ChevronRight className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
