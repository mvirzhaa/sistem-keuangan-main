import React, { useMemo } from "react";
import HighchartsReact from "highcharts-react-official";
import { getHighcharts } from "./highchartsInit";

interface StatistikPembayaranChartProps {
  periode?: string;
}

export default function StatistikPembayaranChart({
  periode = "2026 Ganjil",
}: StatistikPembayaranChartProps) {
  const H = getHighcharts();

  const labels = [
    "13/09", "14/09", "15/09", "16/09", "17/09", "18/09", "19/09", "20/09",
    "21/09", "22/09", "23/09", "24/09", "25/09", "26/09", "27/09", "28/09",
    "29/09", "30/09", "01/10", "02/10", "03/10", "04/10", "05/10", "06/10",
    "07/10", "08/10", "09/10", "10/10", "11/10", "12/10", "13/10",
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
        text:
          periode === "-- Semua Periode --"
            ? "Statistik Pembayaran Semua Periode"
            : `Statistik Pembayaran ${periode}`,
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
        chartOptions: {
          chart: {
            backgroundColor: "#ffffff",
          },
          title: {
            text:
              periode === "-- Semua Periode --"
                ? "Statistik Pembayaran Semua Periode"
                : `Statistik Pembayaran ${periode}`,
            style: {
              fontSize: "20px",
              fontWeight: "bold",
              color: "#1e293b",
            },
          },
        },
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
            },
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
        categories: labels,
        crosshair: {
          width: 32,
          color: "rgba(224, 242, 254, 0.45)", // Light blue column highlight bar as in Image 1
        },
        title: {
          text: "Tanggal",
          style: {
            color: "#475569",
            fontSize: "12px",
          },
        },
        labels: {
          rotation: -45,
          style: {
            fontSize: "11px",
            color: "#475569",
          },
        },
        gridLineWidth: 1,
        gridLineColor: "#f1f5f9",
      },
      yAxis: [
        {
          // Left Y-Axis: Juta
          title: {
            text: "Juta",
            style: {
              color: "#475569",
              fontSize: "12px",
            },
          },
          min: 0,
          max: 750,
          tickInterval: 150,
          gridLineColor: "#e2e8f0",
          gridLineWidth: 1,
          labels: {
            style: {
              fontSize: "11px",
              color: "#475569",
            },
          },
        },
        {
          // Right Y-Axis: Nominal Pembayaran
          title: {
            text: "Nominal Pembayaran", // Fixed: Nominal Pembayaran (matches Foto 1 and Foto 3)
            style: {
              color: "#475569",
              fontSize: "12px",
            },
          },
          min: 0,
          max: 750,
          tickInterval: 150,
          opposite: true,
          gridLineWidth: 0,
          labels: {
            formatter: function () {
              return this.value === 0 ? "0" : `${this.value}M`;
            },
            style: {
              fontSize: "11px",
              color: "#475569",
            },
          },
        },
      ],
      tooltip: {
        shared: false, // Fixed: Only show the single point hovered
        useHTML: true,
        formatter: function () {
          const val = this.y;
          let suffix = "";
          if (
            this.series.name === "Jumlah Penerimaan" ||
            this.series.name === "Nominal Pembayaran"
          ) {
            suffix = " Juta";
          }
          return `<span style="font-size: 12px; color: #1e293b; font-weight: 500;">${this.series.name}: ${val}${suffix}</span>`;
        },
        backgroundColor: "#ffffff",
        borderColor: "#93c5fd",
        borderRadius: 6,
        borderWidth: 1,
        shadow: {
          color: "rgba(0,0,0,0.08)",
          offsetX: 0,
          offsetY: 2,
          opacity: 1,
          width: 6,
        },
        padding: 8,
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
          name: "Jumlah Penerimaan",
          data: [
            120, 311, 220, 290, 345, 590, 330, 305, 620, 430, 325, 325, 320, 85,
            45, 200, 165, 160, 255, 205, 60, 40, 245, 170, 170, 115, 115, 25,
            10, 195, 0,
          ],
          color: "#60a5fa",
          marker: {
            symbol: "circle",
            radius: 4,
          },
        },
        {
          type: "spline",
          name: "Jumlah Transaksi",
          data: [
            5, 8, 7, 10, 12, 18, 11, 10, 22, 15, 12, 11, 14, 5, 3, 8, 8, 7, 9,
            10, 4, 2, 9, 7, 6, 4, 3, 1, 0, 7, 0,
          ],
          color: "#374151",
          marker: {
            symbol: "diamond",
            radius: 4,
          },
        },
        {
          type: "spline",
          name: "Jumlah Transaksi Mahasiswa",
          data: [
            65, 150, 90, 135, 155, 240, 135, 125, 265, 195, 155, 140, 180, 40,
            20, 90, 90, 85, 115, 120, 25, 10, 110, 75, 75, 45, 45, 10, 0, 90, 0,
          ],
          color: "#86efac",
          marker: {
            symbol: "square",
            radius: 4,
          },
        },
        {
          type: "spline",
          name: "Jumlah Transaksi Pendaftar",
          data: [
            20, 20, 10, 10, 5, 12, 8, 5, 22, 15, 10, 15, 40, 0, 0, 5, 10, 5, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ],
          color: "#fb923c",
          marker: {
            symbol: "triangle",
            radius: 4,
          },
        },
        {
          type: "spline",
          name: "Nominal Pembayaran",
          data: [
            120, 311, 220, 290, 345, 590, 330, 305, 620, 430, 325, 325, 320, 85,
            45, 200, 165, 160, 255, 205, 60, 40, 245, 170, 170, 115, 115, 25,
            10, 195, 0,
          ],
          color: "#818cf8",
          yAxis: 1,
          marker: {
            symbol: "square",
            radius: 4,
          },
        },
      ],
    }),
    [periode, labels],
  );

  return (
    <div className="w-full bg-white">
      <HighchartsReact highcharts={H} options={options} />
    </div>
  );
}
