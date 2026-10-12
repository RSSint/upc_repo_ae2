import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SportsCentersStore } from '../../application/sports-centers.store';
import { SportsCenterCardComponent } from '../components/sports-center-card.component';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe, MatButtonModule, MatIconModule, SportsCenterCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  readonly store = inject(SportsCentersStore);

 ngOnInit(): void {
    void this.store.refresh();
  }
}
