import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SensorEntity } from '../../../models/dashboard-models/addSensor';

@Component({
  selector: 'app-edit-sensor-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-sensor-dialog.component.html',
  styleUrl: './edit-sensor-dialog.component.css'
})
export class EditSensorDialogComponent {

  readonly dialogRef = inject(MatDialogRef<EditSensorDialogComponent>);
  private cdr = inject(ChangeDetectorRef);
  private formBuilder = inject(FormBuilder);
  data = inject(MAT_DIALOG_DATA)



    editForm = this.formBuilder.group({
      name: [{ value: this.data.sensorName, disabled: true }, Validators.required],
      lectures: [0, [Validators.required,Validators.min(1),Validators.max(9999)]],
      media: [0, [Validators.required,Validators.min(1),Validators.max(9999)]],
      red: [0, [Validators.required,Validators.min(1),Validators.max(9999)]]
    })

    putSensor(){
      if(this.editForm.valid){
        const sensorEntity:SensorEntity={
          sensorName:this.data.sensorName||"",
          okLectures:this.editForm.value.lectures||0,
          mediaRangeAlert:this.editForm.value.media||0,
          redAlert:this.editForm.value.red||0
        }
        this.dialogRef.close(sensorEntity);
        this.cdr.detectChanges();
      }else{
        this.editForm.markAllAsTouched();
      console.log("Invalido");
      }
    }

    close() {
      this.dialogRef.close(false);
      this.cdr.detectChanges();
      }
}
