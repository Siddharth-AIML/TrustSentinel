"use client"

import { useState } from "react"
import Papa from "papaparse"
import { Upload, FileText, CheckCircle, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UploadedFile {
  name: string
  status: "uploaded" | "pending"
  data?: any[]
}

const fileTypes = [
  { name: "transactions.csv", description: "Transaction records" },
  { name: "customers.csv", description: "Customer information" },
  { name: "accounts.csv", description: "Account details" },
]

interface DataUploadSectionProps {
  expanded?: boolean
  onAnalysisComplete?: (data: any) => void
}

export function DataUploadSection({ expanded = false, onAnalysisComplete }: DataUploadSectionProps) {

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragOver, setDragOver] = useState(false)

  // 🔥 CLEAN DATA FUNCTION (VERY IMPORTANT FIX)
  const cleanData = (rows: any[]) => {
    return rows.map((row) => ({
      transaction_id: String(row.transaction_id || row.Row || "").trim(),
      from_account: String(row.from_account || row.Source || "").trim(),
      to_account: String(row.to_account || row.Destination || "").trim(),
      amount: Number(row.amount || row.Amount || 0),
    }))
  }

  const handleFileUpload = (file: File) => {

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {

        let parsedData = results.data

        // 🔥 ONLY CLEAN TRANSACTIONS FILE
        if (file.name === "transactions.csv") {
          parsedData = cleanData(parsedData)
        }

        const newFile: UploadedFile = {
          name: file.name,
          status: "uploaded",
          data: parsedData
        }

        setUploadedFiles(prev => {
          const existing = prev.filter(f => f.name !== file.name)
          return [...existing, newFile]
        })
      }
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const file = e.dataTransfer.files[0]

    if (file && file.name.endsWith(".csv")) {
      handleFileUpload(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileUpload(file)
  }

  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== fileName))
  }

  const startAnalysis = async () => {

    const transactions = uploadedFiles.find(f => f.name === "transactions.csv")?.data
    const customers = uploadedFiles.find(f => f.name === "customers.csv")?.data
    const accounts = uploadedFiles.find(f => f.name === "accounts.csv")?.data

    console.log("Transactions:", transactions)

    try {

      const res = await fetch("https://trustsentinel.onrender.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          transactions,
          customers,
          accounts
        })
      })

      const data = await res.json()

      console.log("Response:", data)

      // ❌ API ERROR HANDLING
      if (data.error) {
        console.error("Backend Error:", data.error)
        alert("Error: " + data.error)
        return
      }

      // ✅ SAVE
      localStorage.setItem("analysis", JSON.stringify(data))

      // ✅ UPDATE UI (CRITICAL FIX)
      onAnalysisComplete?.(data)

    } catch (err) {
      console.error("Fetch Error:", err)
    }
  }

  return (

    <Card className={cn("border-border bg-card", expanded && "max-w-md")}>

      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
          <Upload className="h-4 w-4 text-primary" />
          Data Upload
        </CardTitle>

        <CardDescription className="text-muted-foreground text-sm">
          Upload CSV files for fraud analysis
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">

        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer",
            dragOver
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >

          <input
            type="file"
            accept=".csv"
            className="hidden"
            id="fileUpload"
            onChange={handleFileSelect}
          />

          <label htmlFor="fileUpload" className="cursor-pointer">
            <div className="h-12 w-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary" />
            </div>

            <p className="text-sm font-medium text-foreground mb-1">
              Drop CSV file here or click to upload
            </p>

            <p className="text-xs text-muted-foreground">
              Supports CSV files up to 50MB
            </p>
          </label>

        </div>

        <div className="space-y-2">

          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Required Files
            </p>

            <p className="text-xs text-muted-foreground">
              {uploadedFiles.length}/3 uploaded
            </p>
          </div>

          {fileTypes.map((file) => {

            const uploaded = uploadedFiles.find(u => u.name === file.name)

            return (
              <div
                key={file.name}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg text-sm border transition-colors",
                  uploaded ? "bg-chart-3/5 border-chart-3/20" : "bg-muted/50 border-border"
                )}
              >

                <div className="flex items-center gap-3">

                  <div className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center",
                    uploaded ? "bg-chart-3/10" : "bg-muted"
                  )}>
                    <FileText className={cn(
                      "h-4 w-4",
                      uploaded ? "text-chart-3" : "text-muted-foreground"
                    )} />
                  </div>

                  <div>
                    <p className={cn(
                      "font-medium text-sm",
                      uploaded ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {file.name}
                    </p>

                    <p className="text-[11px] text-muted-foreground">
                      {file.description}
                    </p>
                  </div>

                </div>

                {uploaded ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-chart-3" />

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFile(file.name)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ) : (
                  <span className="text-[11px] text-muted-foreground bg-muted px-2 py-1 rounded">
                    Pending
                  </span>
                )}

              </div>
            )
          })}

        </div>

        <Button
          className="w-full gap-2"
          disabled={uploadedFiles.length < 3}
          onClick={startAnalysis}
        >
          <Upload className="h-4 w-4" />
          Start Analysis
        </Button>

      </CardContent>
    </Card>
  )
}