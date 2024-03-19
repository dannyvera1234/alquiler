import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, FileUploadModule, ToolbarModule, ButtonModule, TableModule, BreadcrumbModule, InputTextModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit {
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  data: MenuItem[] = [];

  
  _columnas: string[] = [
    
  ];
  _rows: any[] = [];

  @Input() set columns(value: string[]) {
    this._columnas = value;
  }
  @Input() set rows(value: any[]) {
    this._rows = value;
  }
  

  _botones: any[] = [
    { title: 'Editar', color: 'primary', icon: PrimeIcons.COG, tipo: 'editar' },
    { title: 'Eliminar', color: 'danger', icon: PrimeIcons.TRASH, tipo: 'eliminar' },
  ];




  constructor() { }

  ngOnInit() {



  }




}

