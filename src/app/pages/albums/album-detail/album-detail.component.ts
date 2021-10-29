import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAlbums, IPhotos } from 'src/app/core/interfaces/resposne';
import { IUiTitle } from 'src/app/core/interfaces/ui-title';
import { EventService } from 'src/app/core/services/event.service';
import { AppConst } from 'src/app/helpers/app-contant';
import { AppRoute } from 'src/app/helpers/app-route';
import { Utils } from 'src/app/helpers/utils';
import { setLoader } from 'src/app/shared/store/actions/loader.actions';
import { AppState } from 'src/app/store';
import { loadSingleAlbum } from '../../store/page.actions';
import { getAlbumsData } from '../../store/page.selectors';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit, OnDestroy {

  breadCrumbItems: Array<IUiTitle> = [];
  title: string = "Albums";

  albumId: number = 0;
  subscription: Subscription = new Subscription();
  album: IAlbums = null!;

  albumsList: Array<IPhotos> = [];
  filterAlbumsList: Array<IPhotos> = [];
  displayAlbumsList: Array<IPhotos> = [];

  pageNo: number = AppConst.PAGE_NO;
  pageSize: number = AppConst.PAGE_SIZE * 2;
  totalRecords: number = AppConst.TOTAL_RECORDS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private pipe: DecimalPipe,
    private eventService: EventService
  ) {

    this.activatedRoute.params.subscribe(params => {
      if (params && params.id) {
        this.albumId = params.id;
        this.breadCrumbItems = [
          { label: "Dashboard", isActive: false },
          { label: "Albums", isActive: false },
          { label: `${this.albumId}`, isActive: true },
        ];

        this.loadAlbum();
      } else {
        this.router.navigate(["/"]);
        return;
      }
    });
  }

  ngOnInit(): void {
    let postSubscription = this.eventService.subscribe(AppConst.EVENT_SINGLE_ALBUM_DATA, (data: Array<IPhotos>) => {
      if (data && data?.length) {
        this.albumsList = data;
        this.refreshAlbums();
      }
    });

    this.subscription.add(postSubscription);
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

  search(text: string, pipe: PipeTransform): IPhotos[] {
    return this.albumsList.filter(photo => {
      const input = text.toLowerCase();
      return photo.title.toLowerCase().includes(input) ||
        pipe.transform(photo.id).includes(input) ||
        pipe.transform(photo.albumId).includes(input)
    });
  }

  refreshAlbums() {
    this.displayAlbumsList = this.albumsList.slice((this.pageNo - 1) * this.pageSize, (this.pageNo - 1) * this.pageSize + this.pageSize);
  }

  async loadAlbum() {
    this.store.dispatch(setLoader({ isLoading: true }));
    this.store.dispatch(loadSingleAlbum({ id: this.albumId }));

    try {
      let albumList = await Utils.obserableToPromise(this.store.select(getAlbumsData));
      if (albumList && albumList.length) {
        let album = albumList.find(o => o.id == this.albumId);
        if (album) {
          this.album = album;
        }
      }
    } catch (error) {

    }
  }

  showPhoto(item: IPhotos) {
    this.router.navigate([AppRoute.ROUTE_PHOTOS, item.id]);
  }

  userDetails(id: number) {
    this.router.navigate([AppRoute.ROUTE_USERS, id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
