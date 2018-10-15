import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { URLs } from './URLs';
import { HitRecord } from './HitRecord';
import { Console } from '@angular/core/src/console';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private dbUrl = 'http://localhost:8080/urlservice/api/url/';  // URL to web api
  constructor(
    private http: HttpClient) { }

    /** GET urls from the server */
  getURLs (): Observable<URLs[]> {
    return this.http.get<URLs[]>(this.dbUrl+"getall")
      .pipe(
        tap(URLs => console.log('Fetched Urls')),
        catchError(this.handleError('getURLs', []))
      );
  }

   /** POST urlrecords from the server */
   getRecords (urlC:URLs): Observable<HitRecord[]> {
    return this.http.post<HitRecord[]>(this.dbUrl+"hitrecord",urlC,httpOptions)
      .pipe(
        tap(HitRecord => console.log('Fetched Records')),
        catchError(this.handleError('getRecords', []))
      );
  }
  /** DELETE: delete the url from the server */
  deleteUrl(url: URLs): Observable<URLs> {
    const id = typeof url === 'number' ? url : url.id;
    const dUrl = `${this.dbUrl}deleteurl`;

    return this.http.post<URLs>(dUrl,url, httpOptions).pipe(
      tap(_ => console.log(`deleted url id=${id}`)),
      catchError(this.handleError<URLs>('deleteUrl'))
    );
  }

  /** POST: add a new url to the server */
  addUrl (urlC: URLs): Observable<URLs> {
  const dUrl = `${this.dbUrl}addurl`;
  return this.http.post<URLs>(dUrl, urlC, httpOptions).pipe(
    tap((urlC: URLs) => console.log(`added hero w/ id=${urlC.id}`)),
    catchError(this.handleError<URLs>('addHero'))
  );
  }


   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
