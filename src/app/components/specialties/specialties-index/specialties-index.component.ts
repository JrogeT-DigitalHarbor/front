import { Component, OnInit } from '@angular/core';
import { Specialty } from 'src/app/models/specialty.model';
import { SpecialtyService } from 'src/app/services/specialties/specialty.service';
import { Utils } from 'src/app/Utils';

@Component({
  selector: 'app-specialties-index',
  templateUrl: './specialties-index.component.html',
  styleUrls: ['./specialties-index.component.css']
})
export class SpecialtiesIndexComponent {

  public specialties: Array<Specialty>;
  public newSpecialty: Specialty;
  public specialtyToEdit: Specialty;

  constructor(private specialtyService: SpecialtyService) {
    this.specialties = [];
    this.newSpecialty = new Specialty('', '', '', '');
    this.specialtyToEdit = new Specialty('', '', '', '');
  }

  ngOnInit(): void {
    this.getSpecialties();
  }

  getSpecialties(): void {
    this.specialtyService.readAll().subscribe(
      (Response) => {
        Utils.log(Response);
        this.specialties = Response.body;
      },
      (Error) => {
        Utils.log(Error);
      }
    );
  }

  create() {
    this.specialtyService.create(this.newSpecialty).subscribe(
      (Response) => {
        this.newSpecialty = new Specialty('', '', '', '');
        this.getSpecialties();
        alert(Response.message);
      }
    );
  }

  edit(i: number): void {
    this.specialtyToEdit = this.specialties[i];
  }

  update() {
    this.specialtyService.update(this.specialtyToEdit.id, this.specialtyToEdit).subscribe(
      (Response) => {
        this.getSpecialties();
        alert(Response.message);
      }
    );
  }

  delete(hospitalId: string): void {
    this.specialtyService.delete(hospitalId).subscribe(
      (Response) => {
        this.getSpecialties();
      }
    );
  }
}
