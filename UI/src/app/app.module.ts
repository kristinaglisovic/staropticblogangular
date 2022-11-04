import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPostsComponent } from './admin/components/admin-posts/admin-posts.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminViewPostComponent } from './admin/components/admin-view-post/admin-view-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { AdminNavigationComponent } from './admin/components/admin-navigation/admin-navigation.component';
import { DashboardContentComponent } from './admin/components/dashboard-content/dashboard-content.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './auth/login/login.component';
import { AdminCategoriesComponent } from './admin/components/admin-categories/admin-categories.component';
import { AdminViewTagComponent } from './admin/components/admin-view-tag/admin-view-tag.component';
import { AdminTagsComponent } from './admin/components/admin-tags/admin-tags.component';
import { AddCategoryComponent } from './admin/components/admin-categories/add-category/add-category.component';
import { AddTagComponent } from './admin/components/admin-tags/add-tag/add-tag.component';
import { AdminViewUserComponent } from './admin/components/admin-view-user/admin-view-user.component';
import { AdminUsersComponent } from './admin/components/admin-users/admin-users.component';
import { AddUserComponent } from './admin/components/admin-users/add-user/add-user.component';
import { AdminCommentsComponent } from './admin/components/admin-comments/admin-comments.component';
import { AdminViewCategoryComponent } from './admin/components/admin-view-category/admin-view-category.component';
import { AddPostComponent } from './admin/components/admin-posts/add-post/add-post.component';
import { HomeComponent } from './home/home/home.component';
import { NavigationComponent } from './home/home/navigation/navigation.component';
import { PostComponent } from './home/home/post/post.component';
import { TruncatePipe } from './customPipe/truncate.pipe';
import { TagsComponent } from './home/home/tags/tags/tags.component';
import { CategoriesComponent } from './home/home/categories/categories/categories.component';
import { RecentPComponent } from './home/home/recentP/recent-p/recent-p.component';
import { ViewPostComponent } from './home/home/post/view-post/view-post.component';
import { CreateCommentComponent } from './home/home/post/view-post/create-comment/create-comment.component';
import { RegisterComponent } from './home/home/register/register/register.component';
import { SearchComponent } from './home/home/post/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminPostsComponent,
    AdminViewPostComponent,
    AdminComponent,
    AdminNavigationComponent,
    DashboardContentComponent,
    NotFoundComponent,
    LoginComponent,
    AdminCategoriesComponent,
    AdminViewCategoryComponent,
    AdminViewTagComponent,
    AdminTagsComponent,
    AddCategoryComponent,
    AddTagComponent,
    AdminViewUserComponent,
    AdminUsersComponent,
    AddUserComponent,
    AdminCommentsComponent,
    AddPostComponent,
    HomeComponent,
    NavigationComponent,
    PostComponent,
    TruncatePipe,
    TagsComponent,
    CategoriesComponent,
    RecentPComponent,
    ViewPostComponent,
    CreateCommentComponent,
    RegisterComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NgxNavbarModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
