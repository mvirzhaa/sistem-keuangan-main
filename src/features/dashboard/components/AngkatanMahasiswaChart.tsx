import React, { useMemo } from "react";
import HighchartsReact from "highcharts-react-official";
import { getHighcharts } from "./highchartsInit";

function formatNumberWithSpace(num: number): string {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

export default function AngkatanMahasiswaChart() {
  const H = getHighcharts();

  const categories = [
    "2026",
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
  ];

  const options: Highcharts.Options = useMemo(
    () => ({
      chart: {
        type: "bar",
        backgroundColor: "#ffffff",
        style: {
          fontFamily: "Inter, system-ui, sans-serif",
        },
        height: 520,
      },
      title: {
        text: "Angkatan Mahasiswa",
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
        title: {
          text: undefined,
        },
        labels: {
          style: {
            fontSize: "12px",
            color: "#475569",
          },
        },
        lineColor: "#cbd5e1",
        tickColor: "#cbd5e1",
      },
      yAxis: {
        min: 0,
        title: {
          text: undefined,
        },
        labels: {
          enabled: false,
        },
        gridLineWidth: 1,
        gridLineColor: "#f1f5f9",
      },
      tooltip: {
        shared: false,
        useHTML: true,
        backgroundColor: "#ffffff",
        borderRadius: 4,
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
          const val = formatNumberWithSpace(this.y || 0);
          return `
            <div style="font-size: 12px; font-family: Inter, system-ui, sans-serif; line-height: 1.4;">
              <div style="color: #475569; margin-bottom: 3px;">${this.x}</div>
              <div style="color: #1e293b; font-weight: 500;">
                <span style="color: ${this.series.color}; font-size: 13px; margin-right: 4px;">●</span>${this.series.name}: <b>${val} Juta</b>
              </div>
            </div>
          `;
        },
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "top",
        x: -20,
        y: 50,
        floating: true,
        backgroundColor: "#ffffff",
        borderColor: "#cbd5e1",
        borderWidth: 1,
        borderRadius: 4,
        shadow: {
          color: "rgba(0,0,0,0.06)",
          offsetX: 0,
          offsetY: 1,
          opacity: 1,
          width: 4,
        },
        itemStyle: {
          fontSize: "12px",
          fontWeight: "500",
          color: "#334155",
        },
      },
      plotOptions: {
        bar: {
          borderWidth: 0,
          borderRadius: 2,
          pointPadding: 0.1,
          groupPadding: 0.2,
          dataLabels: {
            enabled: true,
            inside: false,
            align: "right",
            crop: false,
            overflow: "allow",
            style: {
              fontSize: "11px",
              fontWeight: "600",
              color: "#1e293b",
              textOutline: "none",
            },
            formatter: function () {
              if (this.y === undefined || this.y === null || this.y === 0) {
                return "";
              }
              return formatNumberWithSpace(this.y);
            },
          },
        },
      },
      series: [
        {
          type: "bar",
          name: "Nominal Tagihan",
          color: "#7cb5ec",
          data: [
            22120.675, 31779.0975, 34665.9925, 25605.3675, 17648.4825, 66.52,
            79.495, 5.6, 0.3,
          ],
        },
        {
          type: "bar",
          name: "Nominal Bayar",
          color: "#434348",
          data: [
            9069.06, 24151.1125, 18614.975, 17321.4775, 13697.053125, 26.82,
            38.225, 2.95, 0.3,
          ],
        },
        {
          type: "bar",
          name: "Sisa Tagihan",
          color: "#90ed7d",
          data: [
            12847.09, 3970.735, 3234.9125, 2789.885, 328.415, 24.7, 22.27,
            0.95, 0,
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
