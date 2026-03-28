export interface Routine {
  id: string
  title: string
  description?: string
  time: string
  category: 'morning' | 'afternoon' | 'evening' | 'anytime'
  completed: boolean
  streak: number
  icon: string
}

export interface DailyProgress {
  date: string
  completedCount: number
  totalCount: number
}
