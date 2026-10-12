import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { SportsCenterSummary } from '../../domain/model/reservation';

@Component({
  selector: 'sports-center-card',
  standalone: true,
  imports: [DatePipe, MatCardModule, MatIconModule],
  templateUrl: './sports-center-card.component.html',
  styleUrl: './sports-center-card.component.css',
})
export class SportsCenterCardComponent {
  @Input({ required: true }) summary!: SportsCenterSummary;
}
