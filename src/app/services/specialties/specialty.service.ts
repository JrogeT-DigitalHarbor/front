import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';
import { Specialty } from 'src/app/models/specialty.model';
import { Utils } from 'src/app/Utils';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  constructor(
    public http: HttpClient,
    private requestService: RequestService = new RequestService(http)
  ) {
  }

  create(specialty: Specialty): Observable<any> {
    const data = {
      userId: Utils.get('id'),
      body: specialty
    }
    return this.requestService.post('specialties', data);
  }

  readAll(): Observable<any> {
    return this.requestService.get('specialties');
  }

  readOne(id: number): Observable<any> {
    return this.requestService.get('specialties/' + id);
  }

  update(specialtyId: string, specialty: Specialty): Observable<any> {
    const data = {
      userId: Utils.get('id'),
      body: specialty
    }
    return this.requestService.put('specialties/' + specialtyId, data);
  }

  delete(specialtyId: string): Observable<any> {
    return this.requestService.delete('specialties/' + specialtyId);
  }
}
