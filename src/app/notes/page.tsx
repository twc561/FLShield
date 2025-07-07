"use client"

import { useState, useEffect, useCallback } from "react"
import { debounce } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/components/PageHeader"
import { Badge } from "@/components/ui/badge"

export default function FieldNotesPage() {
  const [content, setContent] = useState<string>("")
  const [saveState, setSaveState] = useState<"Saved" | "Saving..." | "Ready">(
    "Ready"
  )

  useEffect(() => {
    const savedContent = localStorage.getItem("florida_shield_field_notes")
    if (savedContent) {
      setContent(savedContent)
    }
  }, [])

  const debouncedSave = useCallback(
    debounce((newContent: string) => {
      localStorage.setItem("florida_shield_field_notes", newContent)
      setSaveState("Saved")
    }, 1000),
    []
  )

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    setSaveState("Saving...")
    debouncedSave(newContent)
  }

  return (
    <div className="animate-fade-in-up h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <PageHeader
          title="Field Notes"
          description="Your persistent notepad. All changes are saved automatically."
        />
        <Badge
          variant={saveState === "Saved" ? "secondary" : "default"}
          className="transition-colors"
        >
          {saveState}
        </Badge>
      </div>
      <Textarea
        value={content}
        onChange={handleChange}
        className="flex-1 w-full text-base resize-none"
        placeholder="Start typing your notes here..."
      />
    </div>
  )
}
