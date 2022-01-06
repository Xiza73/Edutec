import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InstitutionService } from 'src/app/data/services/institution.service';

@Component({
  selector: 'app-institution-search',
  templateUrl: './institution-search.component.html',
  styleUrls: ['./institution-search.component.scss']
})
export class InstitutionSearchComponent implements OnInit {
  faInstitution= faUniversity;
  total=-1;
  institutions:any[]=[];
  
  
 // Form
  form: FormGroup = this.fb.group({
    name: ['']
  });
  

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private institutionService: InstitutionService,
    
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.institutionService.readInstitutions('', 'start', '-1').subscribe(
      response => {
        this.institutions = response.data.slice(0, 4);
        this.spinner.hide();
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  findInstitution(): void {
    }

}

