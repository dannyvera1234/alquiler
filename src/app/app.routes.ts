import { Routes } from '@angular/router';
import { NoPageIndexComponent } from './module/noPage/components/no-page-index/no-page-index.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    {
        path: 'auth',
        loadComponent() {
            return import('./layers/auth/auth.component').then((m) => m.AuthComponent);
        },
        data: { breadcrumb: 'auth' },
        children: [
            {
                path: 'login',
                loadChildren: () => import('./module/authentication/authentication.routes').then((m) => m.routes),
            },
        ]
    },
    {
        path: 'admin',
        loadComponent() {
            return import('./layers/admin/admin.component').then((m) => m.AdminComponent);
        },
        data: { breadcrumb: 'Administración' },
        children: [
            {
                path: 'inicio',
                loadChildren: () => import('./module/inicio/inicio.routes').then((m) => m.routes),
                data: {
                    breadcrumb: 'inicio',
                },
            },
            {
                path: 'clientes',
                loadChildren: () => import('./module/clientes/client.routes').then((m) => m.routes),
                data: {
                    breadcrumb: 'clientes',
                },
            },
            {
                path: 'productos',
                loadChildren: () => import('./module/product/product.routes').then((m) => m.routes),
                data: {
                    breadcrumb: 'productos',
                },
            },
            {
                path: 'alquiler',
                loadChildren: () => import('./module/detailAlquiler/alquiler.routes').then((m) => m.routes),
                data: {
                    breadcrumb: 'alquiler',
                },
            },
        ]
    },
    { path: '**', component: NoPageIndexComponent },
];




