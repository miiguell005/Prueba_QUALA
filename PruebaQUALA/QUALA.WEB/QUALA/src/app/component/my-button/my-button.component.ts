import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.css']
})
export class MyButtonComponent implements OnInit {

  constructor() { }

  @Input() class: string = "";
  @Input() classIcon: string = "";
  @Input() text: string = "";
  @Input() tooltip: string = "";
  
  @Output() myClick: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  click(): void {
    this.myClick.emit();
  }
}
