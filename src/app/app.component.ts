import { Component, OnInit } from '@angular/core';

declare function customInitFunctions():void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'adminpro';

  ngOnInit(): void {
    customInitFunctions();
  }
}
