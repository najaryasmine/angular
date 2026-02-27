import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  searchText: string = '';
  favorites: Suggestion[] = [];
  suggestions: Suggestion[] = [];

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.suggestionService.getSuggestionsList().subscribe(data => {
      this.suggestions = data;
    });
  }

  get filteredSuggestions(): Suggestion[] {
    if (!this.searchText) return this.suggestions;
    const search = this.searchText.toLowerCase();
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(search) ||
      s.category.toLowerCase().includes(search)
    );
  }

 like(suggestion: Suggestion): void {
  this.suggestionService.updateLikes(suggestion.id).subscribe(() => {
    suggestion.nbLikes++;  
  });
}

  deleteSuggestion(id: number): void {
    this.suggestionService.deleteSuggestion(id).subscribe(() => {
      this.suggestions = this.suggestions.filter(s => s.id !== id);
    });
  }

  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find(fav => fav.id === suggestion.id)) {
      this.favorites.push(suggestion);
      alert('Suggestion ajoutée aux favoris !');
    } else {
      alert('Cette suggestion est déjà dans vos favoris !');
    }
  }

  showButtons(suggestion: Suggestion): boolean {
    return suggestion.status !== 'refusee';
  }
}