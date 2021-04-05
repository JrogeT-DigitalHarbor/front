import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';
import { Hospital } from 'src/app/models/hospital.model';
import { Utils } from 'src/app/Utils';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(
    public http: HttpClient,
    private requestService: RequestService = new RequestService(http)
  ) {
  }

  create(hospital: Hospital): Observable<any> {
    const data = {
      userId: Utils.get('id'),
      body: hospital
    }
    return this.requestService.post('hospitals', data);
  }

  readAll(): Observable<any> {
    return this.requestService.get('hospitals');
  }

  readOne(id: number): Observable<any> {
    return this.requestService.get('hospitals/' + id);
  }

  update(hospitalId: string, hospital: Hospital): Observable<any> {
    const data = {
      userId: Utils.get('id'),
      body: hospital
    }
    Utils.log(data);
    return this.requestService.put('hospitals/' + hospitalId, data);
  }

  delete(hospitalId: string): Observable<any> {
    return this.requestService.delete('hospitals/' + hospitalId);
  }

  searchByName(name: string): Observable<any> {
    return this.requestService.post('hospitals/search/name', { word: name });
  }

  searchByDate(dateA: string, dateB: string): Observable<any> {
    return this.requestService.post('hospitals/search/dates', { dateA: dateA, dateB: dateB });
  }
}
