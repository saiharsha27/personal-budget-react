import React, { useEffect } from "react";
import * as d3 from "d3";

function D3JS({ d3Data }) {
  useEffect(() => {
    d3.select("#d3-chart").selectAll("*").remove();

    const width = 960, height = 450, radius = Math.min(width, height) / 2;

    const svg = d3.select("#d3-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arcs = svg.selectAll("arc")
      .data(pie(d3Data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.label));

    arcs.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("dy", "0.35em")
      .text(d => d.data.label);
  }, [d3Data]);

  return <div id="d3-chart"></div>;
}

export default D3JS;
