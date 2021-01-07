import { Component, OnInit } from '@angular/core';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private loggingService: LoggingService){}

  ngOnInit() {
    this.loggingService.printLog('Hello from App Component noOnInit');
  }
  
}
