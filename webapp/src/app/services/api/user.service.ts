import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/schema/user.schema';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: HttpClient) {}

  async createUser(user: User) {
    return await this.httpService
      .post(`${environment.apiUrl}/user`, user)
      .toPromise();
  }

  async updateUser(id: string, key: string, value: string) {
    return await this.httpService
      .put(`${environment.apiUrl}/user/${id}`, { [key]: value })
      .toPromise();
  }

  async getUser(id: string): Promise<User> {
    return await this.httpService
      .get<User>(`${environment.apiUrl}/user/${id}`)
      .toPromise();
  }
}
