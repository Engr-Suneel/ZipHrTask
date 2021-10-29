import { Injectable } from "@angular/core";
import { AppConst } from "src/app/helpers/app-contant";
import { IAlbums, IPhotos, IPosts, IUser } from "../interfaces/resposne";
import { ApiProvider } from "./api.provider.service";

@Injectable()
export class PageService {

  constructor(
    private apiProvider: ApiProvider
  ) { }

  user = {
    detail: (userId: number) => {
      let baseUrl = `${AppConst.BASE_URL}${AppConst.API_USERS}/${userId}`;
      return this.apiProvider.get<IUser>(baseUrl);
    },
    posts: (userId: number) => {
      let baseUrl = `${AppConst.BASE_URL}${AppConst.API_POSTS}?userId=${userId}`;
      return this.apiProvider.get<Array<IPosts>>(baseUrl);
    },
    albums: (userId: number) => {
      let baseUrl = `${AppConst.BASE_URL}${AppConst.API_ALBUMS}?userId=${userId}`;
      return this.apiProvider.get<Array<IAlbums>>(baseUrl);
    },
  }

  dashboard = {
    posts: (userId: number) => {
      let baseUrl = `${AppConst.BASE_URL}${AppConst.API_POSTS}?userId=${userId}`;
      return this.apiProvider.get<Array<IPosts>>(baseUrl);
    },
    photos: (albumId: number) => {
      let baseUrl = `${AppConst.BASE_URL}${AppConst.API_PHOTOS}?albumId=${albumId}`
      return this.apiProvider.get<Array<IPhotos>>(baseUrl);
    }
  }

  posts = {
    all: () => {
      let baseUrl = `${AppConst.BASE_URL}${AppConst.API_POSTS}`
      return this.apiProvider.get<Array<IPosts>>(baseUrl);
    },
    single: (id: number) => {
      let baseUrl = `${AppConst.BASE_URL}${AppConst.API_POSTS}/${id}`
      return this.apiProvider.get<IPosts>(baseUrl);
    }
  }

  albums = {
    all: () => {
      let baseUrl = `${AppConst.BASE_URL}${AppConst.API_ALBUMS}`
      return this.apiProvider.get<Array<IAlbums>>(baseUrl);
    },
    single: (id: number) => {
      let baseUrl = `${AppConst.BASE_URL}${AppConst.API_PHOTOS}?albumId=${id}`
      return this.apiProvider.get<Array<IPhotos>>(baseUrl);
    }
  }

  photos = {
    all: () => {
      let baseUrl = `${AppConst.BASE_URL}${AppConst.API_PHOTOS}`
      return this.apiProvider.get<Array<IPhotos>>(baseUrl);
    },
    single: (id: number) => {
      let baseUrl = `${AppConst.BASE_URL}${AppConst.API_PHOTOS}/${id}`
      return this.apiProvider.get<IPhotos>(baseUrl);
    }
  }
}