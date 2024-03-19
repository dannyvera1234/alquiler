import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from '../../../../shared/components/title/title.component';
import { GridComponent } from '../../../../shared/components/grid/grid.component';

@Component({
  selector: 'app-product-index',
  standalone: true,
  imports: [CommonModule,TitleComponent,GridComponent],
  templateUrl: './product-index.component.html',
  styleUrl: './product-index.component.css'
})
export class ProductIndexComponent {
  title: string = 'Productos';
  columns = ['Nombre', 'Identificación', 'Celular', 'Dirección', 'Correo'];
}
