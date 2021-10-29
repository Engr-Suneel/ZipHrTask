import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IPosts } from 'src/app/core/interfaces/resposne';
import { IUiTitle } from 'src/app/core/interfaces/ui-title';
import { AppConst } from 'src/app/helpers/app-contant';
import { AppRoute } from 'src/app/helpers/app-route';
import { setLoader } from 'src/app/shared/store/actions/loader.actions';
import { AppState } from 'src/app/store';
import { loadPosts } from '../store/page.actions';
import { getPostsData } from '../store/page.selectors';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  breadCrumbItems: Array<IUiTitle> = [];
  title: string = "Posts";
  postsList: Array<IPosts> = [];
  filterPostsList: Array<IPosts> = [];
  displayPostList: Array<IPosts> = [];

  pageNo: number = AppConst.PAGE_NO;
  pageSize: number = AppConst.PAGE_SIZE;
  totalRecords: number = AppConst.TOTAL_RECORDS;

  constructor(
    private store: Store<AppState>,
    private pipe: DecimalPipe,
    private route: Router
  ) {
    this.breadCrumbItems = [
      { label: "Dashboard", isActive: false },
      { label: "Posts", isActive: true },
    ];

    this.store.select(getPostsData).subscribe((posts) => {
      if (posts && posts?.length) {
        this.totalRecords = posts.length;
        this.postsList = posts;
        this.refreshPosts();
      }
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  onPageChange(pageNo: number) {
    this.pageNo = pageNo;
    this.refreshPosts();
  }

  onRecordChange(pageSize: number) {
    this.pageSize = pageSize;
    this.refreshPosts();
  }

  onSearch(event: any) {
    let input = event?.target?.value ?? '';
    if (!input) {
      this.postsList = this.filterPostsList;
      this.filterPostsList = [];
      this.refreshPosts();
      return;
    }

    if (!this.filterPostsList.length) {
      this.filterPostsList = this.postsList;
    }

    this.postsList = this.search(input, this.pipe);
    this.refreshPosts();
  }

  search(text: string, pipe: PipeTransform): IPosts[] {
    return this.postsList.filter(post => {
      const input = text.toLowerCase();
      return post.title.toLowerCase().includes(input) ||
        post.body.toLowerCase().includes(input) ||
        pipe.transform(post.id).includes(input) ||
        pipe.transform(post.userId).includes(input)
    });
  }

  refreshPosts() {
    this.displayPostList = this.postsList.slice((this.pageNo - 1) * this.pageSize, (this.pageNo - 1) * this.pageSize + this.pageSize);
  }

  loadPosts() {
    this.store.dispatch(setLoader({ isLoading: true }));
    this.store.dispatch(loadPosts());
  }

  onRowClick(post: IPosts) {
    this.route.navigate([AppRoute.ROUTE_POSTS, post.id]);
  }

  userDetails(id: number) {
    this.route.navigate([AppRoute.ROUTE_USERS, id]);
  }
}
