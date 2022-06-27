import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResultModel } from '../teacher-dashboard/teacher-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  showResult = false;

  studentFormValue !: FormGroup;

  resultModelObj: ResultModel = new ResultModel();

  studentResultData : any;

  constructor(private formBuilder : FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.studentFormValue = this.formBuilder.group({
      rollNo: [''],
      dob: [''],
    })
  }

  findResult(){

    // console.log(this.studentFormValue.value.dob);
    // console.log(this.studentFormValue.value.rollNo);

    if(this.studentFormValue.value.rollNo == "" || this.studentFormValue.value.dob==""){
      alert("All fields are required");
      return;
    }

    this.resultModelObj.rollNo = this.studentFormValue.value.rollNo;
    this.resultModelObj.dob = this.studentFormValue.value.dob;

    this.api.getResults()
    .subscribe(res => {
      this.studentResultData = res.filter((x: ResultModel) => x.rollNo == this.resultModelObj.rollNo && x.dob == this.resultModelObj.dob)
      console.log(this.studentResultData);

      if(this.studentResultData.length!=0){
        this.showResult = true;
      }
      else{
        alert("Invalid credentials");
      }
      
    })

    

  }


}
