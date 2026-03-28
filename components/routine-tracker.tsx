"use client"

import { useState } from "react"
import type { Routine } from "@/lib/types"
import { RoutineCard } from "./routine-card"
import { AddRoutineDialog } from "./add-routine-dialog"
import { ProgressStats } from "./progress-stats"
import { ProgressRing } from "./progress-ring"
import { Button } from "@/components/ui/button"
import { Plus, Sun, Cloud, Moon, Sparkles, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const initialRoutines: Routine[] = [
  {
    id: "1",
    title: "Morning Meditation",
    description: "Start the day with 10 minutes of mindfulness",
    time: "06:30",
    category: "morning",
    completed: true,
    streak: 7,
    icon: "🧘",
  },
  {
    id: "2",
    title: "Exercise",
    description: "30 minute workout or jog",
    time: "07:00",
    category: "morning",
    completed: true,
    streak: 5,
    icon: "💪",
  },
  {
    id: "3",
    title: "Read for 30 minutes",
    description: "Personal development or fiction",
    time: "12:00",
    category: "afternoon",
    completed: false,
    streak: 3,
    icon: "📚",
  },
  {
    id: "4",
    title: "Drink 8 glasses of water",
    time: "12:00",
    category: "anytime",
    completed: false,
    streak: 12,
    icon: "💧",
  },
  {
    id: "5",
    title: "Evening Walk",
    description: "Unwind with a 20-minute walk",
    time: "18:00",
    category: "evening",
    completed: false,
    streak: 2,
    icon: "🚶",
  },
  {
    id: "6",
    title: "Journal",
    description: "Reflect on the day and set tomorrow's goals",
    time: "21:00",
    category: "evening",
    completed: false,
    streak: 4,
    icon: "✍️",
  },
]

const categoryFilters = [
  { value: "all", label: "All", icon: Sparkles },
  { value: "morning", label: "Morning", icon: Sun },
  { value: "afternoon", label: "Afternoon", icon: Cloud },
  { value: "evening", label: "Evening", icon: Moon },
] as const

export function RoutineTracker() {
  const [routines, setRoutines] = useState<Routine[]>(initialRoutines)
  const [filter, setFilter] = useState<string>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null)

  const filteredRoutines = filter === "all" 
    ? routines 
    : routines.filter((r) => r.category === filter)

  const completedCount = routines.filter((r) => r.completed).length
  const totalCount = routines.length
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const handleToggle = (id: string) => {
    setRoutines((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              completed: !r.completed,
              streak: !r.completed ? r.streak + 1 : Math.max(0, r.streak - 1),
            }
          : r
      )
    )
  }

  const handleSave = (data: Omit<Routine, 'id' | 'completed' | 'streak'>) => {
    if (editingRoutine) {
      setRoutines((prev) =>
        prev.map((r) =>
          r.id === editingRoutine.id
            ? { ...r, ...data }
            : r
        )
      )
    } else {
      const newRoutine: Routine = {
        ...data,
        id: crypto.randomUUID(),
        completed: false,
        streak: 0,
      }
      setRoutines((prev) => [...prev, newRoutine])
    }
    setEditingRoutine(null)
  }

  const handleEdit = (routine: Routine) => {
    setEditingRoutine(routine)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setRoutines((prev) => prev.filter((r) => r.id !== id))
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Daily Routine Tracker
              </h1>
              <p className="mt-1 flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {today}
              </p>
            </div>
            <Button onClick={() => { setEditingRoutine(null); setDialogOpen(true); }} size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Add Routine
            </Button>
          </div>
        </header>

        {/* Progress Overview */}
        <section className="mb-8">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <ProgressRing progress={progress} size={140} strokeWidth={12} />
              <div className="flex-1 w-full">
                <h2 className="text-xl font-semibold text-card-foreground mb-4">
                  {"Today's Progress"}
                </h2>
                <ProgressStats routines={routines} />
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categoryFilters.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                filter === cat.value
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              <cat.icon className="h-4 w-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Routines List */}
        <section className="space-y-3">
          {filteredRoutines.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card/50 py-16 text-center">
              <div className="mb-4 rounded-full bg-secondary p-4">
                <Sparkles className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">No routines yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Start building better habits by adding your first routine.
              </p>
              <Button className="mt-4" onClick={() => { setEditingRoutine(null); setDialogOpen(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Routine
              </Button>
            </div>
          ) : (
            filteredRoutines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </section>

        {/* Motivation Quote */}
        <footer className="mt-12 text-center">
          <blockquote className="mx-auto max-w-lg">
            <p className="text-lg italic text-muted-foreground">
              {'"We are what we repeatedly do. Excellence, then, is not an act, but a habit."'}
            </p>
            <cite className="mt-2 block text-sm font-medium text-foreground">
              — Aristotle
            </cite>
          </blockquote>
        </footer>
      </div>

      <AddRoutineDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        editingRoutine={editingRoutine}
      />
    </div>
  )
}
