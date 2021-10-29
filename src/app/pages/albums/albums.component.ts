import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAlbums } from 'src/app/core/interfaces/resposne';
import { IUiTitle } from 'src/app/core/interfaces/ui-title';
import { AppConst } from 'src/app/helpers/app-contant';
import { AppRoute } from 'src/app/helpers/app-route';
import { Utils } from 'src/app/helpers/utils';
import { setLoader } from 'src/app/shared/store/actions/loader.actions';
import { AppState } from 'src/app/store';
import { loadAlbums } from '../store/page.actions';
import { getAlbumsData } from '../store/page.selectors';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  breadCrumbItems: Array<IUiTitle> = [];
  title: string = "Albums";

  albumsList: Array<IAlbums> = [];
  filterAlbumsList: Array<IAlbums> = [];
  displayAlbumsList: Array<IAlbums> = [];

  pageNo: number = AppConst.PAGE_NO;
  pageSize: number = AppConst.PAGE_SIZE * 2;
  totalRecords: number = AppConst.TOTAL_RECORDS;

  thumbnialList: string[] = [];

  constructor(
    private store: Store<AppState>,
    private pipe: DecimalPipe,
    private router: Router
  ) {

    this.breadCrumbItems = [
      { label: "Dashboard", isActive: false },
      { label: "Albums", isActive: true },
    ];

    this.store.select(getAlbumsData).subscribe((albums) => {
      if (albums && albums?.length) {
        this.totalRecords = albums.length;
        this.albumsList = albums;
        this.refreshAlbums();
      }
    });
  }

  ngOnInit(): void {
    this.thumbnialList = Utils.getDefaultThumbnail();
    this.loadAlbums();
  }

  onPageChange(pageNo: number) {
    this.pageNo = pageNo;
    this.refreshAlbums();
  }

  onRecordChange(pageSize: number) {
    this.pageSize = pageSize;
    this.refreshAlbums();
  }

  onSearch(event: any) {
    let input = event?.target?.value ?? '';
    if (!input) {
      this.albumsList = this.filterAlbumsList;
      this.filterAlbumsList = [];
      this.refreshAlbums();
      return;
    }

    if (!this.filterAlbumsList.length) {
      this.filterAlbumsList = this.albumsList;
    }

    this.albumsList = this.search(input, this.pipe);
    this.refreshAlbums();
  }

  search(text: string, pipe: PipeTransform): IAlbums[] {
    return this.albumsList.filter(album => {
      const input = text.toLowerCase();
      return album.title.toLowerCase().includes(input) ||
        pipe.transform(album.id).includes(input) ||
        pipe.transform(album.userId).includes(input)
    });
  }

  refreshAlbums() {
    this.displayAlbumsList = this.albumsList.slice((this.pageNo - 1) * this.pageSize, (this.pageNo - 1) * this.pageSize + this.pageSize);
  }

  loadAlbums() {
    this.store.dispatch(setLoader({ isLoading: true }));
    this.store.dispatch(loadAlbums());
  }

  gotoAlbumsDetails(album: IAlbums) {
    this.router.navigate([AppRoute.ROUTE_ALBUMS, album.id]);
  }

  userDetails(id: number) {
    this.router.navigate([AppRoute.ROUTE_USERS, id]);
  }
}
