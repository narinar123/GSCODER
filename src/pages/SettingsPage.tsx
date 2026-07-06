import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [promptSuggestions, setPromptSuggestions] = useState(true);
  const [expandToolCalls, setExpandToolCalls] = useState(true);
  const [showToolSteps, setShowToolSteps] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Preferences</h1>
        <p className="text-sm text-muted-foreground mt-1">Language, theme, typography, and panel layout preferences.</p>
      </div>

      {/* Appearance */}
      <div className="border border-border rounded-2xl bg-card divide-y divide-border">
        <SettingRow label="Language" desc="Select interface language">
          <SettingSelect defaultValue="en" options={[{ v: "en", l: "English" }, { v: "es", l: "Español" }]} />
        </SettingRow>
        <SettingRow label="Theme brightness" desc="Light, dark, or follow your system setting.">
          <SettingSelect defaultValue="dark" options={[{ v: "dark", l: "Dark" }, { v: "light", l: "Light" }, { v: "system", l: "System" }]} />
        </SettingRow>
        <SettingRow label="Interface style" desc="Default, glass, classic, or parchment appearance.">
          <SettingSelect defaultValue="glass" options={[{ v: "default", l: "Default" }, { v: "glass", l: "Glass" }, { v: "classic", l: "Classic" }]} />
        </SettingRow>
        <SettingRow label="Chat typeface" desc="Sans or serif for conversation content.">
          <SettingSelect defaultValue="sans" options={[{ v: "sans", l: "Sans-serif" }, { v: "serif", l: "Serif" }]} />
        </SettingRow>
        <SettingRow label="Conversation text size" desc="Adjusts message text size in chat.">
          <SettingSelect defaultValue="small" options={[{ v: "small", l: "Small" }, { v: "medium", l: "Medium" }, { v: "large", l: "Large" }]} />
        </SettingRow>
      </div>

      {/* Behavior */}
      <div className="border border-border rounded-2xl bg-card divide-y divide-border">
        <SettingRow label="Task Panel Position" desc="Where the task panel is displayed in the workspace.">
          <SettingSelect defaultValue="right" options={[{ v: "right", l: "Docked on the right" }, { v: "left", l: "Docked on the left" }, { v: "float", l: "Floating" }]} />
        </SettingRow>
        <SettingRow label="Preview Mode" desc="How to preview generated files (images, markdown).">
          <SettingSelect defaultValue="new" options={[{ v: "new", l: "New window" }, { v: "inline", l: "Inline" }]} />
        </SettingRow>
        <SettingRow label="Prompt Suggestions" desc="AI generates follow-up suggestions after completing a response.">
          <Switch checked={promptSuggestions} onCheckedChange={setPromptSuggestions} />
        </SettingRow>
        <SettingRow label="Expand tool calls by default" desc="When on, newly shown tool blocks open expanded.">
          <Switch checked={expandToolCalls} onCheckedChange={setExpandToolCalls} />
        </SettingRow>
        <SettingRow label="Show tool execution steps in IM channels" desc="When on, IM channel replies include each tool execution step.">
          <Switch checked={showToolSteps} onCheckedChange={setShowToolSteps} />
        </SettingRow>
      </div>
    </div>
  );
}

function SettingRow({ label, desc, children }: { label: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function SettingSelect({ defaultValue, options }: { defaultValue: string; options: { v: string; l: string }[] }) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px] bg-secondary border-border text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.v} value={o.v}>{o.l}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
