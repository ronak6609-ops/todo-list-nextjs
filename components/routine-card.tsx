"use client"

import { cn } from "@/lib/utils"
import type { Routine } from "@/lib/types"
import { Check, Flame, Clock, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface RoutineCardProps {
  routine: Routine
  onToggle: (id: string) => void
  onEdit: (routine: Routine) => void
  onDelete: (id: string) => void
}

const categoryColors = {
  morning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  afternoon: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  evening: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  anytime: "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-400",
}

export function RoutineCard({ routine, onToggle, onEdit, onDelete }: RoutineCardProps) {
  return (
    <div
      className={cn(
        "group relative flex items-center gap-4 rounded-xl border bg-card p-4 transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
        routine.completed && "bg-success/5 border-success/20"
      )}
    >
      {/* Completion checkbox */}
      <button
        onClick={() => onToggle(routine.id)}
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
          routine.completed
            ? "border-success bg-success text-success-foreground scale-110"
            : "border-muted-foreground/30 hover:border-primary hover:bg-primary/5"
        )}
        aria-label={routine.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {routine.completed && <Check className="h-5 w-5" strokeWidth={3} />}
      </button>

      {/* Icon */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-2xl">
        {routine.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3
            className={cn(
              "font-semibold text-card-foreground transition-all",
              routine.completed && "line-through text-muted-foreground"
            )}
          >
            {routine.title}
          </h3>
          {routine.streak > 0 && (
            <div className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
              <Flame className="h-3.5 w-3.5" />
              {routine.streak}
            </div>
          )}
        </div>
        {routine.description && (
          <p className="text-sm text-muted-foreground line-clamp-1">
            {routine.description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", categoryColors[routine.category])}>
            <Clock className="h-3 w-3" />
            {routine.time}
          </span>
          <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium capitalize", categoryColors[routine.category])}>
            {routine.category}
          </span>
        </div>
      </div>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(routine)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(routine.id)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
