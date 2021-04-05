import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospitals/hospital.service';
import { Utils } from 'src/app/Utils';

@Component({
  selector: 'app-hospitals-index',
  templateUrl: './hospitals-index.component.html',
  styleUrls: ['./hospitals-index.component.css']
})
export class HospitalsIndexComponent implements OnInit {

  public hospitals: Array<Hospital>;
  public newHospital: Hospital;
  public hospitalToEdit: Hospital;
  public hospitalName: string;
  public dateA: string;
  public dateB: string;

  constructor(private hospitalService: HospitalService) {
    this.hospitals = [];
    this.newHospital = new Hospital('', '');
    this.hospitalToEdit = new Hospital('', '');
    this.hospitalName = '';
    this.dateA = '';
    this.dateB = '';
  }

  ngOnInit(): void {
    this.getHospitals();
  }

  getHospitals(): void {
    this.hospitalService.readAll().subscribe(
      (Response) => {
        this.hospitals = Response.body;
      },
      (Error) => {
      }
    );
  }

  create() {
    this.hospitalService.create(this.newHospital).subscribe(
      (Response) => {
        this.newHospital = new Hospital('', '');
        this.getHospitals();
        alert(Response.message);
      }
    );
  }

  edit(i: number): void {
    this.hospitalToEdit = this.hospitals[i];
  }

  update() {
    this.hospitalService.update(this.hospitalToEdit.id, this.hospitalToEdit).subscribe(
      (Response) => {
        this.getHospitals();
        alert(Response.message);
      }
    );
  }

  delete(hospitalId: string): void {
    this.hospitalService.delete(hospitalId).subscribe(
      (Response) => {
        this.getHospitals();
      }
    );
  }

  searchByName(): void {
    if (this.hospitalName.length > 0) {
      this.hospitalService.searchByName(this.hospitalName).subscribe(
        (Response) => {
          this.hospitals = Response.body;
        }
      );
    }
  }
  searchByDate(): void {
    if (this.dateA.length > 0 && this.dateB.length > 0) {
      this.hospitalService.searchByDate(this.dateA + ':00.000Z', this.dateB + ':00.000Z').subscribe(
        (Response) => {
          this.hospitals = Response.body;
        }
      );
    }
  }
}
