import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.css']
})
export class AddcarComponent implements OnInit {
  carDetail = {
    color: '',
    carNo: ''
  };

  constructor(public modal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  addCarDetails() {
    this.modal.close(this.carDetail);
  }

}
