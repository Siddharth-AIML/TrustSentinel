"use client"

import { Clock, ArrowRight, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const timelineData = [
  {
    id: 1,
    time: "14:32:15",
    date: "Today",
    from: "ACC-7892",
    to: "ACC-3421",
    amount: "$50,000",
    type: "Transfer",
    status: "suspicious",
    description: "Large transfer to new payee",
  },
  {
    id: 2,
    time: "14:35:42",
    date: "Today",
    from: "ACC-3421",
    to: "ACC-1298",
    amount: "$48,000",
    type: "Transfer",
    status: "suspicious",
    description: "Rapid re-transfer within minutes",
  },
  {
    id: 3,
    time: "14:38:19",
    date: "Today",
    from: "ACC-1298",
    to: "ACC-2211",
    amount: "$45,000",
    type: "Wire",
    status: "flagged",
    description: "International wire to high-risk region",
  },
  {
    id: 4,
    time: "10:15:00",
    date: "Yesterday",
    from: "ACC-5567",
    to: "ACC-9934",
    amount: "$25,000",
    type: "Transfer",
    status: "normal",
    description: "Regular business payment",
  },
  {
    id: 5,
    time: "09:45:33",
    date: "Yesterday",
    from: "ACC-6743",
    to: "ACC-2211",
    amount: "$14,000",
    type: "Transfer",
    status: "normal",
    description: "Scheduled payment",
  },
]

interface TransactionTimelineProps {
  expanded?: boolean
}

export function TransactionTimeline({ expanded = false }: TransactionTimelineProps) {
  const displayData = expanded ? timelineData : timelineData.slice(0, 4)

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "suspicious":
        return {
          color: "bg-destructive",
          textColor: "text-destructive",
          badge: "Suspicious",
          badgeClass: "bg-destructive/20 text-destructive border-destructive/30",
        }
      case "flagged":
        return {
          color: "bg-chart-3",
          textColor: "text-chart-3",
          badge: "Flagged",
          badgeClass: "bg-chart-3/20 text-chart-3 border-chart-3/30",
        }
      default:
        return {
          color: "bg-chart-2",
          textColor: "text-chart-2",
          badge: "Normal",
          badgeClass: "bg-chart-2/20 text-chart-2 border-chart-2/30",
        }
    }
  }

  return (
    <Card className={cn("border-border bg-card", expanded && "min-h-[500px]")}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Transaction Timeline
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Chronological fund movement visualization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-1">
          {displayData.map((transaction, index) => {
            const statusConfig = getStatusConfig(transaction.status)
            return (
              <div key={transaction.id} className="relative flex gap-4">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className={cn("w-2.5 h-2.5 rounded-full", statusConfig.color)} />
                  {index < displayData.length - 1 && (
                    <div className="w-px flex-1 bg-border my-1" />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">
                      {transaction.date} at {transaction.time}
                    </span>
                    <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", statusConfig.badgeClass)}>
                      {statusConfig.badge}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-mono text-foreground">{transaction.from}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span className="font-mono text-foreground">{transaction.to}</span>
                    <span className={cn("font-semibold", statusConfig.textColor)}>
                      {transaction.amount}
                    </span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    {transaction.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
