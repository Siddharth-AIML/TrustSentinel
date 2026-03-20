"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DataUploadSection } from "@/components/data-upload-section"
import { FraudAlertsTable } from "@/components/fraud-alerts-table"
import { NetworkGraph } from "@/components/network-graph"
import { RiskAnalyticsCharts } from "@/components/risk-analytics-charts"
import { TransactionTimeline } from "@/components/transaction-timeline"
import { EvidenceReportPanel } from "@/components/evidence-report-panel"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

interface InvestigatorDashboardProps {
  onBack: () => void
  analysisData: any
  onAnalysisComplete: (data: any) => void
}

export function InvestigatorDashboard({ onBack, analysisData, onAnalysisComplete }: InvestigatorDashboardProps) {

  const [activeSection, setActiveSection] = useState("dashboard")

  // 🔥 LOCAL STATE (SYNC)
  const [data, setData] = useState<any>(analysisData)
const [selectedAlert, setSelectedAlert] = useState<any>(null)
  // 🔥 LOAD FROM LOCAL STORAGE IF EMPTY
 useEffect(() => {

  // 🔥 ALWAYS SYNC WITH PROPS FIRST
  if (analysisData) {
    setData(analysisData)
    return
  }

  // 🔥 FALLBACK TO LOCAL STORAGE
  const stored = localStorage.getItem("analysis")

  if (stored) {
    const parsed = JSON.parse(stored)
    setData(parsed)
  }

}, [analysisData])

  const alerts = data?.alerts || []
  const graph = data?.graph || null

  return (
    <SidebarProvider>

      <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <SidebarInset>

        <DashboardHeader onBack={onBack} />

        <main className="flex-1 overflow-auto p-6 bg-muted/20">

          {activeSection === "dashboard" && (
            <div className="space-y-6">

              <RiskAnalyticsCharts alerts={alerts} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2">
                  <FraudAlertsTable expanded alerts={alerts} onSelect={setSelectedAlert} />
                </div>

                <div className="lg:col-span-1">
                 <DataUploadSection
                    onAnalysisComplete={(newData) => {
                       onAnalysisComplete(newData)   // update parent
                       setData(newData)              // 🔥 update dashboard instantly
                         localStorage.setItem("analysis", JSON.stringify(newData))
                          alert("Analysis updated successfully!")}}
/>
                </div>

              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                <NetworkGraph data={graph} alerts={alerts}  />

                <TransactionTimeline />

              </div>

              <EvidenceReportPanel 
              alert={selectedAlert} 
              graph={graph}/>
            </div>
          )}

          {activeSection === "upload" && (
            <div className="max-w-2xl">
              <DataUploadSection
               onAnalysisComplete={(newData) => {
                onAnalysisComplete(newData)   // update parent
               setData(newData)              // 🔥 update dashboard instantly
                localStorage.setItem("analysis", JSON.stringify(newData))
  }}
/>
            </div>
          )}

          {activeSection === "alerts" && (
            <FraudAlertsTable expanded alerts={alerts} />
          )}

          {activeSection === "network" && (
            <NetworkGraph expanded data={graph} alerts={alerts} />
          )}

        </main>

      </SidebarInset>

    </SidebarProvider>
  )
}