import { Component } from '@angular/core';
import { DoctorDTO } from 'src/app/models/doctor-dto.model';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Specialty } from 'src/app/models/specialty.model';
import { DoctorService } from 'src/app/services/doctors/doctor.service';
import { HospitalService } from 'src/app/services/hospitals/hospital.service';
import { SpecialtyService } from 'src/app/services/specialties/specialty.service';
import { Utils } from 'src/app/Utils';

@Component({
  selector: 'app-doctors-index',
  templateUrl: './doctors-index.component.html',
  styleUrls: ['./doctors-index.component.css']
})
export class DoctorsIndexComponent {

  public doctors: Array<DoctorDTO>;
  public newDoctor: Doctor;
  public doctorToEdit: Doctor;
  public specialties: Array<Specialty>;
  public selectedSpecialty: Specialty;
  public hospitals: Array<Hospital>;
  public doctorName: string;
  public doctorLastname: string;
  public dateA: string;
  public dateB: string;

  constructor(
    private doctorService: DoctorService,
    private specialtyService: SpecialtyService,
    private hospitalService: HospitalService,
  ) {
    this.doctors = [];
    this.newDoctor = new Doctor('', '', '', '', '', '', [], '', []);
    this.doctorToEdit = new Doctor('', '', '', '', '', '', [], '', []);
    this.specialties = [];
    this.selectedSpecialty = new Specialty('', '', '', '');
    this.hospitals = [];
    this.doctorName = '';
    this.doctorLastname = '';
    this.dateA = '';
    this.dateB = '';
  }

  ngOnInit(): void {
    this.getDoctors();
    this.getSpecialties();
    this.getHospitals();
  }

  getDoctors(): void {
    this.doctorService.readAll().subscribe(
      (Response) => {

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

        this.specialties = Response.body;
      },
      (Error) => {
        alert(Error.message);
      }
    );
  }

  getHospitals(): void {
    this.hospitalService.readAll().subscribe(
      (Response) => {

        this.hospitals = Response.body;
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
    this.doctorService.create(this.newDoctor).subscribe(
      (Response) => {
        this.newDoctor = new Doctor('', '', '', '', '', '', [], '', []);
        this.getDoctors();
        alert(Response.message);
      }
    );
  }

  addSpecialtyToNewDoctor() {
    if (
      this.newDoctor.specialtiesIds.indexOf(this.selectedSpecialty.id) == -1
      && this.selectedSpecialty.id !== ''
    ) {
      this.newDoctor.specialtiesIds.push(this.selectedSpecialty.id);
    }
  }

  addSpecialtyToDoctorToEdit() {
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
    if (y.indexOf('Z') == -1) {
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

  getHospitalName(hospitalId: string) {
    let name = 'unknowed';
    this.hospitals.forEach((hospital: Hospital) => {
      if (hospital.id === hospitalId) {
        name = hospital.name;
      }
    });
    return name;
  }

  searchByName(): void {
    if (this.doctorName.length > 0) {
      this.doctorService.searchByName(this.doctorName).subscribe(
        (Response) => {
          this.doctors = Response.body;
        }
      );
    }
  }

  searchByLastname(): void {
    if (this.doctorLastname.length > 0) {
      this.doctorService.searchByLastname(this.doctorLastname).subscribe(
        (Response) => {
          this.doctors = Response.body;
        }
      );
    }
  }

  searchByDate(): void {
    if (this.dateA.length > 0 && this.dateB.length > 0) {
      this.doctorService.searchByDate(this.dateA + ':00.000Z', this.dateB + ':00.000Z').subscribe(
        (Response) => {
          this.doctors = Response.body;
        }
      );
    }
  }
}
