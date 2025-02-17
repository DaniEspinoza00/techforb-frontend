import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-plant-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-plant-dialog.component.html',
  styleUrl: './delete-plant-dialog.component.css'
})
export class DeletePlantDialogComponent {
  private cdr = inject(ChangeDetectorRef);
  data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<DeletePlantDialogComponent>);

  close() {
    this.dialogRef.close(false);
  }

  deletePlant(id: number) {
    console.log("entra");
    this.dialogRef.close(id);
    this.cdr.detectChanges();
  }
}
