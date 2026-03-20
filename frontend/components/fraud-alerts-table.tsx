"use client"

import { AlertTriangle, AlertCircle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type AggregatedAlert = {
  account_id: string
  risk_level: string
  reasons: string[]
}
interface Alert {
  account_id: string
  risk_level: string
  reason: string
}

interface FraudAlertsTableProps {
  expanded?: boolean
  alerts?: Alert[]
  onSelect?: (alert: AggregatedAlert) => void   // 🔥 NEW
}

export function FraudAlertsTable({ expanded = false, alerts = [] , onSelect}: FraudAlertsTableProps) {

  // 🔥 GROUP ALERTS BY ACCOUNT
  const grouped: Record<string, Alert[]> = {}

  alerts.forEach((a) => {
    if (!grouped[a.account_id]) grouped[a.account_id] = []
    grouped[a.account_id].push(a)
  })

  const rows = Object.entries(grouped).map(([account_id, items]) => {
    return {
      account_id,
      risk_level: items.some(i => i.risk_level === "HIGH") ? "HIGH"
        : items.some(i => i.risk_level === "MEDIUM") ? "MEDIUM"
        : "LOW",
      reasons: items.map(i => i.reason)
    }
  })

  const displayData = expanded ? rows : rows.slice(0, 5)

  const getLevelConfig = (level: string) => {
    switch (level?.toLowerCase()) {
      case "high":
        return {
          icon: AlertTriangle,
          className: "bg-destructive/20 text-destructive border-destructive/30",
          label: "High",
        }
      case "medium":
        return {
          icon: AlertCircle,
          className: "bg-chart-3/20 text-chart-3 border-chart-3/30",
          label: "Medium",
        }
      default:
        return {
          icon: Info,
          className: "bg-muted text-muted-foreground border-border",
          label: "Low",
        }
    }
  }

  const getRiskScore = (level: string) => {
    if (level === "HIGH") return 90
    if (level === "MEDIUM") return 60
    return 30
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-destructive"
    if (score >= 60) return "text-chart-3"
    if (score >= 40) return "text-chart-1"
    return "text-chart-2"
  }

  return (
    <Card className="border-border bg-card">

      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          Fraud Alerts
        </CardTitle>

        <CardDescription className="text-sm">
          {rows.length} suspicious accounts detected
        </CardDescription>
      </CardHeader>

      <CardContent>

        {rows.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No alerts yet. Upload data to analyze.
          </p>
        ) : (

          <div className="rounded-md border overflow-hidden">

            <Table>

              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Account ID</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Patterns</TableHead>
                  <TableHead>Alert Level</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>

                {displayData.map((alert :AggregatedAlert) => {

                  const riskScore = getRiskScore(alert.risk_level)
                  const levelConfig = getLevelConfig(alert.risk_level)
                  const LevelIcon = levelConfig.icon

                  return (

                   <TableRow
                     key={alert.account_id}
                    onClick={() => onSelect && onSelect(alert)}  // 🔥 NEW
                      className="hover:bg-muted/50 cursor-pointer"
                       >
                      <TableCell className="font-mono">{alert.account_id}</TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full",
                                getRiskColor(riskScore).replace("text-", "bg-")
                              )}
                              style={{ width: `${riskScore}%` }}
                            />
                          </div>

                          <span className={cn(getRiskColor(riskScore))}>
                            {riskScore}
                          </span>
                        </div>
                      </TableCell>

                      {/* 🔥 SHOW MULTIPLE PATTERNS */}
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {alert.reasons.map((r, i) => (
                            <Badge key={i} variant="secondary" className="text-[10px]">
                              {r}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge className={cn("gap-1", levelConfig.className)}>
                          <LevelIcon className="h-3 w-3" />
                          {levelConfig.label}
                        </Badge>
                      </TableCell>

                    </TableRow>

                  )
                })}

              </TableBody>

            </Table>

          </div>

        )}

      </CardContent>

    </Card>
  )
}