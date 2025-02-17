import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Plant } from '../../../models/dashboard-models/plant';
@Component({
  selector: 'app-new-plant-dialog',
  standalone: true,
  imports: [MatMenuModule, ReactiveFormsModule],
  templateUrl: './new-plant-dialog.component.html',
  styleUrl: './new-plant-dialog.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewPlantDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NewPlantDialogComponent>);
  private cdr=inject(ChangeDetectorRef);
  private formBuilder = inject(FormBuilder);

  createPlant = this.formBuilder.group({
      country: ['', [Validators.required,]],
      name: ['', Validators.required]
    })

  createNewPlant(){
    if(this.createPlant.valid){
      this.dialogRef.close(this.createPlant.value as Plant);
      this.cdr.detectChanges();
    }else{
      this.createPlant.markAllAsTouched();
      console.log("incorrecto");
    }
  }

  close(){
    this.dialogRef.close(false);
  }
}
