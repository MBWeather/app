import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Server } from 'src/app/types/server';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private server: Server = {
    url: environment.api.servers.primary.url,
    api: environment.api.servers.primary.api,
    headers: { ...environment.api.primaryHeaders, ...environment.api.servers.primary.headers }
  };

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get the headers for the API requests.
   * @returns HttpHeaders object with the default headers.
   * @private
   * @memberof ApiService
   * @since 1.0.0
   * @version 1.0.0
   * @example getHeaders() => HttpHeaders
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      ...environment.api.primaryHeaders,
      // Add additional headers below
    });
  }

  /**
   * Handle the error response from the API.
   * @param endpoint The endpoint that failed.
   * @returns A function that handles the error response.
   * @private
   * @memberof ApiService
   * @since 1.0.0
   * @version 1.0.0
   * @example handleError('https://yourapi.com/endpoint') => (error: any) => Observable<T>
   */
  private handleError<T>(endpoint: string): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(`Request to ${endpoint} failed:`, error);
      return throwError(() => error);
    };
  }

  /**
   * Performs a GET request with optional query parameters.
   * @param endpoint The endpoint to request.
   * @param params Optional JSON object for query parameters.
   * @param server Optional server URL to override the default.
   * @returns An Observable of the response data.
   */
  public get<T>(endpoint: string, params?: { [param: string]: string | string[] }, server: Server = this.server): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      // Construct query params from the params object
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (Array.isArray(value)) {
          value.forEach(v => httpParams = httpParams.append(key, v));
        } else {
          httpParams = httpParams.set(key, value);
        }
      });
    }

    return this.http.get<T>(`${server.url}${server.api}${endpoint}`, { headers: this.getHeaders(), params: httpParams })
      .pipe(catchError(this.handleError<T>(endpoint)));
  }

  /**
   * Performs a POST request.
   * @param endpoint The endpoint to request.
   * @param data The data to send in the request body.
   * @param server Optional server URL to override the default.
   * @returns An Observable of the response data.
   */
  public post<T>(endpoint: string, data: any, server: Server = this.server): Observable<T> {
    return this.http.post<T>(`${server.url}${server.api}${endpoint}`, data, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError<T>(endpoint)));
  }

  /**
   * Performs a PUT request.
   * @param endpoint The endpoint to request.
   * @param data The data to send in the request body.
   * @param server Optional server URL to override the default.
   * @returns An Observable of the response data.
   */
  public put<T>(endpoint: string, data: any, server: Server = this.server): Observable<T> {
    return this.http.put<T>(`${server.url}${server.api}${endpoint}`, data, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError<T>(endpoint)));
  }

  /**
   * Performs a DELETE request.
   * @param endpoint The endpoint to request.
   * @param server Optional server URL to override the default.
   * @returns An Observable of the response data.
   */
  public delete<T>(endpoint: string, server: Server = this.server): Observable<T> {
    return this.http.delete<T>(`${server.url}${server.api}${endpoint}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError<T>(endpoint)));
  }

  /**
   * Performs a PATCH request.
   * @param endpoint The endpoint to request.
   * @param data The data to send in the request body.
   * @param server Optional server URL to override the default.
   * @returns An Observable of the response data.
   */
  public patch<T>(endpoint: string, data: any, server: Server = this.server): Observable<T> {
    return this.http.patch<T>(`${server.url}${server.api}${endpoint}`, data, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError<T>(endpoint)));
  }

  /**
   * Performs an OPTIONS request.
   * @param endpoint The endpoint to request.
   * @param server Optional server URL to override the default.
   * @returns An Observable of the response data.
   */
  public options<T>(endpoint: string, server: Server = this.server): Observable<T> {
    return this.http.options<T>(`${server.url}${server.api}${endpoint}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError<T>(endpoint)));
  }

  /**
   * Performs a HEAD request.
   * @param endpoint The endpoint to request.
   * @param server Optional server URL to override the default.
   * @returns An Observable of the response data.
   */
  public head<T>(endpoint: string, server: Server = this.server): Observable<T> {
    return this.http.head<T>(`${server.url}${server.api}${endpoint}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError<T>(endpoint)));
  }
}
