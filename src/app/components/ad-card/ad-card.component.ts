import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ad } from 'src/app/models/ad.model';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss'],
})
export class AdCardComponent {

  @Input() ad!: Ad;
  @Output() edit = new EventEmitter<Ad>();
  @Output() delete = new EventEmitter<number>();

  onEdit(): void {
    this.edit.emit(this.ad);
  }

  onDelete(): void {
    this.delete.emit(this.ad.id);
  }
}
