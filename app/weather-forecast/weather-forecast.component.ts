import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}
@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent {
  apiKey = 'b9d08823c7e55b8467dfb4d83f3d5043';
  city = ''; // Empty city initially
  weather: WeatherResponse | null = null;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onSubmit() {
    if (this.city.trim() === '') {
      this.error = 'Please enter a city name.';
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`;
    this.http.get<WeatherResponse>(url).subscribe(
      (data) => {
        this.weather = data;
        this.error = null;
      },
      (error) => {
        console.error(error);
        this.weather = null;
        this.error = 'Failed to fetch weather data.';
      }
    );
  }
}