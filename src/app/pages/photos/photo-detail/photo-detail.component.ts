import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IPhotos } from 'src/app/core/interfaces/resposne';
import { IUiTitle } from 'src/app/core/interfaces/ui-title';
import { Utils } from 'src/app/helpers/utils';
import { setLoader } from 'src/app/shared/store/actions/loader.actions';
import { AppState } from 'src/app/store';
import { getPhotosData } from '../../store/page.selectors';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  breadCrumbItems: Array<IUiTitle> = [];
  photoId: number = 0;

  photo: IPhotos = null!;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
  ) {

    this.activatedRoute.params.subscribe(params => {
      if (params && params.id) {
        this.photoId = params.id;
        this.breadCrumbItems = [
          { label: "Dashboard", isActive: false },
          { label: "Photos", isActive: false },
          { label: `${this.photoId}`, isActive: true },
        ];

        this.store.dispatch(setLoader({ isLoading: true }));
        this.loadPhoto();
      } else {
        this.router.navigate(["/"]);
        return;
      }
    });

  }

  ngOnInit(): void {
  }

  async loadPhoto() {
    try {
      let photoList = await Utils.obserableToPromise(this.store.select(getPhotosData));
      if (photoList) {
        let photo = photoList.find(o => o.id == this.photoId);
        if (photo) {
          this.photo = photo;
        }
      }
      this.store.dispatch(setLoader({ isLoading: false }));
    } catch (error) {
      console.log(error);
    }
  }
}
