import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Callback } from 'src/app/schema/callback.schema';
import { User } from 'src/app/schema/user.schema';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OauthService {
  constructor(private httpService: HttpClient) {}

  async callback(id: string, callback: Callback) {
    return await this.httpService
      .post(`${environment.apiUrl}/oauth/callback/${id}`, {
        code: callback.code,
        response_type: callback.response_type,
      })
      .toPromise();
  }
}
