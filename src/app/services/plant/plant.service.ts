import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { plantData } from '../../models/dashboard-models/plant-data';
import { environment } from '../../../environments/environment';
import { Plant } from '../../models/dashboard-models/plant';
import { SensorEntity } from '../../models/dashboard-models/addSensor';
import { PlantDTO } from '../../models/dashboard-models/PlantDTO';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http:HttpClient) { }

  createPlant(plant:Plant):Observable<Plant>{
    return this.http.post<Plant>(environment.urlHost+"techforb/plant", plant)
  }

  getAllPlants():Observable<plantData[]>{
    return this.http.get<plantData[]>(environment.urlHost+"techforb/plant")
  }

  addSensorToPlant(sensor:SensorEntity, id:number):Observable<PlantDTO>{
    return this.http.put<PlantDTO>(environment.urlHost+"techforb/plant/"+id+"/sensor", sensor);
  }

  deletePlant(id:number):Observable<any>{
    return this.http.delete<any>(environment.urlHost+"techforb/plant/"+id);
  }
}
