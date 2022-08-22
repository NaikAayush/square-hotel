import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  name = '';
  bookStatus = false;
  constructor(private httpService: HttpClient, public home: HomeComponent) {}

  ngOnInit() {}

  async book() {
    return await this.httpService
      .get(`${environment.apiUrl}/user/book/${this.name}`)
      .toPromise();
  }
}
