import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface SelectContextType {
  value: string
  onValueChange: (val: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  selectedValueLabel: React.ReactNode
  setSelectedValueLabel: (label: React.ReactNode) => void
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined)

export function Select({
  children,
  value,
  defaultValue,
  onValueChange,
}: {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (val: string) => void
}) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const actualValue = value !== undefined ? value : internalValue
  const [open, setOpen] = React.useState(false)
  const [selectedValueLabel, setSelectedValueLabel] = React.useState<React.ReactNode>("")

  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <SelectContext.Provider
      value={{
        value: actualValue,
        onValueChange: (val) => {
          if (value === undefined) {
            setInternalValue(val)
          }
          onValueChange?.(val)
          setOpen(false)
        },
        open,
        setOpen,
        selectedValueLabel,
        setSelectedValueLabel,
      }}
    >
      <div ref={containerRef} className="relative inline-block w-full">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectTrigger must be used within Select")

  return (
    <button
      type="button"
      onClick={() => context.setOpen(!context.open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <span className="flex items-center gap-1.5 truncate">{children}</span>
      <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
    </button>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectValue must be used within Select")
  return <span className="truncate">{context.selectedValueLabel || placeholder}</span>
}

export function SelectContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectContent must be used within Select")

  if (!context.open) return null

  return (
    <div
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 slide-in-from-top-1 w-full mt-1 max-h-60 overflow-y-auto",
        className
      )}
    >
      <div className="p-1">{children}</div>
    </div>
  )
}

export function SelectItem({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error("SelectItem must be used within Select")

  const isSelected = context.value === value

  React.useEffect(() => {
    if (isSelected) {
      context.setSelectedValueLabel(children)
    }
  }, [isSelected, children])

  return (
    <div
      onClick={() => context.onValueChange(value)}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer",
        isSelected && "bg-accent text-accent-foreground",
        className
      )}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
      <span className="flex items-center gap-1">{children}</span>
    </div>
  )
}
