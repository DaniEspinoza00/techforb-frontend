import { sensorCard } from "./sensor-card";

export interface PlantDTO{
    id:number,
    country:string,
    name:string,
    sensors:sensorCard[]
}