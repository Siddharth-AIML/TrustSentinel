"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Shield, 
  Network, 
  Brain, 
  Search, 
  ChevronRight,
  BarChart3,
  Lock,
  Zap
} from "lucide-react"

interface LandingPageProps {
  onLaunchDashboard: () => void
}

export function LandingPage({ onLaunchDashboard }: LandingPageProps) {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">TrustSentinel</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </button>
            <button 
              onClick={onLaunchDashboard}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => scrollToSection("technology")}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </button>
          </nav>
          <Button onClick={onLaunchDashboard} size="sm">
            Launch Dashboard
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center rounded-full border bg-background/80 px-4 py-1.5 text-sm backdrop-blur">
              <Shield className="mr-2 h-4 w-4 text-primary" />
              <span className="text-muted-foreground">AI-Powered Banking Security</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              TrustSentinel – AI Powered{" "}
              <span className="text-primary">Fund Flow Intelligence</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl text-pretty">
              Detect suspicious financial transactions using graph analytics and machine learning. 
              Protect your institution with real-time fraud monitoring.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" onClick={onLaunchDashboard} className="gap-2">
                Launch Dashboard
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("features")}>
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "99.2%", label: "Detection Rate" },
              { value: "<50ms", label: "Response Time" },
              { value: "500K+", label: "Daily Transactions" },
              { value: "24/7", label: "Monitoring" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary md:text-3xl">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl mb-4">
              Comprehensive Fraud Detection
            </h2>
            <p className="text-muted-foreground text-lg">
              Advanced tools to identify, track, and prevent financial fraud in real-time.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-card">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Network className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">Graph Based Fund Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize complex transaction networks to identify suspicious fund flow patterns across accounts.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-card">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Search className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">Fraud Pattern Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Machine learning algorithms detect layering, structuring, and circular transaction patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-card">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">AI Risk Scoring</h3>
                <p className="text-sm text-muted-foreground">
                  Intelligent risk assessment assigns scores to accounts based on behavioral analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-card">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <BarChart3 className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">Investigation Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive dashboard for investigators to analyze alerts and generate evidence reports.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-muted-foreground text-lg">
              Powered by industry-leading frameworks and libraries for maximum performance and reliability.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Python", icon: "🐍" },
              { name: "FastAPI", icon: "⚡" },
              { name: "NetworkX", icon: "🔗" },
              { name: "Scikit-learn", icon: "🤖" },
              { name: "React", icon: "⚛️" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-3 rounded-full border bg-card px-6 py-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-xl">{tech.icon}</span>
                <span className="font-medium text-card-foreground">{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-20 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Bank-Grade Security</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-level encryption and compliance with banking regulations.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10">
                <Zap className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Real-Time Processing</h3>
              <p className="text-sm text-muted-foreground">
                Instant analysis of transactions as they occur for immediate threat detection.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Continuous Updates</h3>
              <p className="text-sm text-muted-foreground">
                ML models continuously learn from new fraud patterns to stay ahead of threats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">TrustSentinel</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TrustSentinel. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
