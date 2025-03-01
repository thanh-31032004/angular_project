import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/products/list/list.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { DeltailComponent } from './pages/products/deltail/deltail.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddComponent } from './pages/admin/products/add/add.component';
import { CreateComponent } from './pages/admin/category/create/create.component';
import { ListComponent } from './pages/admin/category/list/list.component';
import { EditComponent } from './pages/admin/category/edit/edit.component';
import { UpdateComponent } from './pages/admin/products/edit/edit.component';
import { adminGuard } from './Guard/admin.guard';
import { ListUserComponent } from './pages/admin/user/list/list.component';



export const routes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [adminGuard],
        children: [
            {
                path: "",
                redirectTo: "admin",
                pathMatch: "full"
            },
            {
                path: 'products/list',
                component: ProductListComponent,
            },
            {
                path: 'products/add',
                component: AddComponent,
            },
            {
                path: 'products/edit/:id',
                component: UpdateComponent,
            },
            {
                path: 'category/add',
                component: CreateComponent,
            },
            {
                path: 'category/list',
                component: ListComponent
            },
            {
                path: 'category/edit/:id',
                component: EditComponent
            },
            {
                path: 'users/list',
                component: ListUserComponent
            }

        ],
    },
    {
        path: "",
        component: ClientLayoutComponent,
        children: [
            {

                path: "",
                redirectTo: "client",
                pathMatch: "full"

            },
            {
                path: "",
                component: HomepageComponent
            },
            {
                path: 'products/:id',
                component: DeltailComponent
            },
            {
                path: 'login',
                component: LoginComponent,
                pathMatch: 'full'
            },
            {
                path: 'signup',
                component: RegisterComponent
            },
        ]
    },
    {
        path: "**",
        component: NotfoundComponent
    }
]
