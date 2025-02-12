import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sensorCard } from '../../models/dashboard-models/sensor-card';
import { environment } from '../../../environments/environment';
import { sensorsByPlant } from '../../models/dashboard-models/sensors-plant';

@Injectable({
  providedIn: 'root'
})
export class SensorCardService {

  constructor(private http:HttpClient) { }

  getSensorHeaderCard ():Observable<sensorCard>{
    return this.http.get<sensorCard>(environment.urlHost+"techforb/sensors")
  }

  getSensorByPlantId(id:number):Observable<sensorsByPlant[]>{
    return this.http.get<sensorsByPlant[]>(environment.urlHost+"techforb/sensors/plant/"+id);
  }
}
