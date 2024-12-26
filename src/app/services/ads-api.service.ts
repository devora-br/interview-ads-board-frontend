// File: ads-api.service.ts
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ad } from '../models/ad.model';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class AdsApiService {
  private readonly apiUrl = environment.adsUrl;

  constructor(private readonly http: HttpClient) { }

  getAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  createAd(ad: Ad): Observable<Ad> {
    return this.http.post<Ad>(this.apiUrl, ad).pipe(
      catchError(this.handleError)
    );
  }

  updateAd(id: number, ad: Ad): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, ad).pipe(
      catchError(this.handleError)
    );
  }

  deleteAd(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server error (${error.status}): ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
