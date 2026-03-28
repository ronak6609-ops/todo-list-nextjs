"use client"

import type { Routine } from "@/lib/types"
import { Target, Flame, TrendingUp, CheckCircle2 } from "lucide-react"

interface ProgressStatsProps {
  routines: Routine[]
}

export function ProgressStats({ routines }: ProgressStatsProps) {
  const completedCount = routines.filter((r) => r.completed).length
  const totalCount = routines.length
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
  const totalStreak = routines.reduce((acc, r) => acc + r.streak, 0)
  const longestStreak = routines.length > 0 ? Math.max(...routines.map((r) => r.streak)) : 0

  const stats = [
    {
      label: "Today&apos;s Progress",
      value: `${completedCount}/${totalCount}`,
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Completion Rate",
      value: `${percentage}%`,
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      label: "Total Streak Days",
      value: totalStreak.toString(),
      icon: Flame,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      label: "Longest Streak",
      value: longestStreak.toString(),
      icon: CheckCircle2,
      color: "text-sky-600 dark:text-sky-400",
      bgColor: "bg-sky-100 dark:bg-sky-900/30",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-all hover:shadow-md"
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}>
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label.replace("&apos;", "'")}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
