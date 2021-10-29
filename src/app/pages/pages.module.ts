import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsComponent } from './posts/posts.component';
import { AlbumsComponent } from './albums/albums.component';
import { PhotosComponent } from './photos/photos.component';
import { SharedModule } from '../shared/shared.module';
import { PageService } from '../core/services/pages.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppConst } from '../helpers/app-contant';
import { pagesReducers, PagesEffects } from './store';
import { AlbumDetailComponent } from './albums/album-detail/album-detail.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PhotoDetailComponent } from './photos/photo-detail/photo-detail.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PostsComponent,
    AlbumsComponent,
    PhotosComponent,
    AlbumDetailComponent,
    PostDetailComponent,
    PhotoDetailComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    StoreModule.forFeature(AppConst.PAGE_FEATURE_SELECTOR, pagesReducers),
    EffectsModule.forFeature(PagesEffects)
  ],
  providers: [
    PageService
  ]
})
export class PagesModule { }
