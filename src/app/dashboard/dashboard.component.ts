import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import *  as  data from '../../assets/data.json';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.css'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
  userName = '';
  userDescription = '';
  userWebRef = '';
  public searchText: any = '';

  userList: any[] = [];
  isAllCheck: boolean;

  constructor(private router: Router,
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getAllLists();
  }

  public hasData() {
    return this.userList ? (this.userList != null && this.userList.length > 0) : false;
  }

  public close() {
    this.router.navigate(['/login']);
  }

  public closeAlert() {
    this.router.navigate(['/login']);
  }

  public getAllLists() {
    this.dashboardService
      .GetData()
      .subscribe((data) => {
        this.userList = data.data;
      }, error => {
        console.log('dashboardService getAllLists Call Failed. Status:'
          + error.status + ' Status Text:' + error.statusText);
      });
  }

  public allChange($event: any) {
    if ($event.srcElement.checked == true) {
      if (this.userList != null && this.userList.length > 0) {
        for (var i = 0; i < this.userList.length; i++) {
          this.userList[i].isActive = true;
        }
      }
    } else {
      if (this.userList != null && this.userList.length > 0) {
        for (var i = 0; i < this.userList.length; i++) {
          this.userList[i].isActive = false;
        }
      }
    }
  }

  public deleteRecord() {
    if (this.userList != null && this.userList.length > 0) {
      let index = -1;

      for (var i = 0; i < this.userList.length; i++) {
        index = i;
        if (this.userList[i].isActive == true) {
          this.userList.splice(index, 1);
          i = i - 1;
        }
      }
    }
    if (this.userList.length == 0) {
      this.isAllCheck = false;
    }
    alert("User deleted successfully.");
  }

  public addUser(name: string, description: string, webref: string) {
    let uId = 0;
    if (this.userList.length == 0) {
      uId = 1;
    } else {
      uId = this.userList.length + 1;
    }

    let user = {
      'id': uId,
      "name": name,
      "description": description,
      "webReference": webref,
      "isActive": 0
    };
    this.userList.push(user);

    this.userName = '';
    this.userDescription = '';
    this.userWebRef = '';
    alert("User added successfully.");
  }
}
