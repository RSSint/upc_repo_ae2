import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TranslatePipe, MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.css',
})
export class AppShellComponent {
  private readonly translate = inject(TranslateService);
 readonly sidenavOpen = signal(
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(min-width: 761px)').matches
      : true,
  );
  readonly currentLanguage = signal('en');

 setLanguage(language: 'en' | 'es'): void {
    this.translate.use(language);
    this.currentLanguage.set(language);
    document.documentElement.lang = language;
  }

 closeOnSmallScreen(): void {
    if (window.matchMedia('(max-width: 760px)').matches) this.sidenavOpen.set(false);
  }
}
