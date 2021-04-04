import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/Utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public sectionName: string;
  public activeSectionNumber: number;

  constructor(activatedRouter: ActivatedRoute,) {
    this.sectionName = activatedRouter.snapshot.params['sectionName'];
    this.activeSectionNumber = Utils.getSectionNumber(this.sectionName);
  }


}
