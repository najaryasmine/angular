import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Suggestion } from '../../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  suggestionUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) {}

  getSuggestionsList(): Observable<Suggestion[]> {
    return this.http.get<any>(this.suggestionUrl).pipe(
      map(response => response.suggestions || response)
    );
  }

  getSuggestionById(id: number): Observable<Suggestion> {
    return this.http.get<any>(`${this.suggestionUrl}/${id}`).pipe(
      map(response => response.suggestion || response)
    );
  }

  addSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.post<any>(this.suggestionUrl, suggestion).pipe(
      map(response => response.suggestion || response)
    );
  }

  updateSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.put<any>(`${this.suggestionUrl}/${suggestion.id}`, suggestion).pipe(
      map(response => response.suggestion || response)
    );
  }

  deleteSuggestion(id: number): Observable<any> {
    return this.http.delete(`${this.suggestionUrl}/${id}`);
  }

  updateLikes(id: number): Observable<any> {
    return this.http.post(`${this.suggestionUrl}/${id}/like`, {});
  }
}