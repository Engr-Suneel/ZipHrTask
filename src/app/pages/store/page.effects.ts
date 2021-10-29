import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { EventService } from "src/app/core/services/event.service";
import { PageService } from "src/app/core/services/pages.service";
import { AppConst } from "src/app/helpers/app-contant";
import { setLoader } from "src/app/shared/store/actions/loader.actions";
import { AppState } from "src/app/store";
import { loadAlbums, loadAlbumsSuccess, loadDashboardPhoto, loadDashboardPhotoSuccess, loadDashboardPosts, loadDashboardPostsSuccess, loadPhotos, loadPhotosSuccess, loadPosts, loadPostsSuccess, loadSingleAlbum, loadSinglePhoto, loadSinglePost, loadUser, loadUserAlbums, loadUserAlbumsSuccess, loadUserPosts, loadUserPostsSuccess, loadUserSuccess } from "./page.actions";

@Injectable()
export class PageEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private eventService: EventService,
    private pageService: PageService
  ) {

  }

  loadDashboardPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDashboardPosts),
      exhaustMap((action) =>
        this.pageService.dashboard.posts(1).pipe(
          map((data) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return loadDashboardPostsSuccess({ payload: data });
          }),
          catchError((error: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return of(error)
          })
        )
      )
    )
  );

  loadDashboardPhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDashboardPhoto),
      exhaustMap((action) =>
        this.pageService.dashboard.photos(1).pipe(
          map((data) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return loadDashboardPhotoSuccess({ payload: data });
          }),
          catchError((error: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return of(error)
          })
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      exhaustMap((action) =>
        this.pageService.user.detail(1).pipe(
          map((data) => {
            return loadUserSuccess({ payload: data });
          }),
          catchError((error: any) => {
            return of(error)
          })
        )
      )
    )
  );

  loadUserPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserPosts),
      exhaustMap((action) =>
        this.pageService.user.posts(action.id).pipe(
          map((data) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return loadUserPostsSuccess({ payload: data });
          }),
          catchError((error: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return of(error)
          })
        )
      )
    )
  );

  loadUserAlbums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserAlbums),
      exhaustMap((action) =>
        this.pageService.user.albums(action.id).pipe(
          map((data) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return loadUserAlbumsSuccess({ payload: data });
          }),
          catchError((error: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return of(error)
          })
        )
      )
    )
  );

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      exhaustMap((action) =>
        this.pageService.posts.all().pipe(
          map((data) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return loadPostsSuccess({ payload: data });
          }),
          catchError((error: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return of(error)
          })
        )
      )
    )
  );

  loadSinglePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSinglePost),
      exhaustMap((action) =>
        this.pageService.posts.single(action.id).pipe(
          map((data) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            this.eventService.broadcast(AppConst.EVENT_SINGLE_POST_DATA, data);
          }),
          catchError((error: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return of(error)
          })
        )
      )
    ), { dispatch: false }
  );

  loadAlbums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAlbums),
      exhaustMap((action) =>
        this.pageService.albums.all().pipe(
          map((data) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return loadAlbumsSuccess({ payload: data });
          }),
          catchError((error: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return of(error)
          })
        )
      )
    )
  );

  loadSingleAlbum$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSingleAlbum),
      exhaustMap((action) =>
        this.pageService.albums.single(action.id).pipe(
          map((data) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            this.eventService.broadcast(AppConst.EVENT_SINGLE_ALBUM_DATA, data);
          }),
          catchError((error: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return of(error)
          })
        )
      )
    ), { dispatch: false }
  );

  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPhotos),
      exhaustMap((action) =>
        this.pageService.photos.all().pipe(
          map((data) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return loadPhotosSuccess({ payload: data });
          }),
          catchError((error: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return of(error)
          })
        )
      )
    )
  );

  loadSinglePhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSinglePhoto),
      exhaustMap((action) =>
        this.pageService.photos.single(action.id).pipe(
          map((data) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            this.eventService.broadcast(AppConst.EVENT_SINGLE_PHOTO_DATA, data);
          }),
          catchError((error: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return of(error)
          })
        )
      )
    ), { dispatch: false }
  );
}