import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RequestService} from '../request.service';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    public http: HttpClient,
    private requestService: RequestService = new RequestService(http)
  ) {
  }

  create(user: User): Observable<any> {
    return this.requestService.post('users', user);
  }

  readAll(): Observable<any> {
    return this.requestService.get('users');
  }

  readOne(id: number): Observable<any> {
    return this.requestService.get('users/' + id);
  }

  update(userId: string, user: User): Observable<any> {
    return this.requestService.put('users/' + userId, user);
  }

  login(user: User): Observable<any> {
    return this.requestService.post('login', user);
  }

  logout(): Observable<any> {
    return this.requestService.get('logout');
  }
}
