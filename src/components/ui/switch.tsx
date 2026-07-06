import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

export function Switch({ checked, defaultChecked = false, onCheckedChange, className, disabled = false }: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
  const actualChecked = checked !== undefined ? checked : internalChecked

  const handleChange = () => {
    if (disabled) return
    const newVal = !actualChecked
    if (checked === undefined) {
      setInternalChecked(newVal)
    }
    onCheckedChange?.(newVal)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={actualChecked}
      disabled={disabled}
      onClick={handleChange}
      className={cn(
        "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        actualChecked ? "bg-primary" : "bg-input",
        className
      )}
    >
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
          actualChecked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  )
}
