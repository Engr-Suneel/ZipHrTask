import { createAction, props } from "@ngrx/store";
import { IAlbums, IPhotos, IPosts, IUser } from "src/app/core/interfaces/resposne";

export enum PageActionsTypeEnum {

  LOAD_DASHBOARD_POSTS = "[Dashboard Page] load dashboard posts data",
  LOAD_DASHBOARD_POSTS_SUCCESS = "[Dashboard Page] load dashboard posts data success",

  LOAD_DASHBOARD_PHOTO = "[Dashboard Page] load dashboard photo data",
  LOAD_DASHBOARD_PHOTO_SUCCESS = "[Dashboard Page] load dashboard photo data success",

  LOAD_USER = "[Single User Data] load single user data",
  LOAD_USER_SUCCESS = "[Single User Data] load single user data success",

  LOAD_USER_POSTS = "[User Screen] load all user posts data",
  LOAD_USER_POSTS_SUCCESS = "[User Screen] load all user posts data success",

  LOAD_USER_ALBUM = "[User Screen] load all user album data",
  LOAD_USER_ALBUM_SUCCESS = "[User Screen] load all user album success",

  LOAD_POSTS = "[Posts Page] load all posts",
  LOAD_POSTS_SUCCESS = "[Posts Page] load all posts success",

  LOAD_SINGLE_POST = "[Single Post Page] load all single post",

  LOAD_ALBUMS = "[Albums Page] load all albums",
  LOAD_ALBUMS_SUCCESS = "[Albums Page] load all albums success",

  LOAD_SINGLE_ALBUM = "[Single Album Page] load all single album",

  LOAD_PHOTOS = "[Photos Page] load all photos",
  LOAD_PHOTOS_SUCCESS = "[Photos Page] load all photos success",

  LOAD_SINGLE_PHOTO = "[Single Photo Page] load all single photo",
}

export const loadDashboardPosts = createAction(PageActionsTypeEnum.LOAD_DASHBOARD_POSTS);
export const loadDashboardPostsSuccess = createAction(
  PageActionsTypeEnum.LOAD_DASHBOARD_POSTS_SUCCESS,
  props<{ payload: Array<IPosts> }>()
);

export const loadDashboardPhoto = createAction(PageActionsTypeEnum.LOAD_DASHBOARD_PHOTO);
export const loadDashboardPhotoSuccess = createAction(
  PageActionsTypeEnum.LOAD_DASHBOARD_PHOTO_SUCCESS,
  props<{ payload: Array<IPhotos> }>()
);

export const loadUser = createAction(PageActionsTypeEnum.LOAD_USER);
export const loadUserSuccess = createAction(
  PageActionsTypeEnum.LOAD_USER_SUCCESS,
  props<{ payload: IUser }>()
);

export const loadUserAlbums = createAction(PageActionsTypeEnum.LOAD_USER_ALBUM, props<{ id: number }>());
export const loadUserAlbumsSuccess = createAction(
  PageActionsTypeEnum.LOAD_USER_ALBUM_SUCCESS,
  props<{ payload: Array<IAlbums> }>()
);

export const loadUserPosts = createAction(PageActionsTypeEnum.LOAD_USER_POSTS, props<{ id: number }>());
export const loadUserPostsSuccess = createAction(
  PageActionsTypeEnum.LOAD_USER_POSTS_SUCCESS,
  props<{ payload: Array<IPosts> }>()
);

export const loadPosts = createAction(PageActionsTypeEnum.LOAD_POSTS);
export const loadPostsSuccess = createAction(
  PageActionsTypeEnum.LOAD_POSTS_SUCCESS,
  props<{ payload: Array<IPosts> }>()
);

export const loadSinglePost = createAction(PageActionsTypeEnum.LOAD_SINGLE_POST, props<{ id: number }>());

export const loadAlbums = createAction(PageActionsTypeEnum.LOAD_ALBUMS);
export const loadAlbumsSuccess = createAction(
  PageActionsTypeEnum.LOAD_ALBUMS_SUCCESS,
  props<{ payload: Array<IAlbums> }>()
);

export const loadSingleAlbum = createAction(PageActionsTypeEnum.LOAD_SINGLE_ALBUM, props<{ id: number }>());

export const loadPhotos = createAction(PageActionsTypeEnum.LOAD_PHOTOS);
export const loadPhotosSuccess = createAction(
  PageActionsTypeEnum.LOAD_PHOTOS_SUCCESS,
  props<{ payload: Array<IPhotos> }>()
);

export const loadSinglePhoto = createAction(PageActionsTypeEnum.LOAD_SINGLE_PHOTO, props<{ id: number }>());
