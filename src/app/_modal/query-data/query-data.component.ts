import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-query-data',
  templateUrl: './query-data.component.html',
  styleUrls: ['./query-data.component.css']
})
export class QueryDataComponent implements OnInit {
  @Input() data: any;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
