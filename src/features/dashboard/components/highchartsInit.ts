import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import offlineExportingInit from "highcharts/modules/offline-exporting";
import funnelInit from "highcharts/modules/funnel";

let initialized = false;

export function getHighcharts(): typeof Highcharts {
  if (!initialized && typeof window !== "undefined") {
    try {
      if (typeof exportingInit === "function") {
        (exportingInit as any)(Highcharts);
      }
      if (typeof offlineExportingInit === "function") {
        (offlineExportingInit as any)(Highcharts);
      }
      if (typeof funnelInit === "function") {
        (funnelInit as any)(Highcharts);
      }

      // Configure global export buttons to match Review Tagihan style (clean 3 grey lines, no black box)
      Highcharts.setOptions({
        lang: {
          printChart: "Print chart",
          downloadPNG: "Download PNG image",
          downloadJPEG: "Download JPEG image",
          downloadPDF: "Download PDF document",
          downloadSVG: "Download SVG vector image",
        },
        exporting: {
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
            },
          },
        },
        navigation: {
          buttonOptions: {
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
          },
          menuStyle: {
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            padding: "4px 0",
            borderRadius: "6px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
          menuItemStyle: {
            padding: "8px 16px",
            color: "#374151",
            fontSize: "12px",
            fontFamily: "Inter, system-ui, sans-serif",
          },
          menuItemHoverStyle: {
            background: "#f3f4f6",
            color: "#111827",
          },
        },
      });

      initialized = true;
    } catch (e) {
      console.warn("Highcharts module init error:", e);
    }
  }
  return Highcharts;
}

export default Highcharts;
