import { Routes } from '@angular/router';
import { ProductIndexComponent } from './components/product-index/product-index.component';
import { ProductoFromComponent } from './components/producto-from/producto-from.component';


export const routes: Routes = [
    {
        path: '', component: ProductIndexComponent,
        
        
    },
    {
        path:'nuevo', component: ProductoFromComponent,
        data: {
            breadcrumb: 'Nuevo producto',
        },
    }
    
];
