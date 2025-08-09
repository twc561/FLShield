
export interface FeatureModule {
  id: string
  title: string
  summary: string
  icon: string // Corresponds to a name in the lucide-react library
  targetPage: string
  category: string
  isPremium?: boolean
}
