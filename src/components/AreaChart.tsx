import { useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface AreaChartProps {
  data?: number[];
  categories?: string[];
  height?: number;
  title?: string;
}

export const AreaChart = ({
  data = [0, 100, 50, 125, 70, 150, 100, 170, 120, 175, 100, 200],
  categories = [
    "1 Mar 2024",
    "2 Mar 2024",
    "3 Mar 2024",
    "4 Mar 2024",
    "5 Mar 2024",
    "6 Mar 2024",
    "7 Mar 2024",
    "8 Mar 2024",
    "9 Mar 2024",
    "10 Mar 2024",
    "11 Mar 2024",
    "12 Mar 2024",
  ],
  height = 400,
  title = "Units",
}: AreaChartProps) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        background: "transparent",
      },
      series: [
        {
          name: title,
          data: data,
        },
      ],
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      grid: {
        strokeDashArray: 2,
        borderColor: "hsl(var(--border))",
      },
      colors: ["hsl(var(--primary))"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          gradientToColors: ["hsl(var(--background))"],
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        type: "category",
        tickPlacement: "on",
        categories: categories,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        labels: {
          style: {
            colors: "hsl(var(--muted-foreground))",
            fontSize: "12px",
            fontWeight: 400,
          },
          formatter: (value: string) => {
            if (value) {
              const parts = value.split(" ");
              return `${parts[0]} ${parts[1]?.slice(0, 3) || ""}`;
            }
            return value;
          },
        },
      },
      yaxis: {
        labels: {
          align: "left",
          minWidth: 0,
          maxWidth: 140,
          style: {
            colors: "hsl(var(--muted-foreground))",
            fontSize: "12px",
            fontWeight: 400,
          },
          formatter: (value: number) =>
            value >= 1000 ? `${value / 1000}k` : String(value),
        },
      },
      tooltip: {
        theme: "dark",
        x: {
          format: "MMMM yyyy",
        },
        y: {
          formatter: (value: number) =>
            `${value >= 1000 ? `${value / 1000}k` : value}`,
        },
      },
      responsive: [
        {
          breakpoint: 568,
          options: {
            chart: {
              height: 300,
            },
            xaxis: {
              labels: {
                style: {
                  fontSize: "10px",
                  colors: "hsl(var(--muted-foreground))",
                },
                formatter: (value: string) => value?.slice(0, 3) || value,
              },
            },
            yaxis: {
              labels: {
                style: {
                  fontSize: "10px",
                  colors: "hsl(var(--muted-foreground))",
                },
              },
            },
          },
        },
      ],
    }),
    [data, categories, title]
  );

  return (
    <div className="w-full">
      <Chart
        options={options}
        series={options.series}
        type="area"
        height={height}
      />
    </div>
  );
};
