import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResultModel } from './teacher-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  isRollNoExist = false;

  formValue !: FormGroup;

  resultModelObj: ResultModel = new ResultModel();

  resultData !: any;

  constructor(private formBuilder : FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      rollNo: [''],
      name: [''],
      dob: [''],
      score: ['']
    })

    this.getAllResults();
  }


  postResult(){

    if(this.formValue.value.rollNo == "" || this.formValue.value.name == "" || this.formValue.value.dob=="" || this.formValue.value.score == ""){
      alert("All fields are required");
      return;
    }

    this.resultData.forEach((element: ResultModel) => {
      if(element.rollNo == this.formValue.value.rollNo){
        this.isRollNoExist = true;            
      }
    });

    if(this.isRollNoExist){
      alert("Roll no. already exist"); 
      this.isRollNoExist = false;
      return;
    }

    this.resultModelObj.rollNo = this.formValue.value.rollNo;
    this.resultModelObj.name = this.formValue.value.name;
    this.resultModelObj.dob = this.formValue.value.dob;
    this.resultModelObj.score = this.formValue.value.score;




    this.api.postResult(this.resultModelObj)
    .subscribe(res => {
      console.log(res);
      alert("Result added successfully");
      let ref= document.getElementById("cancel");
      ref?.click();
      this.formValue.reset();
      this.getAllResults();
    },
    err => {
      alert("Something went wrong");
    }
    )

  }


  getAllResults(){
    this.api.getResults()
    .subscribe((res) => {
      this.resultData = res;
      console.log(this.resultData);
      this.resultData.sort(function ( a:ResultModel, b:ResultModel) {
        return (a.rollNo > b.rollNo ? 1 : -1);
      });
    })
  }

  deleteResult(row: any){
    this.api.deleteResult(row.id)
    .subscribe(res => {
      alert("Record deleted");
      this.getAllResults();
    })
  }

  onEdit(row: any){
    this.resultModelObj.id = row.id;
    this.formValue.controls['rollNo'].setValue(row.rollNo);
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['dob'].setValue(row.dob);
    this.formValue.controls['score'].setValue(row.score);

  }

  updateResult(){
    if(this.formValue.value.rollNo == "" || this.formValue.value.name == "" || this.formValue.value.dob=="" || this.formValue.value.score == ""){
      alert("All fields are required");
      return;
    }
    
    this.resultModelObj.rollNo = this.formValue.value.rollNo;
    this.resultModelObj.name = this.formValue.value.name;
    this.resultModelObj.dob = this.formValue.value.dob;
    this.resultModelObj.score = this.formValue.value.score;


    this.api.updateResult(this.resultModelObj, this.resultModelObj.id)
    .subscribe(res => {
      console.log(res);
      alert("Updated successfully");
      let ref= document.getElementById("close");
      ref?.click();
      this.formValue.reset();
      this.getAllResults();
    }
    )

  }


}
