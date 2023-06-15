import {Component, EventEmitter, forwardRef, Input, OnInit, Output, SimpleChanges} from "@angular/core";
import { tableHeader } from 'src/app/_model/my-table';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements OnInit {

  constructor(    
  ) 
  { 
  }
  
  @Input() header: tableHeader[] = [];
  @Input() list: any = [];

  @Input() edit: boolean = false;
  @Output() editOut: EventEmitter<any> = new EventEmitter<any>();
  
  @Input() remove: boolean = false;
  @Output() deleteOut: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {    
  }
  
  
  editRecord(obj:any): void {
    this.editOut.emit(obj);
  }

  deleteRecord(obj:any): void {
    this.deleteOut.emit(obj);
  }
}

