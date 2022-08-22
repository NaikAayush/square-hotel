import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiResponse, SearchAvailabilityResponse } from 'square';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  bookStatus = false;
  bookPopup = false;
  constructor(private httpService: HttpClient) {}

  ngOnInit(): void {}

  async book() {
    this.range.patchValue({
      start: this.addHours(-5.5, this.range.controls['start'].value as Date),
      end: this.addHours(-5.5, this.range.controls['end'].value as Date),
    });
    console.log(this.range.controls['start'].value?.toISOString());
    console.log(this.range.controls['end'].value?.toISOString());
    const avl = await this.getAvailability(
      this.range.controls['start'].value?.toISOString() as string,
      this.range.controls['end'].value?.toISOString() as string,
      'test2'
    );
    this.bookStatus = true;
    console.log(avl);
  }

  addHours(numOfHours: number, date: Date) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
  }

  async getAvailability(
    start: string,
    end: string,
    hotel: string
  ): Promise<ApiResponse<SearchAvailabilityResponse> | undefined> {
    return await this.httpService
      .get<ApiResponse<SearchAvailabilityResponse>>(
        `${environment.apiUrl}/user/book/availability/${hotel}/${start}/${end}`
      )
      .toPromise();
  }
}
