import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoute } from '../helpers/app-route';
import { AlbumDetailComponent } from './albums/album-detail/album-detail.component';
import { AlbumsComponent } from './albums/albums.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhotoDetailComponent } from './photos/photo-detail/photo-detail.component';
import { PhotosComponent } from './photos/photos.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: AppRoute.ROUTE_DASHBOARD },
  { path: AppRoute.ROUTE_DASHBOARD, component: DashboardComponent },
  { path: AppRoute.ROUTE_POSTS, component: PostsComponent },
  { path: AppRoute.ROUTE_POSTS_DETAILS, component: PostDetailComponent },
  { path: AppRoute.ROUTE_ALBUMS, component: AlbumsComponent },
  { path: AppRoute.ROUTE_ALBUMS_DETAILS, component: AlbumDetailComponent },
  { path: AppRoute.ROUTE_PHOTOS, component: PhotosComponent },
  { path: AppRoute.ROUTE_PHOTOS_DETAILS, component: PhotoDetailComponent },
  { path: AppRoute.ROUTE_USERS_DETAILS, component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
