"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A radar chart showing asset allocation"

const defaultChartData = [
  { month: "Large Cap", desktop: 35 },
  { month: "Mid Cap", desktop: 25 },
  { month: "Small Cap", desktop: 15 },
  { month: "Flexi Cap", desktop: 15 },
  { month: "Debt / Liquid", desktop: 10 },
]

interface ChartRadarDotsProps {
  className?: string
  title?: string
  descriptionText?: string
  data?: Record<string, unknown>[]
  dataKey?: string
  categoryKey?: string
  dataLabel?: string
  footerTrending?: string
  footerSubtitle?: string
}

export function ChartRadarDots({
  className,
  title = "Asset Class Allocation",
  descriptionText = "Portfolio distribution across asset categories",
  data = defaultChartData,
  dataKey = "desktop",
  categoryKey = "month",
  dataLabel = "Allocation (%)",
  footerTrending = "Optimized asset diversification",
  footerSubtitle = "Target Allocation Model",
}: ChartRadarDotsProps) {
  const chartConfig = React.useMemo(() => ({
    [dataKey]: {
      label: dataLabel,
      color: "#3A8293",
    },
  }) satisfies ChartConfig, [dataKey, dataLabel])

  return (
    <Card className={`bg-white/60 backdrop-blur-xl border border-border/40 shadow-sm rounded-3xl overflow-hidden flex flex-col justify-between ${className || ""}`}>
      <CardHeader className="items-center pb-2 text-center">
        <CardTitle className="text-base sm:text-lg font-bold font-clash text-neutral-900">{title}</CardTitle>
        <CardDescription className="text-xs text-neutral-500 font-sans">
          {descriptionText}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0 flex-1 flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey={categoryKey} stroke="#888888" tick={{ fontSize: 11 }} />
            <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <Radar
              dataKey={dataKey}
              fill="#3A8293"
              fillOpacity={0.45}
              stroke="#3A8293"
              strokeWidth={2}
              dot={{
                r: 4,
                fillOpacity: 1,
                fill: "#3A8293",
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1.5 text-xs font-sans pt-3 pb-5 border-t border-border/20 mt-2">
        <div className="flex items-center gap-1.5 leading-none font-semibold text-neutral-900">
          {footerTrending} <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground text-[11px]">
          {footerSubtitle}
        </div>
      </CardFooter>
    </Card>
  )
}
