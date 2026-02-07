import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {
  suggestionId: number = 0;
  suggestion: any;

  // Liste de toutes les suggestions (à remplacer par un service plus tard)
  suggestions = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      status: 'acceptee',
      category: 'Événements',
      description: 'Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l\'équipe.',
      date: new Date('2025-01-20'),
      nbLikes: 10
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      status: 'refusee',
      category: 'Technologie',
      description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
      date: new Date('2025-01-15'),
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Créer une salle de sport',
      status: 'en_attente',
      category: 'Infrastructure',
      description: 'Aménager une salle de sport moderne pour les étudiants et le personnel.',
      date: new Date('2025-01-10'),
      nbLikes: 25
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');
    this.suggestionId = id ? +id : 0; // Convertir en nombre
    
    // Charger les détails de la suggestion
    this.loadSuggestionDetails();
  }

  loadSuggestionDetails(): void {
    // Trouver la suggestion correspondante à l'ID
    this.suggestion = this.suggestions.find(s => s.id === this.suggestionId);
    
    if (!this.suggestion) {
      console.error('Suggestion non trouvée');
    }
  }

  backToList(): void {
    this.router.navigate(['/listSuggestion']);
  }

  getStatusClass(): string {
    if (!this.suggestion) return '';
    
    switch(this.suggestion.status) {
      case 'acceptee': return 'badge bg-success';
      case 'refusee': return 'badge bg-danger';
      case 'en_attente': return 'badge bg-warning';
      default: return 'badge bg-secondary';
    }
  }
}