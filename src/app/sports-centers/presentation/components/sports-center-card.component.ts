import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { SportsCenterSummary } from '../../domain/model/reservation';
import { ActivityType } from '../../domain/model/sports-center';

@Component({
  selector: 'sports-center-card',
  standalone: true,
  imports: [DatePipe, TranslatePipe, MatCardModule, MatIconModule],
  templateUrl: './sports-center-card.component.html',
  styleUrl: './sports-center-card.component.css',
})
export class SportsCenterCardComponent {
  @Input({ required: true }) summary!: SportsCenterSummary;

  get activityIcon(): string {
    const icons: Record<ActivityType, string> = {
      fitness: 'fitness_center',
      yoga: 'self_improvement',
      swimming: 'pool',
      cycling: 'pedal_bike',
    };
    return icons[this.summary.center.activityType];
  }
}
