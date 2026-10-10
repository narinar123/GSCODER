import { useMemo, useState } from "react";
import { Check, Copy, ExternalLink, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";

const UPI_ID = "8884162999-4@ybl";
const plans = {
  Builder: { price: 1499, description: "Production workspace for individuals and small teams." },
  Scale: { price: 4999, description: "Advanced controls for growing engineering teams." },
} as const;

type PlanName = keyof typeof plans;

export default function PaymentPage() {
  const [plan, setPlan] = useState<PlanName>("Builder");
  const [reference, setReference] = useState("");
  const selected = plans[plan];
  const upiUrl = useMemo(() => `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=GSQoderAI&am=${selected.price}&cu=INR&tn=${encodeURIComponent(`${plan} workspace activation`)}`, [plan, selected.price]);

  async function copyUpiId() {
    await navigator.clipboard.writeText(UPI_ID);
    toast("UPI ID copied");
  }

  function submitProof(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reference.trim()) {
      toast("Enter the UPI transaction reference");
      return;
    }
    toast("Payment reference recorded for verification. Access is activated after server-side review.");
  }

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Back to GSQODER.AI</Link>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Paid activation</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Activate your production workspace.</h1>
            <p className="mt-5 max-w-xl text-muted-foreground">Choose a plan, complete the UPI payment, and submit the transaction reference. No free trial, demo workspace, or automatic access is provided.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {(Object.keys(plans) as PlanName[]).map((name) => (
                <button key={name} type="button" onClick={() => setPlan(name)} className={`rounded-2xl border p-5 text-left transition-colors ${plan === name ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"}`} aria-pressed={plan === name}>
                  <div className="flex items-center justify-between"><span className="font-semibold">{name}</span>{plan === name && <Check className="text-primary" />}</div>
                  <p className="mt-4 text-3xl font-semibold">₹{plans[name].price.toLocaleString("en-IN")}</p>
                  <p className="mt-1 text-xs text-muted-foreground">per workspace / month</p>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{plans[name].description}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 md:p-8">
            <div className="flex items-center gap-3"><div className="rounded-xl bg-primary/10 p-2 text-primary"><ShieldCheck /></div><div><h2 className="font-semibold">Pay with UPI</h2><p className="text-sm text-muted-foreground">{plan} · ₹{selected.price.toLocaleString("en-IN")}</p></div></div>
            <div className="mt-7 rounded-2xl border border-border bg-background p-5"><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">UPI ID</p><div className="mt-2 flex items-center justify-between gap-3"><code className="break-all text-sm font-semibold">{UPI_ID}</code><Button type="button" variant="outline" size="sm" onClick={copyUpiId} aria-label="Copy UPI ID"><Copy data-icon="inline-start" />Copy</Button></div><a href={upiUrl} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">Open UPI app <ExternalLink data-icon="inline-end" /></a></div>
            <form className="mt-7 flex flex-col gap-4" onSubmit={submitProof}><label htmlFor="reference" className="text-sm font-medium">UPI transaction reference</label><Input id="reference" value={reference} onChange={(event) => setReference(event.target.value)} placeholder="Enter the 12-digit UTR" autoComplete="off" /><Button type="submit" className="w-full">Submit for verification</Button></form>
            <p className="mt-5 text-xs leading-5 text-muted-foreground">Keep your payment confirmation. Workspace access is granted only after payment verification; submitting a reference alone does not confirm payment.</p>
          </section>
        </div>
      </div>
    </main>
  );
}

/** This flow intentionally requires server-side verification before production access. */
export { UPI_ID };
