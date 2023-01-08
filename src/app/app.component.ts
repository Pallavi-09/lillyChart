import { Component } from '@angular/core';
import * as d3CSV from 'd3-dsv';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';
import * as d3line from 'd3-line';

import * as d3Format from 'd3-format';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lillyChart';
  totalPopulation = 0;
  selectedYear = 1941;
  private data = [
    { "Country": "Burundi", "Year": "1941", "Population (000s)": "22322", "Population_Density": "22", "Population_Growth_Rate": "0.21" },
    { "Country": "Burundi", "Year": "1941", "Population (000s)": "22322", "Population_Density": "12", "Population_Growth_Rate": "2.21" },
    { "Country": "Burundi", "Year": "1942", "Population (000s)": "22322", "Population_Density": "42", "Population_Growth_Rate": "5.21" },
    { "Country": "Burundi", "Year": "1942", "Population (000s)": "22322", "Population_Density": "32", "Population_Growth_Rate": "4.21" },
    { "Country": "Burundi", "Year": "1943", "Population (000s)": "22322", "Population_Density": "52", "Population_Growth_Rate": "3.21" },
    { "Country": "Burundi", "Year": "1943", "Population (000s)": "22322", "Population_Density": "32", "Population_Growth_Rate": "0.61" },
    { "Country": "Comoros", "Year": "1950", "Population (000s)": "24328", "Population_Density": "32", "Population_Growth_Rate": "6.21" },
    { "Country": "Comoros", "Year": "1950", "Population (000s)": "24328", "Population_Density": "55", "Population_Growth_Rate": "4.21" },
    { "Country": "Comoros", "Year": "1951", "Population (000s)": "24328", "Population_Density": "26", "Population_Growth_Rate": "4.21" },
    { "Country": "Comoros", "Year": "1951", "Population (000s)": "24328", "Population_Density": "60", "Population_Growth_Rate": "7.00" },
    { "Country": "Comoros", "Year": "1952", "Population (000s)": "24328", "Population_Density": "76", "Population_Growth_Rate": "1.21" },
    { "Country": "Comoros", "Year": "1952", "Population (000s)": "24328", "Population_Density": "66", "Population_Growth_Rate": "4.21" },
    { "Country": "Djibouti", "Year": "1960", "Population (000s)": "25329", "Population_Density": "52", "Population_Growth_Rate": "5.21" },
    { "Country": "Djibouti", "Year": "1960", "Population (000s)": "25329", "Population_Density": "73", "Population_Growth_Rate": "4.21" },
    { "Country": "Djibouti", "Year": "1961", "Population (000s)": "25329", "Population_Density": "42", "Population_Growth_Rate": "2.21" },
    { "Country": "Djibouti", "Year": "1961", "Population (000s)": "25329", "Population_Density": "32", "Population_Growth_Rate": "6.7" },
    { "Country": "Djibouti", "Year": "1962", "Population (000s)": "25329", "Population_Density": "32", "Population_Growth_Rate": "6.21" },
    { "Country": "Djibouti", "Year": "1962", "Population (000s)": "25329", "Population_Density": "82", "Population_Growth_Rate": "1.21" },
    { "Country": "Eritrea", "Year": "1970", "Population (000s)": "26822", "Population_Density": "34", "Population_Growth_Rate": "4.21" },
    { "Country": "Eritrea", "Year": "1970", "Population (000s)": "26822", "Population_Density": "50", "Population_Growth_Rate": "5.21" },
    { "Country": "Eritrea", "Year": "1971", "Population (000s)": "26822", "Population_Density": "55", "Population_Growth_Rate": "1.21" },
    { "Country": "Eritrea", "Year": "1971", "Population (000s)": "26822", "Population_Density": "10", "Population_Growth_Rate": "6.21" },
    { "Country": "Eritrea", "Year": "1972", "Population (000s)": "26822", "Population_Density": "75", "Population_Growth_Rate": "2.21" },
    { "Country": "Eritrea", "Year": "1972", "Population (000s)": "26822", "Population_Density": "12", "Population_Growth_Rate": "4.1" },
    { "Country": "Kenya", "Year": "2001", "Population (000s)": "27329", "Population_Density": "82", "Population_Growth_Rate": "3.21" },
    { "Country": "Kenya", "Year": "2001", "Population (000s)": "27329", "Population_Density": "15", "Population_Growth_Rate": "5" },
    { "Country": "Kenya", "Year": "2002", "Population (000s)": "27329", "Population_Density": "72", "Population_Growth_Rate": "0.21" },
    { "Country": "Kenya", "Year": "2002", "Population (000s)": "27329", "Population_Density": "70", "Population_Growth_Rate": "2.21" },
    { "Country": "Kenya", "Year": "2003", "Population (000s)": "27329", "Population_Density": "80", "Population_Growth_Rate": "5.21" },
    { "Country": "Kenya", "Year": "2003", "Population (000s)": "27329", "Population_Density": "30", "Population_Growth_Rate": "1.21" },
    { "Country": "BuruMadagascarndi", "Year": "2021", "Population (000s)": "27867", "Population_Density": "68", "Population_Growth_Rate": "2.21" },
    { "Country": "BuruMadagascarndi", "Year": "2021", "Population (000s)": "27867", "Population_Density": "18", "Population_Growth_Rate": "6.70" },
    { "Country": "BuruMadagascarndi", "Year": "2022", "Population (000s)": "27867", "Population_Density": "98", "Population_Growth_Rate": "3.21" },
    { "Country": "BuruMadagascarndi", "Year": "2022", "Population (000s)": "27867", "Population_Density": "18", "Population_Growth_Rate": "5.21" }
  ];
  private svg: any;
  x; y;
  private margin = 50;
  width = 900 - (this.margin * 2);
  height = 350 - (this.margin * 2);
  constructor(private http: HttpClient) {
    // this.http.get('../assets/population.csv', {responseType: 'text'})
    // .subscribe(
    //     data => {
    //       this.data1 = d3CSV.csvParse(data);
    //       console.log('CSV DATA PARSED', d3CSV.csvParse(data));
    //     },
    //     error => {
    //         console.log(error);
    //     }
    // );
  }

  ngOnInit() {
    this.createSvg();
    this.drawSvg();
    this.drawChart(this.data);
    this.totalPopulation = this.calculateTotalPopulation()
  }

  calculateTotalPopulation() {
    let total = 0;
    this.data.map((pop, i) => {
      total += parseInt(pop['Population (000s)'], 10);
    });
    return total;
  }

  createSvg(): void {
    this.svg = d3.select("#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  drawSvg() {
    this.x = d3Scale.scaleLinear()
      .domain([0, 7])
      .range([0, this.width]);
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x));
    this.y = d3Scale.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);
    this.svg.append("g")
      .call(d3Axis.axisLeft(this.y));
  }

  drawChart(newData) {

    let color = d3Scale.scaleOrdinal()
      .domain(["Burundi", "Comoros", "Djibouti", "Eritrea", "Kenya", "BuruMadagascarndi"])
      .range(["#9172ff", "#f9cb4c", "#8FD175", "#8F3275", "#D18844", "#4cb2ff"]);

    const dots = this.svg.append('g');
    dots.selectAll("dot")
      .data(newData)
      .enter()
      .append("circle")
      .attr("cx", (d: any) => this.x(d.Population_Growth_Rate))
      .attr("cy", (d: any) => this.y(d.Population_Density))
      .attr("r", 10)
      .style("fill", function (d) { return color(d.Country) })

  }


  update(selectedYear) {
    this.selectedYear = selectedYear;
    this.svg.selectAll("*").remove();
    var dataFilter ;
    this.drawSvg();
    dataFilter = this.data.filter(function (d) { return d.Year == selectedYear });
    if(selectedYear === "all"){
      this.drawChart(this.data)
    }else {
      this.drawChart(dataFilter)
    }
  }


}
