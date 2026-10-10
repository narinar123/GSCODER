import { Link } from "react-router-dom";
import { ArrowRight, Check, ShieldCheck, Sparkles, Workflow, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Builder", price: "₹1,499", detail: "per workspace / month", features: ["1 production workspace", "AI coding agents", "Knowledge and task automation", "Role-based workspace access"] },
  { name: "Scale", price: "₹4,999", detail: "per workspace / month", features: ["Unlimited projects", "Advanced automations", "Team analytics and audit history", "Priority support"] },
];

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="GSQoderAI home">
            <img src="/favicon.svg" alt="GSQoderAI" className="size-9 rounded-xl" />
            <span className="text-sm font-bold tracking-[0.18em]">GSQODER<span className="text-primary">.AI</span></span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#platform" className="transition-colors hover:text-foreground">Platform</a>
            <a href="#security" className="transition-colors hover:text-foreground">Security</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link to="/activate"><Button size="sm">Activate workspace <ArrowRight data-icon="inline-end" /></Button></Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:pt-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"><Sparkles data-icon="inline-start" /> Production AI workspace</div>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-balance md:text-7xl">Turn complex work into <span className="gradient-text">shipped work.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">GSQoderAI gives engineering and operations teams one controlled workspace for agents, projects, knowledge, automations, and delivery.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link to="/login"><Button size="lg">Create a workspace <ArrowRight data-icon="inline-end" /></Button></Link><a href="#pricing"><Button size="lg" variant="outline">View plans</Button></a></div>
            <p className="mt-4 text-xs text-muted-foreground">Paid workspaces only. No free trial or demo workspace.</p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-2xl shadow-primary/10">
            <div className="rounded-2xl border border-border bg-background p-5"><div className="mb-5 flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Workspace overview</p><p className="mt-1 text-xl font-semibold">Ship with confidence</p></div><div className="rounded-xl bg-primary/10 p-2 text-primary"><Workflow /></div></div><div className="grid gap-3 sm:grid-cols-3">{[["12", "Active agents"], ["48", "Tasks automated"], ["99.8%", "Uptime"]].map(([value, label]) => <div key={label} className="rounded-xl border border-border p-3"><p className="text-xl font-semibold">{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>)}</div><div className="mt-4 rounded-xl border border-border p-4"><div className="flex items-center justify-between"><span className="text-sm font-medium">Release pipeline</span><span className="text-xs text-primary">Running</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full w-3/4 rounded-full bg-primary" /></div><div className="mt-3 flex justify-between text-[11px] text-muted-foreground"><span>Research</span><span>Build</span><span>Test</span><span>Deploy</span></div></div></div>
          </div>
        </section>

        <section id="platform" className="border-y border-border bg-card/40"><div className="mx-auto grid max-w-7xl gap-4 px-5 py-16 md:grid-cols-3 lg:px-8">{[[Zap, "Move faster", "Delegate repeatable work to agents that understand your workspace context."], [ShieldCheck, "Stay in control", "Permissions, activity history, and deployment boundaries keep teams accountable."], [Workflow, "Connect the work", "Bring projects, knowledge, tasks, and automations together in one operating layer."]].map(([Icon, title, body]) => <div key={title as string} className="rounded-2xl border border-border bg-background p-6"><Icon className="mb-5 text-primary" /><h2 className="text-lg font-semibold">{title as string}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{body as string}</p></div>)}</div></section>

        <section id="pricing" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Simple pricing</p><h2 className="mt-3 text-4xl font-semibold tracking-tight">Pay for production access.</h2><p className="mt-4 text-muted-foreground">Choose a plan for your team. Payment processing and activation are intentionally gated until a verified payment provider is connected.</p></div><div className="mt-10 grid gap-5 md:grid-cols-2">{plans.map((plan) => <article key={plan.name} className="rounded-2xl border border-border bg-card p-6"><h3 className="text-xl font-semibold">{plan.name}</h3><p className="mt-6 text-4xl font-semibold">{plan.price}<span className="ml-2 text-sm font-normal text-muted-foreground">/ month</span></p><p className="mt-1 text-sm text-muted-foreground">{plan.detail}</p><ul className="mt-6 grid gap-3">{plan.features.map((feature) => <li key={feature} className="flex gap-2 text-sm text-muted-foreground"><Check className="size-4 shrink-0 text-primary" />{feature}</li>)}</ul><Link to="/activate" className="mt-8 block"><Button className="w-full">Continue to activation</Button></Link></article>)}</div></section>
        <section id="security" className="border-t border-border"><div className="mx-auto max-w-7xl px-5 py-14 text-sm text-muted-foreground lg:px-8"><p><span className="font-semibold text-foreground">Built for accountable teams.</span> Role-aware navigation, protected workspaces, and auditable activity are part of the product surface. UPI activation requires a server-side payment gateway and webhook verification before access can be granted.</p></div></section>
      </main>
    </div>
  );
}
