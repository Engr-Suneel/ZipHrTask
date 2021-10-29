import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IPosts } from 'src/app/core/interfaces/resposne';
import { IUiTitle } from 'src/app/core/interfaces/ui-title';
import { EventService } from 'src/app/core/services/event.service';
import { AppConst } from 'src/app/helpers/app-contant';
import { setLoader } from 'src/app/shared/store/actions/loader.actions';
import { AppState } from 'src/app/store';
import { loadSinglePost } from '../../store/page.actions';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  breadCrumbItems: Array<IUiTitle> = [];
  postId: number = 0;
  post: IPosts = null!;

  subscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private eventService: EventService
  ) {

    this.activatedRoute.params.subscribe(params => {
      if (params && params.id) {
        this.postId = params.id;
        this.breadCrumbItems = [
          { label: "Dashboard", isActive: false },
          { label: "Posts", isActive: false },
          { label: `${this.postId}`, isActive: true },
        ];

        this.loadPost();
      } else {
        this.router.navigate(["/"]);
        return;
      }
    });
  }

  ngOnInit(): void {
    let postSubscription = this.eventService.subscribe(AppConst.EVENT_SINGLE_POST_DATA, (data: IPosts) => {
      if (data) {
        this.post = data;
      }
    });

    this.subscription.add(postSubscription);
  }

  loadPost() {
    this.store.dispatch(setLoader({ isLoading: true }));
    this.store.dispatch(loadSinglePost({ id: this.postId }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
