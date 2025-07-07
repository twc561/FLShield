import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import type { ElementType } from "react"

type DashboardCardProps = {
  href: string
  icon: ElementType
  title: string
  description: string
  style?: React.CSSProperties
}

export function DashboardCard({
  href,
  icon: Icon,
  title,
  description,
  style,
}: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="block group"
      style={style}
    >
      <Card className="h-full flex flex-col hover:border-primary transition-colors duration-300 transform hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <div className="text-sm font-medium text-primary flex items-center gap-2">
            Open
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
