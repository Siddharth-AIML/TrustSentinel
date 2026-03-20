"use client"

import { FileText, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Alert {
  account_id: string
  risk_level: string
  reason: string
}

interface EvidenceReportPanelProps {
  alert?: {
    account_id: string
    risk_level: string
    reasons: string[]
  }
  expanded?: boolean  // 🔥 NEW
  graph?: any     // 🔥 NEW
}

export function EvidenceReportPanel({ expanded = false, alert, graph }: EvidenceReportPanelProps) {

  if (!alert) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="p-4 text-muted-foreground text-sm">
          No investigation selected.
        </CardContent>
      </Card>
    )
  }

  const path = graph?.links?.map((l: any) => l.source + " → " + l.target) || []

  return (

    <Card className={cn("border-border bg-card", expanded && "min-h-[600px]")}>

      <CardHeader>

        <CardTitle className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Evidence Report
        </CardTitle>

        <CardDescription>
          Investigation for {alert.account_id}
        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-4">

        <div>
          <p className="text-sm text-muted-foreground">Risk Level</p>
          <Badge>{alert.risk_level}</Badge>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Detected Pattern</p>
         <div className="flex flex-wrap gap-2">
               {alert.reasons?.map((r: string, i: number) => (
                <Badge key={i} variant="destructive">
                  {r}
                 </Badge>
                     ))}
                   </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Transaction Flow</p>
          <div className="text-sm font-mono">
            {path.length > 0 ? path.join(" → ") : "No path available"}
          </div>
        </div>

      </CardContent>

    </Card>

  )

}