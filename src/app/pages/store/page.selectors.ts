import { createSelector } from "@ngrx/store";
import { getPagesState } from ".";

export const getPostsData = createSelector(getPagesState, (state) => {
  return state?.pageState?.posts;
});

export const getAlbumsData = createSelector(getPagesState, (state) => {
  return state?.pageState?.albums;
});

export const getPhotosData = createSelector(getPagesState, (state) => {
  return state?.pageState?.photos;
});

export const getDashboardPostsData = createSelector(getPagesState, (state) => {
  return state?.pageState?.dashboard?.postList;
});

export const getDashboardPhotoData = createSelector(getPagesState, (state) => {
  return state?.pageState?.dashboard?.photoList;
});

export const getUserData = createSelector(getPagesState, (state) => {
  return state?.pageState?.user;
});

export const getUserPostsData = createSelector(getPagesState, (state) => {
  return state?.pageState?.userData?.userPosts;
});

export const getUserAlbumsData = createSelector(getPagesState, (state) => {
  return state?.pageState?.userData?.userAlbum;
});