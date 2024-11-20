"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "OMG",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Component({ records }) {
  const chartData = records;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your average marks</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          style={{
            width: "100%", // Set desired width
            height: "35rem", // Set desired height
          }}
        >
          <BarChart
            data={chartData}
            margin={{
              top: 20, // Adjust margins to fit the smaller size
              right: 10,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={8} // Adjust margins for ticks
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="percentage" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={8} // Reduce offset to match smaller bars
                className="fill-foreground"
                fontSize={10} // Adjust font size for labels
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
