import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{
  
  @Input('iniVal') progreso: number = 0;
  @Input() btnClass: string = 'btn-primary'
  
  @Output() valorSalida = new EventEmitter<number>();

  ngOnInit(): void {
      this.btnClass = `btn ${this.btnClass}`; 
  }

  cambiarValor( valor: number ) {
    const result = this.progreso + valor;
    if ( result > 100 ) this.progreso = 100;
    else if ( result < 0 ) this.progreso = 0;
    else this.progreso = result; 
    this.valorSalida.emit(this.progreso)
  }

  onChange(newVal: number) {
    if (newVal === null || newVal === undefined) this.progreso = 0;
    else if ( newVal > 100 ) this.progreso = 100;
    else if ( newVal < 0 ) this.progreso = 0;
    else this.progreso = newVal;
    this.valorSalida.emit(this.progreso)
  }

}
