import { Chart } from "chart.js/auto";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DonutChart = ({ categoryTotals }) => {
  const categoriesArray = [];
  const categoriesTotalArray = [];

  for (let category of categoryTotals) {
    categoriesArray.push(category.name);
    categoriesTotalArray.push(category.expenseTotal);
  }

  console.log(categoriesArray, categoriesTotalArray);  

  const makeDonutChart = () => {
    (async function () {
      const data = {
        labels: categoriesArray,
        datasets: [
          {
            label: "My First Dataset",
            data: categoriesTotalArray,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      };

      new Chart(document.getElementById("donut"), {
        type: "doughnut",
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Chart.js Doughnut Chart",
            },
          },
        },
      });
    })();
  };

  useEffect(() => {
    makeDonutChart();
  }, [])

  return (
    <div>
      <div className="container3">
        <canvas id="donut"></canvas>
      </div>
    </div>
  );
};

export default DonutChart;
