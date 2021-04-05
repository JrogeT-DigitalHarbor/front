import {Component, OnInit} from '@angular/core';
import {Specialty} from 'src/app/models/specialty.model';
import {SpecialtyService} from 'src/app/services/specialties/specialty.service';
import {Utils} from 'src/app/Utils';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-specialties-index',
  templateUrl: './specialties-index.component.html',
  styleUrls: ['./specialties-index.component.css']
})
export class SpecialtiesIndexComponent implements OnInit {

  public specialties: Array<Specialty>;
  public newSpecialty: Specialty;
  public specialtyToEdit: Specialty;
  public fileToUpload: any;
  private fileName: string;

  constructor(private specialtyService: SpecialtyService, private http: HttpClient) {
    this.specialties = [];
    this.newSpecialty = new Specialty('', '', '', '');
    this.specialtyToEdit = new Specialty('', '', '', '');
    this.fileName = '';
  }

  ngOnInit(): void {
    this.getSpecialties();
  }

  getSpecialties(): void {
    this.specialtyService.readAll().subscribe(
      (Response) => {
        this.specialties = Response.body;
      },
      (Error) => {
      }
    );
  }

  create(): void {
    delete this.newSpecialty.id;
    this.specialtyService.create(this.newSpecialty).subscribe(
      (Response) => {
        this.fileName = Response.body.id;
        this.uploadFile();
        this.newSpecialty = new Specialty('', '', '', '');
        alert(Response.message);
      }
    );
  }

  edit(i: number): void {
    this.specialtyToEdit = this.specialties[i];
  }

  update(): void {
    // tslint:disable-next-line:no-non-null-assertion
    this.specialtyService.update(this.specialtyToEdit.id!, this.specialtyToEdit).subscribe(
      (Response) => {
        this.fileName = Response.body.id;
        this.uploadFile();
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
          this.fileToUpload = null;
          this.getSpecialties();
        },
        (Error: any) => {
        }
      );
    } else {
      this.getSpecialties();
    }
  }
}
