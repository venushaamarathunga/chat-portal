import { Component, OnInit } from '@angular/core';
import { ServiceDataService } from '../shared/service-data/service-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName: object;
  constructor(private repo: ServiceDataService, private router: Router) {

    const url = 'user/userProfile';
    this.repo.getData(url).subscribe(
      res => {
        this.userName = res;
      }
    );
  }

  ngOnInit() {
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['home']);
  }
}
