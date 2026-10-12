import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'page-not-found-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe, MatButtonModule, MatIconModule],
  templateUrl: './page-not-found-page.component.html',
  styleUrl: './page-not-found-page.component.css',
})
export class PageNotFoundPageComponent {
  private readonly router = inject(Router);
  readonly path = this.router.url;
}
