import { Component, EventEmitter, Output } from '@angular/core';
import { Ad } from 'src/app/models/ad.model';
import { AdsStateService } from 'src/app/services/ads-state.service';

@Component({
  selector: 'app-ads-grid',
  templateUrl: './ads-grid.component.html',
  styleUrls: ['./ads-grid.component.scss'],
})
export class AdsGridComponent {

  @Output() editAd = new EventEmitter<Ad>();

  constructor(public readonly adsService: AdsStateService) { }

  onEdit(ad: Ad): void {
    this.editAd.emit(ad);
  }
}
