import React, { useMemo } from "react";
import HighchartsReact from "highcharts-react-official";
import { getHighcharts } from "./highchartsInit";

function formatNumberWithSpace(num: number): string {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

export default function TransaksiTiapBulanChart() {
  const H = getHighcharts();

  const categories = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
    "Lainnya",
  ];

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
        text: "Transaksi Tiap Bulan",
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
          width: 50,
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
        max: 30,
        tickInterval: 5,
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
          let displayVal = "";
          if (this.series.name === "Jumlah Pembayaran") {
            displayVal = point.count
              ? formatNumberWithSpace(point.count)
              : this.y === 0
              ? "0"
              : formatNumberWithSpace(this.y || 0);
          } else {
            const val = this.y || 0;
            displayVal =
              val >= 1
                ? `${val}G`
                : val > 0
                ? `${Math.round(val * 1000)} Juta`
                : "0";
          }
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
          name: "Nominal Tagihan",
          color: "#60a5fa",
          marker: {
            symbol: "circle",
            radius: 4,
          },
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.25, 0.1, 0, 0],
        },
        {
          type: "spline",
          name: "Nominal Pembayaran",
          color: "#374151",
          marker: {
            symbol: "diamond",
            radius: 5,
          },
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 15.2, 24.8, 6.2, 6.2],
        },
        {
          type: "spline",
          name: "Jumlah Pembayaran",
          color: "#86efac",
          marker: {
            symbol: "square",
            radius: 4,
          },
          data: [
            { y: 0, count: 0 },
            { y: 0, count: 0 },
            { y: 0, count: 0 },
            { y: 0, count: 0 },
            { y: 0, count: 0 },
            { y: 0, count: 0 },
            { y: 0, count: 0 },
            { y: 0, count: 2288 }, // Hovered in Image 2
            { y: 0, count: 0 },
            { y: 0, count: 0 },
            { y: 0, count: 0 },
            { y: 0, count: 0 },
            { y: 0, count: 0 },
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
