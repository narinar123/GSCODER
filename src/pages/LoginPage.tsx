import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Globe, Settings, Search, Lightbulb, Code2, TestTube, Rocket, FlaskConical,
  Brain, Calendar, Mail, BarChart3, Phone, MessageCircle, Globe2, Activity,
  Zap, Monitor, Lock, Wrench, Clock, ChevronRight, Sparkles, Bot,
  ArrowRight, Menu, X, Eye, EyeOff, AlertCircle, CheckCircle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

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
  { icon: Brain, label: "Memory", desc: "Persistent agent memory across sessions" },
  { icon: Clock, label: "Scheduled", desc: "Cron-based task scheduling" },
  { icon: Mail, label: "Email", desc: "Email send/receive automation" },
  { icon: BarChart3, label: "Meetings AI", desc: "Meeting transcription & summaries" },
  { icon: Calendar, label: "Calendar", desc: "Smart calendar management" },
  { icon: Wrench, label: "Skills", desc: "200+ custom agent skills" },
  { icon: Lock, label: "Access", desc: "Role-based access control" },
  { icon: MessageCircle, label: "Slack", desc: "Team Slack integration" },
  { icon: Phone, label: "Phone", desc: "Voice calls via AI" },
  { icon: MessageCircle, label: "WhatsApp", desc: "WhatsApp Business API" },
  { icon: Globe2, label: "Browser", desc: "Autonomous web browsing" },
  { icon: Activity, label: "Activity", desc: "Real-time activity feed" },
  { icon: Zap, label: "Triggers", desc: "Event-based workflow triggers" },
  { icon: Monitor, label: "SaaS Analyst", desc: "SaaS metrics & insights" },
];

const APP_CONTEXT: Record<string, string> = {
  Memory: "Memory Agent activated. I can now recall information from all past conversations and sessions.",
  Scheduled: "Scheduled Tasks enabled. I can run automated tasks on cron schedules you define.",
  Email: "Email connected. I can read, compose, and send emails on your behalf.",
  "Meetings AI": "Meetings AI ready. I'll join your meetings, transcribe, and provide action items.",
  Calendar: "Calendar access granted. I can schedule meetings and manage your time.",
  Skills: "200+ skills loaded. I'm now capable of coding, research, design, marketing, and more.",
  Access: "RBAC configured. Team permissions and role-based access are now managed.",
  Slack: "Slack connected. I can post messages, read channels, and notify your team.",
  Phone: "Phone integration active. I can make and receive voice calls with AI responses.",
  WhatsApp: "WhatsApp Business connected. I can handle customer messages automatically.",
  Browser: "Browser agent activated. I can autonomously browse the web and extract data.",
  Activity: "Activity monitor enabled. I'm tracking all agent actions in real-time.",
  Triggers: "Trigger engine ready. Events will now fire your custom automation workflows.",
  "SaaS Analyst": "SaaS Analyst connected. Monitoring your key metrics and growth indicators.",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn, signUp, isDemo } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState("Hi — I'm your AI assistant. What can I help you with today?");

  // Auth form state
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  const handleAppClick = (label: string) => {
    const wasActive = activeApp === label;
    setActiveApp(wasActive ? null : label);
    if (!wasActive) {
      setChatMessage(APP_CONTEXT[label] || `${label} module activated.`);
    } else {
      setChatMessage("Hi — I'm your AI assistant. What can I help you with today?");
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setAuthLoading(true);

    try {
      if (authMode === "login") {
        const { error } = await signIn(email, password);
        if (error) {
          setAuthError(error);
        } else {
          navigate("/");
        }
      } else {
        const { error } = await signUp(email, password, name);
        if (error) {
          setAuthError(error);
        } else {
          setAuthSuccess("Account created! Redirecting...");
          setTimeout(() => navigate("/"), 1500);
        }
      }
    } finally {
      setAuthLoading(false);
    }
  };

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

              {/* Auth Form */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="border border-border rounded-2xl bg-secondary/20 p-5 space-y-4"
              >
                {/* Tab toggle */}
                <div className="flex gap-1 p-1 bg-secondary/60 rounded-xl border border-border w-fit">
                  {(["login", "signup"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => { setAuthMode(m); setAuthError(null); setAuthSuccess(null); }}
                      className={`px-4 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                        authMode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {m === "login" ? "Sign In" : "Sign Up"}
                    </button>
                  ))}
                </div>

                {isDemo && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-info/10 border border-info/20 text-[10px] text-info">
                    <Sparkles className="w-3 h-3 shrink-0" />
                    Demo mode — any credentials work. Add Supabase to enable real auth.
                  </div>
                )}

                <form onSubmit={handleAuth} className="space-y-3">
                  {authMode === "signup" && (
                    <input
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                    />
                  )}
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                  />
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="w-full bg-background border border-border rounded-xl px-3 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPwd ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {authError && (
                    <div className="flex items-center gap-2 text-[11px] text-destructive">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {authError}
                    </div>
                  )}
                  {authSuccess && (
                    <div className="flex items-center gap-2 text-[11px] text-success">
                      <CheckCircle className="w-3 h-3 shrink-0" />
                      {authSuccess}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={authLoading}
                    className="w-full rounded-xl text-sm font-semibold gap-2 group"
                  >
                    {authLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        {authMode === "login" ? "Signing in..." : "Creating account..."}
                      </span>
                    ) : (
                      <>
                        {authMode === "login" ? "Sign In" : "Create Account"}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
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
                <button className="flex items-center gap-2 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                  <Settings className="w-3.5 h-3.5" /> Network Settings
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column — Alice's Apps Style */}
          <RightAppsPanel
            apps={aliceApps}
            hoveredApp={hoveredApp}
            activeApp={activeApp}
            chatMessage={chatMessage}
            setHoveredApp={setHoveredApp}
            onAppClick={handleAppClick}
          />
        </div>
      </div>

      {/* Bottom App Bar (mobile) */}
      <div className="md:hidden border-t border-border bg-card px-2 py-2 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max justify-center">
          {aliceApps.map((app) => (
            <button
              key={app.label}
              onClick={() => handleAppClick(app.label)}
              className={`p-2 rounded-lg transition-colors ${
                activeApp === app.label
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
              title={app.label}
            >
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
  activeApp,
  chatMessage,
  setHoveredApp,
  onAppClick,
}: {
  apps: typeof aliceApps;
  hoveredApp: string | null;
  activeApp: string | null;
  chatMessage: string;
  setHoveredApp: (v: string | null) => void;
  onAppClick: (label: string) => void;
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

      {/* Chat bubble — updates on app click */}
      <div className="px-6 pt-5 pb-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">GSQODER AI</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={chatMessage}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-1 px-3 py-2 rounded-xl bg-secondary/60 border border-border text-xs text-muted-foreground leading-relaxed"
              >
                {chatMessage}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="flex-1 px-6 pb-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold text-foreground">Open AI Apps</p>
          {activeApp && (
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              {activeApp} active
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {apps.map((app, i) => {
            const isActive = activeApp === app.label;
            const isHovered = hoveredApp === app.label;
            return (
              <motion.button
                key={app.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHoveredApp(app.label)}
                onMouseLeave={() => setHoveredApp(null)}
                onClick={() => onAppClick(app.label)}
                className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${
                  isActive
                    ? "border-primary bg-primary/15 text-primary shadow-lg shadow-primary/10"
                    : isHovered
                    ? "border-primary/50 bg-primary/5 text-primary shadow-lg shadow-primary/5"
                    : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
                )}
                <app.icon className="w-5 h-5" />
                <span className="text-[9px] font-medium truncate w-full text-center">{app.label}</span>
              </motion.button>
            );
          })}
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
