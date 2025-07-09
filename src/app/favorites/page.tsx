
import { PageHeader } from "@/components/PageHeader"
import { Star } from "lucide-react"

export default function FavoritesPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Favorites"
        description="Quickly access your saved statutes, case laws, and checklists."
      />
       <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
            <Star className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Feature Coming Soon</h3>
        <p className="text-muted-foreground">
          Use this feature to save links to public statutes and policies for quick access. Do not save queries containing sensitive information.
        </p>
      </div>
    </div>
  )
}
