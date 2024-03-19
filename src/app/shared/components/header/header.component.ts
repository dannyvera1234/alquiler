import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: ` 
  <div class="layout-topbar">
    <a class="layout-topbar-logo" routerLink="">
        <img src="assets/layout/images/{{layoutService.config().colorScheme === 'light' ? 'logo-dark' : 'logo-white'}}.svg" alt="logo">
        <span>SAKAI</span>
    </a>

    <button #menubutton class="p-link layout-menu-button layout-topbar-button" (click)="layoutService.onMenuToggle()">
        <i class="pi pi-bars"></i>
    </button>

    <button #topbarmenubutton class="p-link layout-topbar-menu-button layout-topbar-button" (click)="layoutService.showProfileSidebar()">
        <i class="pi pi-ellipsis-v"></i>
    </button>

    <div #topbarmenu class="layout-topbar-menu" [ngClass]="{'layout-topbar-menu-mobile-active': layoutService.state.profileSidebarVisible}">
        <button class="p-link layout-topbar-button">
            <i class="pi pi-calendar"></i>
            <span>Calendar</span>
        </button>
        <button class="p-link layout-topbar-button">
            <i class="pi pi-user"></i>
            <span>Profile</span>
        </button>
        <button class="p-link layout-topbar-button" >
            <i class="pi pi-cog"></i>
            <span>Settings</span>
        </button>
    </div>
</div>
  `,

})
export class HeaderComponent {


  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;
  
  layoutService: LayoutService = inject(LayoutService);



}
