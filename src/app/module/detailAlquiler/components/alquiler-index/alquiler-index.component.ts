import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from '../../../../shared/components/title/title.component';

@Component({
  selector: 'app-alquiler-index',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './alquiler-index.component.html',
  styleUrl: './alquiler-index.component.css'
})
export class AlquilerIndexComponent {
title: string = 'Alquiler de Productos';
}
