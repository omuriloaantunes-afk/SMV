"use client"

import { Section, GlassCard } from "@/components/mobile/containers"
import { RED } from "@/lib/constants"
import {
  LineChart as RLineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts"

const data = [
  { dia: "Seg", pct: 40, done: 8 },
  { dia: "Ter", pct: 55, done: 11 },
  { dia: "Qua", pct: 85, done: 17 },
  { dia: "Qui", pct: 70, done: 14 },
  { dia: "Sex", pct: 60, done: 12 },
  { dia: "Sáb", pct: 30, done: 6 },
  { dia: "Dom", pct: 20, done: 4 },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col space-y-6 pt-6 pb-6">
      <Section>
        <h1 className="text-2xl font-semibold">Seu progresso da semana</h1>
      </Section>

      <Section>
        <GlassCard className="p-4 overflow-visible">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%" style={{ overflow: "visible" }}>
              <RLineChart
                data={data}
                margin={{ left: 16, right: 16, top: 10, bottom: 12 }} // espaço para rótulos
              >
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis
                  dataKey="dia"
                  stroke="#bdbdbd"
                  tickLine={false}
                  axisLine={false}
                  interval={0} // mostrar todos os dias, incluindo "Seg"
                  tickMargin={8}
                />
                <YAxis
                  stroke="#bdbdbd"
                  width={40} // mais espaço para não “tapar” números
                  tickMargin={8}
                  tickFormatter={(v) => `${v}%`}
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ stroke: "rgba(255,255,255,0.2)" }}
                  contentStyle={{
                    background: "rgba(20,20,20,0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    color: "white",
                  }}
                  formatter={(value: any, name, props) => {
                    const rec = props && (props.payload as any)
                    return [`${rec.done} tarefas concluídas`, " "]
                  }}
                  labelFormatter={(l) => `${l}`}
                />
                <Line
                  type="monotone"
                  dataKey="pct"
                  stroke={RED}
                  strokeWidth={3}
                  dot={{ r: 4, stroke: RED, fill: "#fff" }}
                  activeDot={{ r: 6 }}
                />
              </RLineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </Section>

      <Section className="pb-6">
        <GlassCard glass="default" className="p-4">
          <p className="text-sm text-neutral-200">
            Você teve um pico de produtividade na quarta-feira! Mantenha blocos de foco de 25 min.
          </p>
        </GlassCard>
      </Section>
    </div>
  )
}
