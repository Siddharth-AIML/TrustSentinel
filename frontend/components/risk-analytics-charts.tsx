"use client"

import { TrendingUp, Users, Activity, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

interface Alert {
  account_id: string
  risk_level: string
  reason: string
}

export function RiskAnalyticsCharts({ alerts = [] }: { alerts?: Alert[] }) {

  // 🔥 COUNT RISKS
  const riskCount = {
    high: 0,
    medium: 0,
    low: 0,
  }

  const patternCount: Record<string, number> = {}

  alerts.forEach((a) => {
    const level = a.risk_level?.toLowerCase()

    if (level === "high") riskCount.high++
    else if (level === "medium") riskCount.medium++
    else riskCount.low++

    patternCount[a.reason] = (patternCount[a.reason] || 0) + 1
  })

  // 🔥 REMOVE ZERO VALUES (IMPORTANT)
  const riskDistributionData = [
    { name: "high", value: riskCount.high },
    { name: "medium", value: riskCount.medium },
    { name: "low", value: riskCount.low },
  ].filter((d) => d.value > 0)

  const fraudPatternData = Object.entries(patternCount).map(([pattern, count]) => ({
    pattern,
    count,
  }))

  const statsCards = [
    {
      title: "Total Transactions",
      value: alerts.length,
      icon: DollarSign,
      color: "bg-primary/10 text-primary",
      description: "Analyzed data",
    },
    {
      title: "Suspicious Accounts",
      value: alerts.length,
      icon: Users,
      color: "bg-chart-4/10 text-chart-4",
      description: "Flagged accounts",
    },
    {
      title: "High Risk Alerts",
      value: riskCount.high,
      icon: Activity,
      color: "bg-destructive/10 text-destructive",
      description: "Detected",
    },
    {
      title: "Active Investigations",
      value: alerts.length,
      icon: TrendingUp,
      color: "bg-chart-3/10 text-chart-3",
      description: "Auto-generated",
    },
  ]

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="border-border bg-card">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
                <div className={`h-11 w-11 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* 🔥 FIXED PIE CHART */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm">Risk Distribution</CardTitle>
          </CardHeader>

          <CardContent>
            <ChartContainer
              config={{
                high: { label: "High", color: "hsl(var(--destructive))" },
                medium: { label: "Medium", color: "hsl(var(--chart-3))" },
                low: { label: "Low", color: "hsl(var(--chart-2))" },
              }}
              className="h-[200px] w-full"
            >
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell
                     key={index}
                     fill={
                         entry.name === "high"
                         ? "#000000"   // red
                         : entry.name === "medium"
                         ? "#D3D3D3"   // yellow
                         : "#A9A9A9"   // green
  }
/>
                  ))}
                </Pie>

                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm">Fraud Pattern Distribution</CardTitle>
          </CardHeader>

          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Alerts", color: "hsl(var(--chart-1))" },
              }}
              className="h-[200px] w-full"
            >
              <BarChart data={fraudPatternData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="pattern" type="category" width={120} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}