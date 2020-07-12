import {Component, OnInit, ViewChild} from '@angular/core';
import {AddcarComponent} from '../_modal/addcar/addcar.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogComponent} from '../_modal/confirm-dialog/confirm-dialog.component';
import {QueryDataComponent} from '../_modal/query-data/query-data.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('content') content;
  parkingSlots = [];
  formError = '';
  config: { total?: number, parked?: number } = {};
  colors = new Set();
  searchData: { color?: string; regNo?: string } = {
    color: '',
    regNo: ''
  };
  totalCost = 0;
  carList = [
    {
      carNo: 'KA-64-YX-0619',
      color: 'Green',
      slotNo: 0,
      dateTime: new Date(2018, 11, 24, 10, 33, 30, 0)
    },
    {
      carNo: 'MH-64-YX-0619',
      color: 'Red',
      slotNo: 3,
      dateTime: new Date(2018, 11, 24, 10, 39, 30, 0)
    },
    {
      carNo: 'HR-64-YX-0619',
      color: 'White',
      slotNo: 2,
      dateTime: new Date(2018, 11, 24, 10, 50, 30, 0)
    },
    {
      carNo: 'KA-64-YX-0619',
      color: 'Red',
      slotNo: 5,
      dateTime: new Date(2018, 11, 24, 10, 55, 30, 0)
    },
    {
      carNo: 'MH-64-YX-0619',
      color: 'White',
      slotNo: 6,
      dateTime: new Date(2018, 11, 24, 11, 39, 30, 0)
    },
  ];
  filledSlots = [];
  totalSlots = 0;
  carParked = 0;

  constructor(private modalService: NgbModal) {

  }

  ngOnInit(): void {
  }

  removeCar(index) {
    this.modalService.open(ConfirmDialogComponent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result, 'result');
    }, (reason) => {
      console.log('DISSSMS', reason);
      if (reason === 'yes') {
        this.parkingSlots[index] = null;
        this.filledSlots.splice(index, 1);
        this.addMoney();
        this.handleColors();
      } else {
        console.log('no amount');
      }
    });
  }

  addCar() {
    if (!this.getAvailableSlot()) {
      return this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result;
    }
    this.modalService.open(AddcarComponent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      const availableSlot = this.getAvailableSlot();
      if (availableSlot !== -1) {
        const newCar = {...result, dateTime: new Date(), slotNo: availableSlot};
        this.parkingSlots[availableSlot] = newCar;
        this.filledSlots.push(newCar);
        this.handleColors();
      }
    }, (reason) => {
      console.log('DISSSMS', reason);
    });
  }

  handleColors() {
    this.colors = this.filledSlots.reduce((acc, item) => {
      acc.add(item.color);
      return acc;
    }, this.colors);
  }

  getAvailableSlot() {
    const allAvailableSlots = this.parkingSlots.map((slot, index) => {
      if (!slot) {
        return index;
      } else {
        return null;
      }
    }).filter(i => i !== null);
    const randomSlot = Math.floor(Math.random() * Math.floor(allAvailableSlots.length));
    return allAvailableSlots[randomSlot];
  }

  addMoney() {
    this.totalCost += 20;
  }

  showTotalMoney() {
    console.log('Total collection :: ', this.totalCost);
    const modalRef = this.modalService.open(QueryDataComponent, {ariaLabelledBy: 'modal-basic-title'});
    (modalRef.componentInstance as QueryDataComponent).data = this.totalCost;
    modalRef.result
      .then((result) => {

      }, (reason) => {
      });
  }

  search(event) {
    this.filledSlots = this.parkingSlots.filter(i => i).filter(slot => {
      let status = true;
      if (this.searchData.regNo && this.searchData.color) {
        status = slot.carNo.toLowerCase().includes(this.searchData.regNo.toLowerCase()) && slot.color === this.searchData.color;
      } else if (this.searchData.color) {
        status = slot.color === this.searchData.color;
      } else if (this.searchData.regNo) {
        status = slot.carNo.toLowerCase().includes(this.searchData.regNo.toLowerCase());
      }
      return status;
    });
    event.preventDefault();
  }

  reset() {
    this.searchData = {
      regNo: '',
      color: ''
    };
    this.filledSlots = this.parkingSlots.filter(i => i);
  }

  setUp() {
    this.formError = '';
    if (this.config.parked > this.config.total) {
      this.formError = 'Cars parked cannot be more than parking slots.';
      return;
    }

    this.totalSlots = this.config.total;
    this.carParked = this.config.parked;
    this.parkingSlots = new Array(this.totalSlots).fill(null);
    let i = 0;
    while (i < this.carParked) {
      const newCar = this.carList[0];
      const slot = this.getAvailableSlot();
      this.parkingSlots[slot] = {...newCar, slotNo: slot};
      i++;
    }
    this.filledSlots = this.parkingSlots.filter(slot => slot);
    this.handleColors();
  }

}
