import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';
import { Doctor } from 'src/app/models/doctor.model';
import { Utils } from 'src/app/Utils';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(
    public http: HttpClient,
    private requestService: RequestService = new RequestService(http)
  ) {
  }

  create(doctor: Doctor): Observable<any> {
    const data = {
      userId: Utils.get('id'),
      body: doctor
    }
    return this.requestService.post('doctors', data);
  }

  readAll(): Observable<any> {
    return this.requestService.get('doctors');
  }

  readOne(id: number): Observable<any> {
    return this.requestService.get('doctors/' + id);
  }

  update(doctorId: string, doctor: Doctor): Observable<any> {
    const data = {
      userId: Utils.get('id'),
      body: doctor
    }
    return this.requestService.put('doctors/' + doctorId, data);
  }

  delete(doctorId: string): Observable<any> {
    return this.requestService.delete('doctors/' + doctorId);
  }

  searchByName(name: string): Observable<any> {
    return this.requestService.post('doctors/search/name', { word: name });
  }
  
  searchByLastname(lastname: string): Observable<any> {
    return this.requestService.post('doctors/search/lastname', { word: lastname });
  }

  searchByDate(dateA: string, dateB: string): Observable<any> {
    return this.requestService.post('doctors/search/dates', { dateA: dateA, dateB: dateB });
  }
}
