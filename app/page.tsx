import { Header } from "@/components/layout/header"
import { Hero } from "@/components/sections/hero"
import { FeaturedCategories } from "@/components/sections/featured-categories"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Stats } from "@/components/sections/stats"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedCategories />
        <HowItWorks />
        <Stats />
      </main>
      <Footer />
    </div>
  )
}
