import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Employee } from '../employee';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  public employeeDetails: Employee[] = [];
  dataService: any;
  router: any;

  constructor(
    private httpService: HttpService    ) {
  }

  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(response => {
      this.employeeDetails = response;
      console.log(this.employeeDetails);
    }); 
  }

   update(employee: Employee): void {
    this.dataService.changeEmployee(employee);
    this.router.navigateByUrl('/add/' + employee)
  }


  remove(employeeId: number): void {
    this.httpService.deleteEmployeeData(employeeId).subscribe(response=> console.log(response));
  }
}