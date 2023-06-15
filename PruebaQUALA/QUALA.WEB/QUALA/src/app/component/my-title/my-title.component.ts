import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-my-title',
  templateUrl: './my-title.component.html',
  styleUrls: ['./my-title.component.scss']
})
export class MyTitleComponent implements OnInit {

  
  constructor(
  ) 
  {
  }

  @Input() text: string = "";
  @Input() class: string = "my-header";
 
  ngOnChanges(changes: SimpleChanges) {
    
  }

  ngOnInit(): void {
    
  }


}
