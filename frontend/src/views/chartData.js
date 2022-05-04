const getChartOption = (data, theme) => {
  const ChartOptions = {
    type: "area",
    options: {
      chart: {
        id: "AreaChart",
        type: "area",
        foreColor: "#ccc",
        toolbar: {
          autoSelected: "pan",
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: [theme.palette.success.dark],
      grid: {
        borderColor: theme.palette.success.light,
        clipMarkers: true,
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      yaxis: {
        tickAmount: 4,
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        theme: "dark",
        fixed: {
          enabled: false,
        },
      },
    },
    series: [
      {
        data: data,
      },
    ],
  };

  return ChartOptions;
};

export default getChartOption;
