import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CommonModule } from '@angular/common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzGridModule } from 'ng-zorro-antd/grid';
@Component({
  selector: 'app-title',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, InputTextModule, BreadcrumbModule, CommonModule, NzBreadCrumbModule, NzPageHeaderModule,
    NzGridModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css',
  providers: []
})
export class TitleComponent {
  @Input() title: string = '';
  _button = input<boolean | undefined>(true);
  _title = input<boolean | undefined>(true);
  @Output() botonCompont = new EventEmitter()
  @Input() openComponent: any;

  open():void {
    if (this.openComponent) {
      this.openComponent();
    }
   
  }

}



