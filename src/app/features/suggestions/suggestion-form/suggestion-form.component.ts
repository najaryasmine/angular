import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {

  suggestionForm!: FormGroup;
  isEditMode: boolean = false;
  id!: number;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actR: ActivatedRoute,
    private service: SuggestionService
  ) {}

ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z ]*$')
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      status: [{ value: 'en attente', disabled: false }],
      date: [{ value: new Date().toLocaleDateString('fr-FR'), disabled: true }],
      nbLikes: [0]
    });

    this.id = this.actR.snapshot.params['id'];
    if (this.id) {
      this.isEditMode = true;
      this.service.getSuggestionById(this.id).subscribe((data) => {
        this.suggestionForm.patchValue(data);
      });
    }
  }

  get title() { return this.suggestionForm.get('title'); }
  get description() { return this.suggestionForm.get('description'); }
  get category() { return this.suggestionForm.get('category'); }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      if (this.isEditMode) {
        const updated = { 
          id: this.id, 
          ...this.suggestionForm.getRawValue()
        };
        this.service.updateSuggestion(updated).subscribe(() => {
          this.router.navigate(['/suggestions']);
        });
      } else {
        const newSuggestion = {
          id: 0,
          ...this.suggestionForm.getRawValue(),
          date: new Date(),
          status: 'en_attente',
          nbLikes: 0
        };
        this.service.addSuggestion(newSuggestion).subscribe(() => {
          this.router.navigate(['/suggestions']);
        });
      }
    }
  }
}