import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { Specialty } from 'src/app/models/specialty.model';
import { DoctorService } from 'src/app/services/doctors/doctor.service';
import { SpecialtyService } from 'src/app/services/specialties/specialty.service';
import { Utils } from 'src/app/Utils';

@Component({
  selector: 'app-doctors-index',
  templateUrl: './doctors-index.component.html',
  styleUrls: ['./doctors-index.component.css']
})
export class DoctorsIndexComponent {

  public doctors: Array<Doctor>;
  public newDoctor: Doctor;
  public doctorToEdit: Doctor;
  public specialties: Array<Specialty>;
  public selectedSpecialty: Specialty;

  constructor(private doctorService: DoctorService, private specialtyService: SpecialtyService) {
    this.doctors = [];
    this.newDoctor = new Doctor('', '', '', '', '', '', []);
    this.doctorToEdit = new Doctor('', '', '', '', '', '', []);
    this.specialties = [];
    this.selectedSpecialty = new Specialty('', '', '', '');
  }

  ngOnInit(): void {
    this.getDoctors();
    this.getSpecialties();
  }

  getDoctors(): void {
    this.doctorService.readAll().subscribe(
      (Response) => {
        Utils.log(Response);
        this.doctors = Response.body;
      },
      (Error) => {
        alert(Error.message);
      }
    );
  }

  getSpecialties(): void {
    this.specialtyService.readAll().subscribe(
      (Response) => {
        Utils.log(Response);
        this.specialties = Response.body;
      },
      (Error) => {
        alert(Error.message);
      }
    );
  }

  create() {
    let y: string = this.newDoctor.dateOfBirth.toString();
    y += ':00.000Z';
    this.newDoctor.dateOfBirth = y;
    Utils.log(this.newDoctor);
    this.doctorService.create(this.newDoctor).subscribe(
      (Response) => {
        this.newDoctor = new Doctor('', '', '', '', '', '', []);
        this.getDoctors();
        alert(Response.message);
      }
    );
  }

  addSpecialtyToNewDoctor() {
    Utils.log(this.selectedSpecialty.id);
    if (
      this.newDoctor.specialtiesIds.indexOf(this.selectedSpecialty.id) == -1
      && this.selectedSpecialty.id !== ''
    ) {
      this.newDoctor.specialtiesIds.push(this.selectedSpecialty.id);
    }
  }

  addSpecialtyToDoctorToEdit() {
    Utils.log(this.selectedSpecialty.id);
    if (
      this.doctorToEdit.specialtiesIds.indexOf(this.selectedSpecialty.id) == -1
      && this.selectedSpecialty.id !== ''
    ) {
      this.doctorToEdit.specialtiesIds.push(this.selectedSpecialty.id);
    }
  }

  edit(i: number): void {
    this.doctorToEdit = this.doctors[i];
  }

  update() {
    let y: string = this.doctorToEdit.dateOfBirth.toString();
    // y += '.500+0000';
    if (!y.indexOf('Z')) {
      y += ':00.000Z';
    }
    this.doctorToEdit.dateOfBirth = y;
    this.doctorService.update(this.doctorToEdit.id, this.doctorToEdit).subscribe(
      (Response) => {
        this.getDoctors();
        alert(Response.message);
      },
      (Error) => {
        alert(Error.message);
      }
    );
  }

  delete(doctorId: string): void {
    this.doctorService.delete(doctorId).subscribe(
      (Response) => {
        this.getDoctors();
      }
    );
  }

  getSpecialtyName(specialtyId: string) {
    let name = 'unknowed';
    this.specialties.forEach((specialty: Specialty) => {
      if (specialty.id === specialtyId) {
        name = specialty.name;
      }
    });
    return name;
  }
}
