import { Component, OnInit } from '@angular/core';
import * as d3Select from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';
import * as d3 from 'd3-line';
import * as d3Shape from 'd3-shape';



@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  private data = [
    { "Country": "Burundi", "Year": "1941", "Population (000s)": "22322", "Population_Density": 22, "Population_Growth_Rate": "1.21" },
    { "Country": "Burundi", "Year": "1942", "Population (000s)": "22322", "Population_Density": 42, "Population_Growth_Rate": "5.21" },
    { "Country": "Burundi", "Year": "1943", "Population (000s)": "22322", "Population_Density": 52, "Population_Growth_Rate": "3.21" },
    { "Country": "Comoros", "Year": "1950", "Population (000s)": "24328", "Population_Density": 32, "Population_Growth_Rate": "6.21" },
    { "Country": "Comoros", "Year": "1951", "Population (000s)": "24328", "Population_Density": 26, "Population_Growth_Rate": "4.21" },
    { "Country": "Comoros", "Year": "1952", "Population (000s)": "24328", "Population_Density": 76, "Population_Growth_Rate": "1.21" },
    { "Country": "Djibouti", "Year": "1960", "Population (000s)": "25329", "Population_Density": 52, "Population_Growth_Rate": "5.21" },
    { "Country": "Djibouti", "Year": "1961", "Population (000s)": "25329", "Population_Density": 70, "Population_Growth_Rate": "5.21" },
    { "Country": "Djibouti", "Year": "1962", "Population (000s)": "25329", "Population_Density": 
    30, "Population_Growth_Rate": "5.21" },
    { "Country": "Djibouti", "Year": "1963", "Population (000s)": "25329", "Population_Density": 25, "Population_Growth_Rate": "5.21" },
    { "Country": "Djibouti", "Year": "1964", "Population (000s)": "25329", "Population_Density": 22, "Population_Growth_Rate": "5.21" },
    { "Country": "Djibouti", "Year": "1973", "Population (000s)": "25329", "Population_Density": 12, "Population_Growth_Rate": "5.21" },
    
  ];
  private svg: any;
  private margin = 50;

  width = 900 - (this.margin * 2);
  height = 200 - (this.margin * 2);

  constructor() { }

  ngOnInit() {
    this.createLineSvg();
    this.drawLine();
  }

  createLineSvg() {
    this.svg = d3Select.select("#line")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g");
  }

  drawLine() {
    // Add X axis --> it is a date format
    var x = d3Scale.scaleTime()
      .domain([1940, 2021])
      .range([0, this.width]);

    this.svg.append("g")
      .attr("transform", "translate(0," + 50 + ")")
      .call(d3Axis.axisBottom(x))
      .text('X-AXIS');

    // Add Y axis
    var y = d3Scale.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);

    this.svg.append("g")
      .call(d3Axis.axisLeft(y))
      .text('Y-AXIS');

    var countries = ['Country', 'Year', 'Population (000s)', 'Population_Density', 'Population_Growth_Rate'];

    var color = d3Scale.scaleOrdinal()
      .domain(countries)
      .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#D18844'])

    //Add dots
    let line = this.svg.append('g');

    //Add the line
    for (var i = 0; i < countries.length; i++) {
      this.svg.append("path")
        .datum(this.data)
        .attr("fill", "#f9cb4c")
        .attr("stroke", function (d) { return color(countries[i]) })
        .attr("stroke-width", 1.5)
        .attr("d", d3Shape.line()
          .x(function(d) { return x(d[countries[1]]) })
          .y(function(d) { return y(d[countries[3]]) })
        )
    }


  }

}
