import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) },

  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to login
   { path: 'achievements', 
    loadChildren: () => import('./features/achievements/achievements.module').then(m =>
    m.AchievementsModule)
   },
   { path: 'events', 
    loadChildren: () => import('./features/events/events.module').then(m => 
    m.EventsModule)
   },
   { path: 'highlights', 
    loadChildren: () => import('./features/highlights/highlights.module').then(m => 
    m.HighlightsModule)
   },
   { path: 'gallery', 
    loadChildren: () => import('./features/gallery/gallery.module').then(m => 
    m.GalleryModule)
   },
   { path: 'students', 
    loadChildren: () => import('./features/students/students.module').then(m => 
    m.StudentsModule)
   },
 
   { path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => 
    m.HomeModule)
   },


   { path: 'shared', 
    loadChildren: () => import('./shared/shared.module').then(m => 
    m.SharedModule)
   }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
