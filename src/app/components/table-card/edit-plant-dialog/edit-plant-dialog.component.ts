import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SensorEntity } from '../../../models/dashboard-models/addSensor';

@Component({
  selector: 'app-edit-plant-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-plant-dialog.component.html',
  styleUrl: './edit-plant-dialog.component.css'
})
export class EditPlantDialogComponent {
  private sensorNames:string[]=['Temperatura','Presion','Viento','Niveles','Energia','Tension','Monoxido de Carbono', 'Otros gases'];
  private sensorArray:SensorEntity[]=[];
  readonly dialogRef = inject(MatDialogRef<EditPlantDialogComponent>);
  private cdr = inject(ChangeDetectorRef);
  private formBuilder = inject(FormBuilder);

  data = inject(MAT_DIALOG_DATA)

  editForm = this.formBuilder.group({
    country: [{ value: this.data.country, disabled: true }, [Validators.required,]],
    name: [{ value: this.data.name, disabled: true }, Validators.required],
    lectures: [0, [Validators.required,Validators.min(1),Validators.max(9999)]],
    lectures2: [0, [Validators.required,Validators.min(1),Validators.max(9999)]],
    media: [0, [Validators.required,Validators.min(1),Validators.max(9999)]],
    red: [0, [Validators.required,Validators.min(1),Validators.max(9999)]]
  })

  editPlant() {
    if(this.editForm.valid){
      this.sensorArray=this.sensorNames.map(sensor =>{
        const ok=this.editForm.value.lectures||0;
        const media=this.editForm.value.media||0;
        const red=this.editForm.value.red||0;
        return{sensorName:sensor, okLectures:ok, mediaRangeAlert:media, redAlert:red};
      })
      this.dialogRef.close(this.sensorArray);
      this.cdr.detectChanges();
    }else{
      this.editForm.markAllAsTouched();
      console.log("no se obtuvieron todos los resultados");
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
