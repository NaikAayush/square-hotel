import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rooms, User } from 'src/app/schema/user.schema';
import { environment } from 'src/environments/environment';
import { Location, TeamMember } from 'square';

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

  async handleRoom(id: string, room: Rooms) {
    return await this.httpService
      .put(`${environment.apiUrl}/user/rooms/${id}`, room)
      .toPromise();
  }

  async updateUser(id: string, key: string, value: string | string[]) {
    return await this.httpService
      .put(`${environment.apiUrl}/user/${id}`, { [key]: value })
      .toPromise();
  }

  async getUser(id: string): Promise<User> {
    return await this.httpService
      .get<User>(`${environment.apiUrl}/user/${id}`)
      .toPromise();
  }

  async getLocations(id: string): Promise<Location[]> {
    return await this.httpService
      .get<Location[]>(`${environment.apiUrl}/user/locations/${id}`)
      .toPromise();
  }

  async getTeamMembers(id: string): Promise<TeamMember[]> {
    return await this.httpService
      .get<TeamMember[]>(`${environment.apiUrl}/user/team/${id}`)
      .toPromise();
  }
}
