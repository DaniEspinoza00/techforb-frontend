import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../../models/dashboard-models/dataTable';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http:HttpClient) { }

  getAllPlants():Observable<Plant[]>{
    return this.http.get<Plant[]>(environment.urlHost+"techforb/plant")
  }
}
