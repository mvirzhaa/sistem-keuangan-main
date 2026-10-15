import React, { useMemo } from "react";
import HighchartsReact from "highcharts-react-official";
import { getHighcharts } from "./highchartsInit";

export interface PieSliceData {
  label: string;
  value: number;
  formattedText?: string;
  color?: string;
}

interface PieChartCardProps {
  title: string;
  slices: PieSliceData[];
  unitName?: string;
  emptyContent?: React.ReactNode;
}

const DEFAULT_PALETTE = [
  "#60a5fa",
  "#374151",
  "#fb923c",
  "#818cf8",
  "#facc15",
  "#2dd4bf",
  "#38bdf8",
  "#fb7185",
  "#f87171",
  "#ef4444",
  "#eab308",
  "#4ade80",
  "#86efac",
  "#f43f5e",
  "#ec4899",
  "#1e293b",
];

export default function PieChartCard({
  title,
  slices,
  unitName,
  emptyContent,
}: PieChartCardProps) {
  const H = getHighcharts();

  const options: Highcharts.Options = useMemo(() => {
    const defaultUnit = title.toLowerCase().includes("pembayaran")
      ? "Pembayaran"
      : "Tagihan";
    const unit = unitName || defaultUnit;

    const seriesData = slices.map((s, idx) => {
      const sliceColor =
        s.color || DEFAULT_PALETTE[idx % DEFAULT_PALETTE.length];
      const displayVal = s.formattedText || `${s.value}`;
      const calloutLabel = `${s.label}: ${displayVal}`;

      return {
        name: s.label,
        y: s.value,
        color: sliceColor,
        calloutText: calloutLabel,
        metricDisplay: displayVal,
      };
    });

    return {
      chart: {
        type: "pie",
        backgroundColor: "#ffffff",
        style: {
          fontFamily: "Inter, system-ui, sans-serif",
        },
        height: 380,
      },
      title: {
        text: title,
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
      tooltip: {
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
          const ctx = this as any;
          const point = ctx.point || ctx;
          const pointColor = point.color || "#f87171";
          const name = point.name || "Slice";
          const metricVal = point.metricDisplay || `${point.y}`;
          return `
            <div style="font-size: 13px; font-family: Inter, system-ui, sans-serif; line-height: 1.4;">
              <div style="color: #475569; margin-bottom: 2px;">${name}</div>
              <div style="color: #1e293b; font-weight: 500;">
                <span style="color: ${pointColor}; font-size: 14px; margin-right: 4px;">■</span>${unit}: ${metricVal}
              </div>
            </div>
          `;
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          slicedOffset: 12,
          size: "72%",
          states: {
            hover: {
              halo: {
                size: 8,
                opacity: 0.25,
              },
            },
          },
          dataLabels: {
            enabled: true,
            format: "{point.calloutText}",
            distance: 20,
            connectorPadding: 4,
            connectorWidth: 1,
            softConnector: true,
            style: {
              fontSize: "11px",
              fontWeight: "600",
              color: "#1e293b",
              textOutline: "none",
            },
          },
          showInLegend: false,
        },
      },
      series: [
        {
          type: "pie",
          name: title,
          data: seriesData,
        },
      ],
    };
  }, [title, slices, unitName]);

  if (emptyContent || slices.length === 0) {
    return (
      <div className="w-full bg-white flex flex-col items-center justify-center min-h-[350px] p-4 text-center">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
          {title}
        </h3>
        <div className="text-gray-400 text-sm">
          {emptyContent || "Tidak ada data"}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <HighchartsReact highcharts={H} options={options} />
    </div>
  );
}
