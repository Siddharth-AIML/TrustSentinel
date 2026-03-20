"use client"

import { useState, useEffect } from "react"
import { LandingPage } from "@/components/landing-page"
import { InvestigatorDashboard } from "@/components/investigator-dashboard"

export default function Page() {

  const [currentView, setCurrentView] = useState<"landing" | "dashboard">("landing")

  const [analysisData, setAnalysisData] = useState<any>(null)

  // 🔥 LOAD FROM LOCAL STORAGE ON REFRESH
  useEffect(() => {
    const stored = localStorage.getItem("analysis")
    if (stored) {
      setAnalysisData(JSON.parse(stored))
    }
  }, [])

  if (currentView === "dashboard") {
    return (
      <InvestigatorDashboard
        onBack={() => setCurrentView("landing")}
        analysisData={analysisData}
        onAnalysisComplete={setAnalysisData}
      />
    )
  }

  return (
    <LandingPage onLaunchDashboard={() => setCurrentView("dashboard")} />
  )
}