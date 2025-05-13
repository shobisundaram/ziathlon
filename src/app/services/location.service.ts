import { Injectable } from '@angular/core';
import { Country, State, City } from 'country-state-city';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  api = environment.API_ENDPOINT;

  constructor(
    private apiservice: ApiService
  ) { }

  getCountries() {
    return Country.getAllCountries(); // returns array of countries
  }

  getStates(countryCode: string) {
    return State.getStatesOfCountry(countryCode); // returns array of states for a country
  }

  getCities(countryCode: string, stateCode: string) {
    return City.getCitiesOfState(countryCode, stateCode); // returns array of cities for a state
  }  
  
}
