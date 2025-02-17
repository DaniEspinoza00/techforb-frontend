import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sensorCard } from '../../models/dashboard-models/sensor-card';
import { environment } from '../../../environments/environment';
import { sensorsByPlant } from '../../models/dashboard-models/sensors-plant';
import { SensorListDTO } from '../../models/dashboard-models/sensorListDTO';
import { SensorEntity } from '../../models/dashboard-models/addSensor';

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

  getAllSensors():Observable<SensorListDTO[]>{
    return this.http.get<SensorListDTO[]>(environment.urlHost+"techforb/sensors/all");
  }

  editSensor(id:number,sensorEntity:SensorEntity):Observable<any>{
    return this.http.put<any>(environment.urlHost+"techforb/sensors/"+id, sensorEntity);
  }
}
