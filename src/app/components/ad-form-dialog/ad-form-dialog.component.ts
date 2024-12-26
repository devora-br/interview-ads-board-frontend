import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdFormData } from 'src/app/models/ad.model';

@Component({
  selector: 'app-ad-form-dialog',
  templateUrl: './ad-form-dialog.component.html',
  styleUrls: ['./ad-form-dialog.component.scss']
})
export class AdFormDialogComponent {

  formData: AdFormData;

  categories = ['Classes', 'Rent', 'Sale', 'Vehicles', 'Education'];

  constructor(
    private dialogRef: MatDialogRef<AdFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdFormData
  ) {
    this.formData = data ? { ...data } :
      { title: '', description: '', location: '', category: '', imageUrl: null };

  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.formData.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  save() {
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
