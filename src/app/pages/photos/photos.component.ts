import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IPhotos } from 'src/app/core/interfaces/resposne';
import { IUiTitle } from 'src/app/core/interfaces/ui-title';
import { AppConst } from 'src/app/helpers/app-contant';
import { AppRoute } from 'src/app/helpers/app-route';
import { setLoader } from 'src/app/shared/store/actions/loader.actions';
import { AppState } from 'src/app/store';
import { loadPhotos } from '../store/page.actions';
import { getPhotosData } from '../store/page.selectors';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  breadCrumbItems: Array<IUiTitle> = [];
  title: string = "Photos";

  photoList: Array<IPhotos> = [];
  filterPhotoList: Array<IPhotos> = [];
  displayPhotoList: Array<IPhotos> = [];

  pageNo: number = AppConst.PAGE_NO;
  pageSize: number = AppConst.PAGE_SIZE * 2;
  totalRecords: number = AppConst.TOTAL_RECORDS;

  constructor(
    private store: Store<AppState>,
    private pipe: DecimalPipe,
    private router: Router
  ) {

    this.breadCrumbItems = [
      { label: "Dashboard", isActive: false },
      { label: "Photos", isActive: true },
    ];

    this.store.select(getPhotosData).subscribe((photos) => {
      if (photos && photos?.length) {
        this.totalRecords = photos.length;
        this.photoList = photos;
        this.refreshPhotos();
      }
    });
  }

  ngOnInit(): void {
    this.loadPhotos();
  }

  onPageChange(pageNo: number) {
    this.pageNo = pageNo;
    this.refreshPhotos();
  }

  onRecordChange(pageSize: number) {
    this.pageSize = pageSize;
    this.refreshPhotos();
  }

  onSearch(event: any) {
    let input = event?.target?.value ?? '';
    if (!input) {
      this.photoList = this.filterPhotoList;
      this.filterPhotoList = [];
      this.refreshPhotos();
      return;
    }

    if (!this.filterPhotoList.length) {
      this.filterPhotoList = this.photoList;
    }

    this.photoList = this.search(input, this.pipe);
    this.refreshPhotos();
  }

  search(text: string, pipe: PipeTransform): IPhotos[] {
    return this.photoList.filter(album => {
      const input = text.toLowerCase();
      return album.title.toLowerCase().includes(input) ||
        pipe.transform(album.id).includes(input) ||
        pipe.transform(album.albumId).includes(input)
    });
  }

  refreshPhotos() {
    this.displayPhotoList = this.photoList.slice((this.pageNo - 1) * this.pageSize, (this.pageNo - 1) * this.pageSize + this.pageSize);
  }

  loadPhotos() {
    this.store.dispatch(setLoader({ isLoading: true }));
    this.store.dispatch(loadPhotos());
  }

  showPhoto(photo: IPhotos) {
    this.router.navigate([AppRoute.ROUTE_PHOTOS, photo.id]);
  }

  viewAlbum(photo: IPhotos) {
    this.router.navigate([AppRoute.ROUTE_ALBUMS, photo.albumId]);
  }
}
