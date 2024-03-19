import { Routes } from '@angular/router';
import { ClientIndexComponent } from './components/client-index/client-index.component';
import { ClientFromComponent } from './components/client-from/client-from.component';


export const routes: Routes = [
    { path: '', component: ClientIndexComponent },
    {
        path: 'nuevo', component: ClientFromComponent,
        data: {
            breadcrumb: 'Nuevo cliente',
        },
    },

];
