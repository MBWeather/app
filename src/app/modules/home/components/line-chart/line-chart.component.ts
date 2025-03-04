import { JsonPipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  standalone: true,
  imports: [BaseChartDirective, JsonPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LineChartComponent implements OnInit {

  @Input() public chartData: ChartData; // The data for the chart
  @Input() public chartOptions: ChartOptions; // The options for the chart

  constructor() { }

  public ngOnInit(): void { }

}
