import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public inervalSubs: Subscription;

  constructor() { 

    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe({
    //   next: valor => console.log('Subs:', valor),
    //   error: error => console.warn('Error:', error),
    //   complete: () => console.info('Obs terminado')
    // });

    this.inervalSubs = this.retornaIntervalo().subscribe({ next: console.log })

  }

  ngOnDestroy(): void {
      this.inervalSubs.unsubscribe()
  }

  retornaIntervalo(): Observable<number> {
    
    return interval(100)
            .pipe(
              // take(10),
              map(valor => valor + 1),
              filter(valor => valor%2 === 0),
            );
  }

  retornaObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>( observer => {

      const intervalo = setInterval(() => {

        i++;
        observer.next(i)

        if ( i === 4 ) {
          clearInterval( intervalo );
          observer.complete();
        }

        if ( i === 2 ) {
          i = 0;
          observer.error('i llego al valor de 2')
        }

      }, 1000)

    });
  }

}
