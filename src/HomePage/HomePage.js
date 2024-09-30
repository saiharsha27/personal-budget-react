// HomePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartJS from "../Chart/ChartJS";
import D3JS from "../D3JS/D3JS";

function HomePage() {
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [d3Data, setD3Data] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/budget")
      .then((response) => {
        const budget = response.data.myBudget;

        const labels = budget.map((item) => item.title);
        const data = budget.map((item) => item.budget);
        setChartData({ labels, data });

        const d3FormattedData = budget.map((item) => ({
          label: item.title,
          value: item.budget,
        }));
        setD3Data(d3FormattedData);
      })
      .catch((error) => {
        console.error("Error fetching budget data:", error);
      });
  }, []);

  return (
    <section id="main-content" className="container center">
      <div className="page-area">
        <article className="text-box">
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article className="text-box">
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article className="text-box">
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they live happier lives... since they
            spend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article className="text-box">
          <h1>Free</h1>
          <p>
            This app is free!!! And you are the only one holding your data!
          </p>
        </article>

        {}
        <article className="text-box">
          <h1>Chart</h1>
          <ChartJS chartData={chartData} />
        </article>

        {}
        <article className="text-box">
          <h1>D3.js Chart</h1>
          <D3JS d3Data={d3Data} />
        </article>
      </div>
    </section>
  );
}

export default HomePage;
