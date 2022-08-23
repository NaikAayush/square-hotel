import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiResponse, Availability, SearchAvailabilityResponse } from 'square';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  hotelDomain = 'test-2';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  bookStatus = false;
  bookPopup = false;
  roomArray: any = [];
  mainData: any;
  constructor(private httpService: HttpClient) {}

  ngOnInit(): void {}

  async book() {
    console.log(this.range.controls['start'].value?.toISOString());
    console.log(this.range.controls['end'].value?.toISOString());
    this.range.patchValue({
      start: this.addHours(-5.5, this.range.controls['start'].value as Date),
      end: this.addHours(-5.5, this.range.controls['end'].value as Date),
    });
    console.log(this.range.controls['start'].value?.toISOString());
    console.log(this.range.controls['end'].value?.toISOString());
    const avl: any = await this.getAvailability(
      this.range.controls['start'].value?.toISOString() as string,
      this.range.controls['end'].value?.toISOString() as string,
      'test2'
    );
    console.log(Object.keys(avl));
    console.log(Object.keys(avl.data));
    console.log(avl);
    this.mainData = avl.data;
    for (let i = 0; i < Object.keys(avl.data).length; i++) {
      this.roomArray.push(
        await this.getRoomById(Object.keys(avl.data)[i], 'pearl')
      );
    }
    console.log(this.roomArray);

    // Object.keys(avl.data).forEach((element) => {
    //   const avl: any = console.log(element);
    // });
    this.bookStatus = true;
    // console.log(avl);
  }

  async bookFinal(id: string) {
    console.log('bropls', this.mainData);
    console.log('yeyt', this.mainData[id]);
  }

  addHours(numOfHours: number, date: Date) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
  }

  async getAvailability(
    start: string,
    end: string,
    hotel: string
  ): Promise<{ data: Availability[][] } | undefined> {
    return await this.httpService
      .get<{ data: Availability[][] }>(
        `${environment.apiUrl}/user/book/availability/${hotel}/${start}/${end}`
      )
      .toPromise();
  }

  async getRoomById(
    roomId: string,
    hotel: string
  ): Promise<{ data: Availability[][] } | undefined> {
    return await this.httpService
      .get<{ data: Availability[][] }>(
        `${environment.apiUrl}/user/getRoomByID/${hotel}/${roomId}`
      )
      .toPromise();
  }
}
