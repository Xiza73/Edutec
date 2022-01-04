import { Component, OnInit } from '@angular/core';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-institution-detail',
  templateUrl: './institution-detail.component.html',
  styleUrls: ['./institution-detail.component.scss']
})
export class InstitutionDetailComponent implements OnInit {

  faFacebook = faFacebook;
  faTwitter= faTwitter;
  faInstagram = faInstagram;
  constructor() { }

  ngOnInit(): void {
  }

}
