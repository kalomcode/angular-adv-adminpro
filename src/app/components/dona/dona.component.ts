import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {
  @Input() title: string = 'Sin titulo';

  @Input() labels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input() data: any[] = [{ data: [ 350, 450, 100 ],
    // backgroundColor: ['#9e120e','#ff5800','#ffb414']
    backgroundColor: ['#6857e6','#009fee','#f02059']
  }]
  
  // Doughnut
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.labels,
    datasets: this.data
  };

  ngOnInit(): void {
    console.log(this.labels,this.data)
    this.doughnutChartData = {
      labels: this.labels,
      datasets: this.data
    };
  }


}
