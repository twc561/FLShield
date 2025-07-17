
import React from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, className = "" }: PageHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
