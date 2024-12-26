import { Component } from '@angular/core';
import { Ad } from 'src/app/models/ad.model';
import { AdsStateService } from 'src/app/services/ads-state.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  constructor(public readonly adsService: AdsStateService) { }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.adsService.searchText.set(input.value);
    }
  }

  onFilterChange(value: keyof Ad): void {
    this.adsService.selectedFilter.set(value);
  }
}
