import { Component } from '@angular/core';
import { AppShellComponent } from './shared/presentation/components/app-shell.component';
@Component({
  standalone: true,
  imports: [AppShellComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})

export class App {
}
