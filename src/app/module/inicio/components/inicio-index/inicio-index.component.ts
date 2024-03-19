import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InicioCardComponent } from '../inicio-card/inicio-card.component';
import { TitleComponent } from '../../../../shared/components/title/title.component';

@Component({
  selector: 'app-inicio-index',
  standalone: true,
  imports: [CommonModule, TitleComponent ,InicioCardComponent],
  templateUrl: './inicio-index.component.html',
  styleUrl: './inicio-index.component.css'
})
export class InicioIndexComponent {

  title: string = 'Inicio';
}
