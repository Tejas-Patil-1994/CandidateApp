import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  candidateList = [{ id: 11, name: 'Ash', department: 'Finance', joining_date: '8/10/2016' },
  { id: 12, name: 'John', department: 'HR', joining_date: '18/1/2011' },
  { id: 13, name: 'Zuri', department: 'Operations', joining_date: '28/11/2019' },
  { id: 14, name: 'Vish', department: 'Development', joining_date: '7/7/2017' },
  { id: 15, name: 'Barry', department: 'Operations', joining_date: '19/8/2018' },
  { id: 16, name: 'Ady', department: 'Finance', joining_date: '5/10/2014' },
  { id: 17, name: 'Gare', department: 'Development', joining_date: '6/4/2014' },
  { id: 18, name: 'Hola', department: 'Development', joining_date: '8/12/2010' },
  { id: 19, name: 'Ola', department: 'HR', joining_date: '7/5/2011' },
  { id: 20, name: 'Kim', department: 'Finance', joining_date: '20/10/2010' }];
  searchedText: string;
  candidateListCopy: any[];
  departmentList: any[];
  isAscending: boolean;
  constructor() {
    this.candidateListCopy = [...this.candidateList];
    this.isAscending = true;
    this.searchedText = '';
    this.getDistinctDepartments();
  }


  /**
   *Reset the table data
   *
   * @memberof AppComponent
   */
  onResetClick() {
    this.candidateList = [...this.candidateListCopy];
  }

  /**
   *Remove development candidates
   *
   * @memberof AppComponent
   */
  removeDevCandidates() {
    this.candidateList = this.candidateList.filter(candidate => candidate.department.toLowerCase() != 'development');
  }

  /**
   *Experience greater than 2 years
   *
   * @memberof AppComponent
   */
  onExpGreaterClick() {
    const seniorCandidate = [];
    const length = this.candidateList.length;
    const currentDate: any = new Date();
    for (let index = 0; index < length; index++) {
      const dates = this.candidateList[index].joining_date.split('/');
      const fullDate = dates[1] + '/' + dates[0] + '/' + dates[2];
      const candidateDate: any = new Date(fullDate);
      const diffTime = Math.abs(currentDate - candidateDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 730) {
        seniorCandidate.push(this.candidateList[index]);
      }
    }
    this.candidateList = seniorCandidate;
  }

  /**
   *To get distinct departments
   *
   * @memberof AppComponent
   */
  getDistinctDepartments() {
    this.departmentList = [];
    for (let index = 0; index < this.candidateList.length; index++) {
      const deptIndex = this.departmentList.findIndex(dept => dept.name === this.candidateList[index].department);
      if (deptIndex > -1) {
        this.departmentList[deptIndex].count = this.departmentList[deptIndex].count + 1;
      } else {
        this.departmentList.push({ name: this.candidateList[index].department, count: 1 })
      }
    }
  }

  /**
   *Sort candidates by property
   *
   * @param {string} property
   * @memberof AppComponent
   */
  sortCandiates(property: string) {
    this.isAscending = !this.isAscending;
    this.candidateList = this.candidateList.sort((first, second) => {
      if (property === 'joining_date') {
        const firstDate = first[property].split("/");
        const secondDate = second[property].split("/");
        const newFirstDate = new Date(Number(firstDate[2]), Number(firstDate[1]), Number(firstDate[0]));
        const newSecondDate = new Date(Number(secondDate[2]), Number(secondDate[1]), Number(secondDate[0]));
        return newFirstDate.getTime() > newSecondDate.getTime() ? (this.isAscending ? 1 : -1) : newFirstDate.getTime() < newSecondDate.getTime() ? (this.isAscending ? -1 : 1) : 0;
      }
      return first[property] > second[property] ? (this.isAscending ? 1 : -1) : first[property] < second[property] ? (this.isAscending ? -1 : 1) : 0;
    });
  }
}



