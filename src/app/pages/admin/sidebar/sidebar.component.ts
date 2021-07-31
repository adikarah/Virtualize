import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentPage = [1, 0, 0, 0, 0];
  constructor() { }

  ngOnInit(): void {
  }

  onClickCurrentPage(data: number) {
    this.currentPage = [0, 0, 0, 0, 0];
    this.currentPage[data] = 1;
  }
}
