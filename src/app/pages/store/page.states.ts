import { IAlbums, IDashboard, IPhotos, IPosts, IUser, IUserData } from "src/app/core/interfaces/resposne";

export interface PageState {
  posts: Array<IPosts>,
  albums: Array<IAlbums>,
  photos: Array<IPhotos>,
  dashboard: IDashboard,
  user: IUser,
  userData: IUserData
}

export const initialPageState: PageState = {
  posts: [],
  albums: [],
  photos: [],
  dashboard: {
    postList: [],
    photoList: []
  },
  user: null!,
  userData: {
    userAlbum: [],
    userPosts: []
  }
}