"use client"

import { useState, useEffect } from "react"
import type { Routine } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AddRoutineDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (routine: Omit<Routine, 'id' | 'completed' | 'streak'>) => void
  editingRoutine?: Routine | null
}

const icons = ["🏃", "💪", "📚", "🧘", "💧", "🥗", "💤", "🎯", "✍️", "🧹", "💊", "🌅"]

export function AddRoutineDialog({ open, onOpenChange, onSave, editingRoutine }: AddRoutineDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [time, setTime] = useState("08:00")
  const [category, setCategory] = useState<Routine['category']>("morning")
  const [icon, setIcon] = useState("🏃")

  useEffect(() => {
    if (editingRoutine) {
      setTitle(editingRoutine.title)
      setDescription(editingRoutine.description || "")
      setTime(editingRoutine.time)
      setCategory(editingRoutine.category)
      setIcon(editingRoutine.icon)
    } else {
      setTitle("")
      setDescription("")
      setTime("08:00")
      setCategory("morning")
      setIcon("🏃")
    }
  }, [editingRoutine, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    
    onSave({
      title: title.trim(),
      description: description.trim() || undefined,
      time,
      category,
      icon,
    })
    
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editingRoutine ? "Edit Routine" : "Add New Routine"}</DialogTitle>
          <DialogDescription>
            {editingRoutine ? "Update your routine details below." : "Create a new daily routine to track."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <div className="flex flex-wrap gap-2">
              {icons.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`h-10 w-10 rounded-lg text-xl transition-all ${
                    icon === emoji
                      ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Morning Run"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Add some details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Routine['category'])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="anytime">Anytime</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingRoutine ? "Save Changes" : "Add Routine"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
