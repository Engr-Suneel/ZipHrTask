import { createReducer, on } from "@ngrx/store";
import { IDashboard, IUserData } from "src/app/core/interfaces/resposne";
import { loadAlbumsSuccess, loadDashboardPhotoSuccess, loadDashboardPostsSuccess, loadPhotosSuccess, loadPostsSuccess, loadUserAlbumsSuccess, loadUserPostsSuccess, loadUserSuccess } from "./page.actions";
import { initialPageState } from "./page.states";

export const PageReducers = createReducer(
  initialPageState,
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.payload
    }
  }),
  on(loadAlbumsSuccess, (state, action) => {
    return {
      ...state,
      albums: action.payload
    }
  }),
  on(loadPhotosSuccess, (state, action) => {
    return {
      ...state,
      photos: action.payload
    }
  }),
  on(loadDashboardPostsSuccess, (state, action) => {
    let { postList, photoList } = state.dashboard;
    postList = action.payload;
    let dashboard: IDashboard = {
      postList,
      photoList
    }
    return {
      ...state,
      dashboard
    }
  }),
  on(loadDashboardPhotoSuccess, (state, action) => {
    let { postList, photoList } = state.dashboard;
    photoList = action.payload;
    let dashboard: IDashboard = {
      postList,
      photoList
    }
    return {
      ...state,
      dashboard
    }
  }),
  on(loadUserSuccess, (state, action) => {
    return {
      ...state,
      user: action.payload
    }
  }),
  on(loadUserAlbumsSuccess, (state, action) => {
    let { userAlbum, userPosts } = state.userData;
    userAlbum = action.payload;
    let userData: IUserData = {
      userAlbum,
      userPosts
    }
    return {
      ...state,
      userData
    }
  }),
  on(loadUserPostsSuccess, (state, action) => {
    let { userAlbum, userPosts } = state.userData;
    userPosts = action.payload;
    let userData: IUserData = {
      userAlbum,
      userPosts
    }
    return {
      ...state,
      userData
    }
  }),
)