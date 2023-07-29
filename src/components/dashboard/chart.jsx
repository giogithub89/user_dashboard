import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Box } from "@mui/material";

const LineChart = ({ value }) => {
  //   const sortedDate = () =>
  //     eps.sort(function (a, b) {
  //       var parseDate = function parseDate(dateAsString) {
  //         var dateParts = dateAsString.split("-");
  //         return new Date(parseInt(dateParts[2], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[0], 10));
  //       };

  //       return parseDate(b) - parseDate(a);
  //     });
  // Import the functions you need from the SDKs you need

  const week = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
  const year = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
  const [timeframe, setTimeframe] = useState(year);

  useEffect(() => {
    if (value === 1) {
      setTimeframe(week);
    } else if (value === 4) {
      setTimeframe(year);
    }
  }, [value]);

  useEffect(() => {
    const chart = new ChartJS(document.getElementById("line-chart"), {
      type: "line",
      data: {
        labels: timeframe,
        datasets: [
          {
            label: "Utenti",
            data: [12, 19, 23, 25, 32, 43, 55],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          //   yAxes: [
          //     {
          //       ticks: {
          //         beginAtZero: true,
          //       },
          //     },
          //   ],
        },
      },
    });
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <Box width={"100%"}>
      <canvas id="line-chart" width="100%"></canvas>
    </Box>
  );
};

export default LineChart;
