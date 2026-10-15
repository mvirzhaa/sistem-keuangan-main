import React, { useMemo } from "react";
import HighchartsReact from "highcharts-react-official";
import { getHighcharts } from "./highchartsInit";

function formatNumberWithSpace(num: number): string {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

export default function PerbandinganTransaksiBulanLaluChart() {
  const H = getHighcharts();

  const categories = Array.from({ length: 30 }, (_, i) => String(i + 1));

  const options: Highcharts.Options = useMemo(
    () => ({
      chart: {
        type: "spline",
        backgroundColor: "#ffffff",
        style: {
          fontFamily: "Inter, system-ui, sans-serif",
        },
        height: 420,
      },
      title: {
        text: "Perbandingan Transaksi Dengan Bulan Lalu",
        style: {
          fontSize: "18px",
          fontWeight: "600",
          color: "#27272a",
        },
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
        fallbackToExportServer: false,
        buttons: {
          contextButton: {
            symbol: "menu",
            symbolStroke: "#4b5563",
            symbolFill: "#4b5563",
            symbolSize: 14,
            symbolX: 14,
            symbolY: 14,
            theme: {
              fill: "transparent",
              stroke: "none",
              r: 4,
              states: {
                hover: {
                  fill: "#f3f4f6",
                  stroke: "none",
                },
                select: {
                  fill: "#e5e7eb",
                  stroke: "none",
                },
              },
            } as any,
            menuItems: [
              "printChart",
              "separator",
              "downloadPNG",
              "downloadJPEG",
              "downloadPDF",
              "downloadSVG",
            ],
          },
        },
      },
      xAxis: {
        categories,
        crosshair: {
          width: 32,
          color: "rgba(224, 242, 254, 0.45)",
        },
        labels: {
          style: {
            fontSize: "11px",
            color: "#475569",
          },
        },
        lineColor: "#cbd5e1",
      },
      yAxis: {
        min: 0,
        max: 8,
        tickInterval: 1,
        title: {
          text: "Values",
          style: {
            fontSize: "12px",
            color: "#475569",
          },
        },
        labels: {
          formatter: function () {
            return this.value === 0 ? "0" : `${this.value}G`;
          },
          style: {
            fontSize: "11px",
            color: "#475569",
          },
        },
        gridLineColor: "#f1f5f9",
      },
      tooltip: {
        shared: false,
        useHTML: true,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1.5,
        shadow: {
          color: "rgba(0,0,0,0.08)",
          offsetX: 0,
          offsetY: 2,
          opacity: 1,
          width: 6,
        },
        padding: 8,
        formatter: function () {
          const ctx = this as any;
          const point = ctx.point || ctx;
          const displayVal = point.formattedText || `${this.y}G`;
          return `
            <div style="font-size: 12px; font-family: Inter, system-ui, sans-serif; line-height: 1.4;">
              <div style="color: #475569; margin-bottom: 3px;">${this.x}</div>
              <div style="color: #1e293b; font-weight: 500;">
                <span style="color: ${this.series.color}; font-size: 13px; margin-right: 4px;">●</span>${this.series.name}: <b>${displayVal}</b>
              </div>
            </div>
          `;
        },
      },
      legend: {
        align: "center",
        verticalAlign: "bottom",
        layout: "horizontal",
        itemStyle: {
          fontSize: "12px",
          fontWeight: "normal",
          color: "#334155",
        },
      },
      plotOptions: {
        spline: {
          lineWidth: 2,
          states: {
            hover: {
              lineWidth: 3,
            },
          },
        },
      },
      series: [
        {
          type: "spline",
          name: "Jumlah Pembayaran Bulan Ini",
          color: "#60a5fa",
          marker: {
            symbol: "circle",
            radius: 4,
          },
          data: Array(30).fill(0),
        },
        {
          type: "spline",
          name: "Jumlah Pembayaran Bulan Lalu",
          color: "#374151",
          marker: {
            symbol: "diamond",
            radius: 5,
          },
          data: Array(30).fill(0),
        },
        {
          type: "spline",
          name: "Nominal Pembayaran Bulan Ini",
          color: "#86efac",
          marker: {
            symbol: "square",
            radius: 4,
          },
          data: [
            { y: 0.9, formattedText: "900 000 000" },
            { y: 0.85, formattedText: "850 000 000" },
            { y: 0.08, formattedText: "80 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 1.05, formattedText: "1 050 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.65, formattedText: "650 000 000" },
            { y: 0.35, formattedText: "350 000 000" },
            { y: 0.42, formattedText: "420 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.58, formattedText: "580 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
            { y: 0.05, formattedText: "50 000 000" },
          ],
        },
        {
          type: "spline",
          name: "Nominal Pembayaran Bulan Lalu",
          color: "#f7a35c",
          marker: {
            symbol: "triangle",
            radius: 4,
          },
          data: [
            { y: 0.15, formattedText: "150 000 000" },
            { y: 7.185, formattedText: "7 185 000 000" },
            { y: 0.42, formattedText: "420 000 000" },
            { y: 0.46, formattedText: "460 000 000" },
            { y: 0.12, formattedText: "120 000 000" },
            { y: 0.08, formattedText: "80 000 000" },
            { y: 0.42, formattedText: "420 000 000" },
            { y: 0.82, formattedText: "820 000 000" },
            { y: 0.48, formattedText: "480 000 000" },
            { y: 0.42089, formattedText: "420 890 000" }, // Hovered in Image 3!
            { y: 0.84, formattedText: "840 000 000" },
            { y: 0.28, formattedText: "280 000 000" },
            { y: 0.15, formattedText: "150 000 000" },
            { y: 0.42, formattedText: "420 000 000" },
            { y: 0.28, formattedText: "280 000 000" },
            { y: 0.38, formattedText: "380 000 000" },
            { y: 0.46, formattedText: "460 000 000" },
            { y: 1.05, formattedText: "1 050 000 000" },
            { y: 0.4, formattedText: "400 000 000" },
            { y: 0.34, formattedText: "340 000 000" },
            { y: 1.02, formattedText: "1 020 000 000" },
            { y: 1.08, formattedText: "1 080 000 000" },
            { y: 0.92, formattedText: "920 000 000" },
            { y: 1.06, formattedText: "1 060 000 000" },
            { y: 1.06, formattedText: "1 060 000 000" },
            { y: 0.12, formattedText: "120 000 000" },
            { y: 0.32, formattedText: "320 000 000" },
            { y: 1.18, formattedText: "1 180 000 000" },
            { y: 1.46, formattedText: "1 460 000 000" },
            { y: 0.5, formattedText: "500 000 000" },
          ],
        },
      ],
    }),
    [categories],
  );

  return (
    <div className="w-full bg-white">
      <HighchartsReact highcharts={H} options={options} />
    </div>
  );
}
