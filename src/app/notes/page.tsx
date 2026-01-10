"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { debounce } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/components/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, Edit } from "lucide-react"

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const getSaveIcon = () => {
    switch (saveState) {
      case 'Saving...':
        return <Edit className="h-4 w-4 animate-pulse" />;
      case 'Saved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Edit className="h-4 w-4" />;
    }
  }

  return (
    <motion.div 
      className="animate-fade-in-up h-full flex flex-col"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center mb-4">
        <PageHeader
          title="Field Notes"
          description="Your persistent notepad. All changes are saved automatically."
        />
        <Badge
          variant={saveState === "Saved" ? "secondary" : "default"}
          className="transition-colors flex items-center gap-2"
        >
          {getSaveIcon()}
          {saveState}
        </Badge>
      </div>
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning: Not for Sensitive Information</AlertTitle>
        <AlertDescription>
          Do not include any names, case numbers, PII, or other sensitive case information in these notes. This feature is for general reference only.
        </AlertDescription>
      </Alert>
      <Textarea
        value={content}
        onChange={handleChange}
        className="flex-1 w-full text-base resize-none focus:scale-[1.01] transition-transform duration-200"
        placeholder="Start typing your general reference notes here..."
      />
    </motion.div>
  )
}
