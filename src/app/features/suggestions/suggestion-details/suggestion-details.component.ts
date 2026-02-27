import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../../core/services/suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {
  suggestionId: number = 0;
  suggestion: Suggestion | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.suggestionId = id ? +id : 0;
    this.suggestionService.getSuggestionById(this.suggestionId).subscribe(data => {
      this.suggestion = data;
    });
  }

  backToList(): void {
    this.router.navigate(['/suggestions']);
  }

  goToUpdate(): void {
    this.router.navigate(['/suggestions/edit', this.suggestionId]);
  }

  getStatusClass(): string {
    if (!this.suggestion) return '';
    switch (this.suggestion.status) {
      case 'acceptee': return 'badge bg-success';
      case 'refusee': return 'badge bg-danger';
      case 'en_attente': return 'badge bg-warning';
      default: return 'badge bg-secondary';
    }
  }
}