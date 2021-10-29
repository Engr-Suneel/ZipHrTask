import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IDashboard, IPhotos, IPosts, IUser } from 'src/app/core/interfaces/resposne';
import { setLoader } from 'src/app/shared/store/actions/loader.actions';
import { AppState } from 'src/app/store';
import { loadDashboardPhoto, loadDashboardPosts, loadUser } from '../store/page.actions';
import { getDashboardPhotoData, getDashboardPostsData, getUserData } from '../store/page.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardPosts$: Observable<Array<IPosts>> = null!;
  dashboardPhoto$: Observable<Array<IPhotos>> = null!;
  user$: Observable<IUser> = null!

  constructor(
    private store: Store<AppState>
  ) {

    this.dashboardPosts$ = this.store.select(getDashboardPostsData);
    this.dashboardPhoto$ = this.store.select(getDashboardPhotoData);
    this.user$ = this.store.select(getUserData);
  }

  ngOnInit(): void {
    this.loaadDashboardData();
  }

  loaadDashboardData() {
    this.store.dispatch(setLoader({ isLoading: true }));
    this.store.dispatch(loadDashboardPosts());
    this.store.dispatch(loadDashboardPhoto());
    this.store.dispatch(loadUser());
  }
}
