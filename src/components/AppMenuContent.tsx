
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { menuItems } from "@/lib/menu-items"

interface AppMenuContentProps {
  onLinkClick?: () => void
}

export function AppMenuContent({ onLinkClick }: AppMenuContentProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || (href !== "/dashboard" && href !== "/" && pathname.startsWith(href))
  }

  return (
    <div className="flex flex-col gap-1">
      {menuItems.map((item) =>
        item.items ? (
          <Accordion
            key={item.label}
            type="single"
            collapsible
            className="w-full"
            defaultValue={item.items.some((subItem) => isActive(subItem.href)) ? item.label : undefined}
          >
            <AccordionItem value={item.label} className="border-b-0">
              <AccordionTrigger className="py-2 px-3 text-sm font-semibold hover:bg-muted/50 rounded-md hover:no-underline">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-primary" />
                  <span>{item.label}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-8 pr-2 pb-1">
                <div className="flex flex-col gap-1 mt-1 border-l-2 border-muted">
                  {item.items.map((subItem) => (
                    <Button
                      key={subItem.label}
                      asChild
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "justify-start gap-3 ml-2",
                        isActive(subItem.href) && "bg-primary/10 text-primary"
                      )}
                      onClick={onLinkClick}
                    >
                      <Link href={subItem.href}>
                        <subItem.icon className="h-4 w-4" />
                        {subItem.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Button
            key={item.label}
            asChild
            variant="ghost"
            className={cn(
              "justify-start gap-3 px-3",
              isActive(item.href!) && "bg-primary/10 text-primary"
            )}
            onClick={onLinkClick}
          >
            <Link href={item.href!}>
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          </Button>
        )
      )}
    </div>
  )
}
