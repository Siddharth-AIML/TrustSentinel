"use client"

import { useState } from "react"
import { Network, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NetworkGraphProps {
  expanded?: boolean
  data?: any
  alerts?: any[]   // 🔥 NEW
}

export function NetworkGraph({ expanded = false, data, alerts = [] }: NetworkGraphProps) {

  const [zoom, setZoom] = useState(1)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const nodes = data?.nodes || []
  const links = data?.links || []
  const groupedEdges: Record<string, any[]> = {}

  links.forEach((edge: any) => {
  const key = `${edge.source}-${edge.target}`

  if (!groupedEdges[key]) {
    groupedEdges[key] = []
  }

  groupedEdges[key].push(edge)
 })
  const spacing = 140
  const width = Math.max(800, nodes.length * spacing)

  const nodePositions = nodes.map((node: any, index: number) => ({
    ...node,
    x: 100 + index * spacing,
    y: 150,
  }))

  // 🔥 CREATE RISK MAP
  const riskMap: Record<string, string> = {}

  alerts.forEach((a) => {
    riskMap[a.account_id] = a.risk_level
  })

  // 🔥 NODE COLOR BASED ON RISK
  const getNodeColor = (id: string) => {
    const risk = riskMap[id]

    if (risk === "high") return "#ef4444"   // red
    if (risk === "medium") return "#f59e0b" // yellow
    if (risk === "low") return "#22c55e"    // green

    return "#3b82f6" // blue default
  }

  return (
    <Card className={cn("border-border bg-card", expanded && "min-h-[600px]")}>

      <CardHeader>
        <div className="flex justify-between">

          <div>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-4 w-4 text-primary" />
              Transaction Network
            </CardTitle>
            <CardDescription>
              Real-time fund flow graph
            </CardDescription>
          </div>

          <div className="flex gap-1">
            <Button size="icon" variant="ghost" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}>
              <ZoomOut className="h-4 w-4" />
            </Button>

            <Button size="icon" variant="ghost" onClick={() => setZoom(z => Math.min(2, z + 0.1))}>
              <ZoomIn className="h-4 w-4" />
            </Button>

            <Button size="icon" variant="ghost">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

        </div>
      </CardHeader>

      <CardContent>

        <div className="rounded-lg border bg-muted/50 overflow-x-auto">

          <svg
            width={width}
            height={expanded ? 500 : 300}
            style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
          >

            {/* 🔥 EDGES */}
            {Object.entries(groupedEdges).map(([key, edges], i) => {

            const [source, target] = key.split("-")

            const from = nodePositions.find((n: any) => n.id === source)
            const to = nodePositions.find((n: any) => n.id === target)

           if (!from || !to) return null

           const totalAmount = edges.reduce((sum, e) => sum + Number(e.amount), 0)

           const isSuspicious =
            riskMap[source]?.toLowerCase() || riskMap[target]?.toLowerCase()

           const offset = 40 + (i % 5) * 10

            return (
            <g key={key}>

      {/* 🔥 CURVED CLEAN EDGE */}
      <path
        d={`M ${from.x} ${from.y} Q ${(from.x + to.x)/2} ${from.y - offset} ${to.x} ${to.y}`}
        stroke={isSuspicious ? "#ef4444" : "#94a3b8"}
        strokeWidth={isSuspicious ? 2.5 : 1.5}
        fill="none"
      />

      {/* 🔥 TOTAL AMOUNT */}
      <text
        x={(from.x + to.x) / 2}
        y={(from.y + to.y) / 2 - offset / 2}
        textAnchor="middle"
        className="text-[10px] fill-muted-foreground"
      >
        ₹{totalAmount}
      </text>

      {/* 🔥 TRANSACTION COUNT */}
      {edges.length > 1 && (
        <text
          x={(from.x + to.x) / 2}
          y={(from.y + to.y) / 2 + 10}
          textAnchor="middle"
          className="text-[9px] fill-red-500"
           >
           {edges.length} txns
           </text>
           )}

          </g>
            )
          })}

            {/* 🔥 NODES */}
            {nodePositions.map((node: any) => {

              const color = getNodeColor(node.id)

              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  className="cursor-pointer"
                >

                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={selectedNode === node.id ? 24 : 20}
                    fill={color}   // 🔥 COLOR HERE
                    opacity={0.9}
                  />

                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    className="fill-white text-[9px]"
                  >
                    {node.id}
                  </text>

                </g>
              )
            })}

          </svg>

        </div>

        {!data && (
          <p className="text-sm text-muted-foreground mt-4">
            Upload data to visualize transaction network
          </p>
        )}

      </CardContent>
    </Card>
  )
}