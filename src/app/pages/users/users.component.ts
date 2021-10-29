import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAlbums, IPosts, IUser } from 'src/app/core/interfaces/resposne';
import { setLoader } from 'src/app/shared/store/actions/loader.actions';
import { AppState } from 'src/app/store';
import { loadUser, loadUserAlbums, loadUserPosts } from '../store/page.actions';
import { getUserAlbumsData, getUserData, getUserPostsData } from '../store/page.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: IUser = null!
  userPosts$: Observable<Array<IPosts>> = null!;
  userAlbums$: Observable<Array<IAlbums>> = null!;

  userId: number = 0;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

    this.activatedRoute.params.subscribe(params => {
      if (params && params.id) {
        this.userId = params.id;
        this.loadUser();
      } else {
        this.router.navigate(["/"]);
        return;
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(setLoader({ isLoading: true }));
    this.store.dispatch(loadUser());
  }

  loadUser() {
    this.store.select(getUserData).subscribe((data) => {
      if (data) {
        this.user = data;
        this.loadUserData();
      }
    });

    this.userAlbums$ = this.store.select(getUserAlbumsData);
    this.userPosts$ = this.store.select(getUserPostsData);
  }

  loadUserData() {
    if (this.user) {
      this.store.dispatch(loadUserAlbums({ id: this.user.id }));
      this.store.dispatch(loadUserPosts({ id: this.user.id }));
    }
  }
}
