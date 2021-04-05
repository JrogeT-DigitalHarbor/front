/* tslint:disable:object-literal-shorthand */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RequestService} from '../request.service';
import {Patient} from 'src/app/models/patient.model';
import {Utils} from 'src/app/Utils';
import {Appointment} from 'src/app/models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(
    public http: HttpClient,
    private requestService: RequestService = new RequestService(http)
  ) {
  }

  create(patient: Patient): Observable<any> {
    const data = {
      userId: Utils.get('id'),
      body: patient
    }
    return this.requestService.post('patients', data);
  }

  readAll(): Observable<any> {
    return this.requestService.get('patients');
  }

  readOne(id: number): Observable<any> {
    return this.requestService.get('patients/' + id);
  }

  update(patientId: string, patient: Patient): Observable<any> {
    const data = {
      userId: Utils.get('id'),
      body: patient
    };
    return this.requestService.put('patients/' + patientId, data);
  }

  createAppointment(patientId: string, appointment: Appointment): Observable<any> {
    const data = {
      userId: Utils.get('id'),
      body: appointment
    }
    return this.requestService.post('patients/' + patientId + '/appointments', data);
  }

  delete(patientId: string): Observable<any> {
    return this.requestService.delete('patients/' + patientId);
  }

  searchByName(name: string): Observable<any> {
    return this.requestService.post('patients/search/name', {word: name});
  }

  searchByLastname(lastname: string): Observable<any> {
    return this.requestService.post('patients/search/lastname', {word: lastname});
  }

  searchByDate(dateA: string, dateB: string): Observable<any> {
    return this.requestService.post('patients/search/dates', {dateA: dateA, dateB: dateB});
  }
}
