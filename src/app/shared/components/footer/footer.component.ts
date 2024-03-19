import { Component, inject } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: ` 
  <div class="layout-footer">
  <span class="font-medium ml-2"
    >Copyright&copy;2024
    
    SoftFusion. Todos los derechos reservados.</span
  >
</div>
  `,

})
export class FooterComponent {
  layoutService: LayoutService = inject(LayoutService);



}
