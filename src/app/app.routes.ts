import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', title: 'MaxiRadioFM | Inicio', component: HomeComponent },
  {
    path: 'post/:id/:slug',
    title: 'Notcias',
    component: PostDetailComponent,
  },
  { path: 'contacto', title: 'Contacto', component: ContactComponent },
  { path: 'quienes-somos', title: 'Quiénes Somos', component: AboutComponent },
  //{ path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HomeComponent,
    PostDetailComponent,
    ContactComponent,
    AboutComponent,
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule {}
