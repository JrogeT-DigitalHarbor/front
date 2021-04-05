import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Appointment} from 'src/app/models/appointment.model';
import {Doctor} from 'src/app/models/doctor.model';
import {Patient} from 'src/app/models/patient.model';
import {DoctorService} from 'src/app/services/doctors/doctor.service';
import {PatientService} from 'src/app/services/patients/patient.service';
import {Utils} from 'src/app/Utils';

@Component({
  selector: 'app-patients-index',
  templateUrl: './patients-index.component.html',
  styleUrls: ['./patients-index.component.css']
})
export class PatientsIndexComponent implements OnInit {

  public patients: Array<Patient>;
  public newPatient: Patient;
  public patientToEdit!: Patient;
  public doctors: Array<Doctor>;
  public selectedoctor: Doctor;
  public newAppointment: Appointment;
  public patientName: string;
  public patientLastname: string;
  public dateA: string;
  public dateB: string;
  public fileToUpload: any;
  private fileName: string;

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private http: HttpClient
  ) {
    this.patients = [];
    this.newPatient = new Patient('', '', '', '', '', [], '');
    this.patientToEdit = new Patient('', '', '', '', '', [], '');
    this.doctors = [];
    this.selectedoctor = new Doctor('', '', '', '', '', [], '', [], '');
    this.newAppointment = new Appointment('', '', '');
    this.patientName = '';
    this.patientLastname = '';
    this.dateA = '';
    this.dateB = '';
    this.fileName = '';
  }

  ngOnInit(): void {
    this.getPatients();
    this.getDoctors();
  }

  getPatients(): void {
    this.patientService.readAll().subscribe(
      (Response) => {

        this.patients = Response.body;
      },
      (Error) => {
        alert(Error.message);
      }
    );
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

  create(): void {
    let y: string = this.newPatient.dateOfBirth.toString();
    y += ':00.000Z';
    this.newPatient.dateOfBirth = y;
    this.newPatient.profilePicture = 'id';
    delete this.newPatient.id;
    this.patientService.create(this.newPatient).subscribe(
      (Response) => {
        Utils.log(Response);
        this.newPatient = new Patient('', '', '', '', '', [], '');
        this.fileName = Response.body.id;
        this.uploadFile();
      }
    );
  }

  createAppointment(): void {
    let y: string = this.newAppointment.date.toString();
    y += ':00.000Z';
    this.newAppointment.date = y;
    // tslint:disable-next-line:no-non-null-assertion
    this.patientService.createAppointment(this.patientToEdit.id!, this.newAppointment).subscribe(
      (Response) => {
        this.getPatients();
        alert(Response.message);
      }
    );
  }

  edit(i: number): void {
    this.patientToEdit = this.patients[i];
  }

  update(): void {
    let y: string = this.patientToEdit.dateOfBirth.toString();
    if (y.indexOf('Z') === -1) {
      y += ':00.000Z';
    }
    this.patientToEdit.dateOfBirth = y;
    // tslint:disable-next-line:no-non-null-assertion
    this.fileName = this.patientToEdit.id!;
    // tslint:disable-next-line:no-non-null-assertion
    this.patientService.update(this.patientToEdit.id!, this.patientToEdit).subscribe(
      (Response) => {
        this.uploadFile();
        alert(Response.message);
      },
      (Error) => {
        alert(Error.message);
      }
    );
  }

  delete(patientId: string): void {
    this.patientService.delete(patientId).subscribe(
      (Response) => {
        this.getPatients();
      }
    );
  }

  getDoctorName(doctorId: string): string {
    let name = 'unknowed';
    this.doctors.forEach((doctor: Doctor) => {
      if (doctor.id === doctorId) {
        name = doctor.name + ' ' + doctor.lastname;
      }
    });
    return name;
  }

  searchByName(): void {
    if (this.patientName.length > 0) {
      this.patientService.searchByName(this.patientName).subscribe(
        (Response) => {
          this.patients = Response.body;
        }
      );
    }
  }

  searchByLastname(): void {
    if (this.patientLastname.length > 0) {
      this.patientService.searchByLastname(this.patientLastname).subscribe(
        (Response) => {
          this.patients = Response.body;
        }
      );
    }
  }

  searchByDate(): void {
    if (this.dateA.length > 0 && this.dateB.length > 0) {
      this.patientService.searchByDate(this.dateA + ':00.000Z', this.dateB + ':00.000Z').subscribe(
        (Response) => {
          this.patients = Response.body;
        }
      );
    }
  }

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files[0];
  }

  uploadFile(): void {
    if (this.fileToUpload) {
      const formData = new FormData();
      formData.append('file', this.fileToUpload);
      this.http.post(
        'http://localhost:8080/api/uploadFile/' + this.fileName,
        formData
      ).subscribe(
        (Response: any) => {
          Utils.log(Response);
          this.fileToUpload = null;
          this.getPatients();
        },
        (Error: any) => {
          Utils.log(Error);
        }
      );
    }else{
      this.getPatients();
    }
  }

}
