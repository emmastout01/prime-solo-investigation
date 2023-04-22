import { Chart } from "chart.js/auto";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Stack } from "@mui/material";

const DonutChart = ({}) => {
  const groupId = useParams();
  const categoriesArray = [];
  const categoriesTotalArray = [];
  const randomColors = [];
  const [chartGenerated, setChartGenerated] = useState(false);

  const dispatch = useDispatch();

  const currentGroup = useSelector((store) => store.currentGroup);
  const categoryTotals = useSelector((store) => store.categoryTotals);

  useEffect(() => {
    if (!chartGenerated && currentGroup.id) {
      dispatch({ type: "FETCH_CATEGORY_TOTALS", payload: currentGroup.id });
      dispatch({ type: "FETCH_CURRENT_GROUP", payload: groupId });
    }
  }, [chartGenerated, currentGroup.id]);

  useEffect(() => {
    if (categoryTotals.length && currentGroup.id && !chartGenerated) {
      for (let category of categoryTotals) {
        const randomColor = getRandomColor();
        categoriesArray.push(category.name);
        categoriesTotalArray.push(category.expenseTotal);
        randomColors.push(randomColor);
      }
      makeDonutChart();
      setChartGenerated(true);
    }
  }, [categoryTotals, currentGroup.id, chartGenerated]);

  function getRandomColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  for (let i = 0; i < categoriesArray.length; i++) {
    let color = getRandomColor();
    randomColors.push(color);
  }

  for (let category of categoryTotals) {
    const randomColor = getRandomColor();
    categoriesArray.push(category.name);
    categoriesTotalArray.push(category.expenseTotal);
    randomColors.push(randomColor);
  }

  console.log("randomColors:", randomColors);
  console.log(categoriesArray, categoriesTotalArray);

  const makeDonutChart = () => {
    (async function () {
      const data = {
        labels: categoriesArray,
        datasets: [
          {
            label: "Amount",
            data: categoriesTotalArray,
            backgroundColor: randomColors,
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
              text: "Categories",
            },
          },
        },
      });
    })();
  };

  return <canvas id="donut"></canvas>;
};

export default DonutChart;
