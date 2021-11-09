import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Employee } from '../employee';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public employee: Employee = new Employee;
  public employeeFormGroup!: FormGroup;

  departments: Array<any> = [
    {
      name: "HR",
      value: "HR"
    },
    {
      name: "Sales",
      value: "Sales"
    },
    {
      name: "Finance",
      value: "Finance"
    },
    {
      name: "Engineer",
      value: "Engineer"
    },
    {
      name: "Other",
      value: "Other"
    }
  ]
  api: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
    ) {
    this.employeeFormGroup = this.formBuilder.group({
      name: new FormControl(''),
      profilePic: new FormControl(''),
      gender: new FormControl(''),
      department: this.formBuilder.array([], [Validators.required]),
      salary: new FormControl(''),
      startDate: new FormControl(''),
      note: new FormControl('') 
    })
   }

   ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['id'] != undefined) {
      this.dataService.currentEmployee.subscribe(employee=>{
        if(Object.keys(employee).length !== 0) {
          this.employeeFormGroup.get('name')?.setValue(employee.name);
        }
      });
    }
    
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
  
  salary: number = 400000;
  updateSetting(event: any) {
    this.salary = event.value;
  }

  onSubmit(): void {
    this.employee = this.employeeFormGroup.value;
    this.httpService.addEmployeeData(this.employee).subscribe(response=> {
      console.log(response);
    });
  }
}