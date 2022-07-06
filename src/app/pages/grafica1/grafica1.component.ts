import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = [ 'Mierda 1', 'Cagada 2', 'zurullo 3' ];
  public data1: any[] = [{ data: [ 550, 250, 150 ],
    backgroundColor: ['#9e120e','#ff5800','#ffb414']
    // backgroundColor: ['#6857e6','#009fee','#f02059']
  }]

}
