import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";

const tokenData = [
  { day: "Mon", tokens: 45200 }, { day: "Tue", tokens: 62100 }, { day: "Wed", tokens: 38900 },
  { day: "Thu", tokens: 71500 }, { day: "Fri", tokens: 55800 }, { day: "Sat", tokens: 29400 }, { day: "Sun", tokens: 18700 },
];

const agentPerf = [
  { day: "Mon", tasks: 23 }, { day: "Tue", tasks: 31 }, { day: "Wed", tasks: 28 },
  { day: "Thu", tasks: 42 }, { day: "Fri", tasks: 35 }, { day: "Sat", tasks: 18 }, { day: "Sun", tasks: 12 },
];

const modelUsage = [
  { name: "GPT-5", value: 42, color: "hsl(var(--chart-1))" },
  { name: "Claude 4", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Gemini", value: 15, color: "hsl(var(--chart-3))" },
  { name: "DeepSeek", value: 10, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 5, color: "hsl(var(--chart-5))" },
];

const stats = [
  { label: "Total Tokens", value: "2.4M", change: "+12%" },
  { label: "Agent Tasks", value: "1,847", change: "+24%" },
  { label: "Avg Latency", value: "1.2s", change: "-8%" },
  { label: "Cost (MTD)", value: "$342", change: "+5%" },
  { label: "Active Agents", value: "12", change: "+2" },
  { label: "Workflows Run", value: "3,156", change: "+18%" },
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Analytics & Observability</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Token usage, agent performance, model routing</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="border border-border rounded-xl bg-card px-4 py-3">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
            <p className="text-lg font-bold text-foreground mt-0.5">{s.value}</p>
            <p className="text-[10px] text-primary mt-0.5">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border border-border rounded-2xl bg-card p-5">
          <p className="text-xs font-semibold text-foreground mb-4">Token Usage (7 days)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={tokenData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 11 }} />
              <Bar dataKey="tokens" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-border rounded-2xl bg-card p-5">
          <p className="text-xs font-semibold text-foreground mb-4">Agent Tasks Completed</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={agentPerf}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 11 }} />
              <Line type="monotone" dataKey="tasks" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-border rounded-2xl bg-card p-5">
          <p className="text-xs font-semibold text-foreground mb-4">Model Distribution</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={modelUsage} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                  {modelUsage.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {modelUsage.map((m) => (
                <div key={m.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: m.color }} />
                  <span className="text-muted-foreground">{m.name}</span>
                  <span className="font-medium text-foreground ml-auto">{m.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-border rounded-2xl bg-card p-5">
          <p className="text-xs font-semibold text-foreground mb-4">Recent Errors</p>
          <div className="space-y-2">
            {[
              { msg: "Rate limit exceeded on GPT-5", time: "2m ago", level: "warn" },
              { msg: "Timeout: Research agent > 30s", time: "15m ago", level: "error" },
              { msg: "MCP Notion server disconnected", time: "1h ago", level: "error" },
              { msg: "Token budget 80% consumed", time: "3h ago", level: "warn" },
            ].map((err) => (
              <div key={err.msg} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary/50 border border-border">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${err.level === "error" ? "bg-destructive" : "bg-warning"}`} />
                <span className="text-[11px] text-foreground flex-1 truncate">{err.msg}</span>
                <span className="text-[9px] text-muted-foreground shrink-0">{err.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
