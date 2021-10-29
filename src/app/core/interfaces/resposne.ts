export interface IPosts {
  userId: number,
  id: number,
  title: string,
  body: string
}

export interface IAlbums {
  userId: number,
  id: number,
  title: string
}

export interface IPhotos {
  albumId: number,
  id: number,
  title: string
  url: string,
  thumbnailUrl: string,
}

export interface IDashboard {
  postList: Array<IPosts>,
  photoList: Array<IPhotos>
}

export interface IUserData {
  userPosts: Array<IPosts>,
  userAlbum: Array<IAlbums>
}

export interface IUser {
  id: number,
  name: string,
  username: string,
  email: string,
  address: IAddress,
  phone: string,
  website: string,
  company: ICompany
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

