import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-individual-statistics',
  templateUrl: './individual-statistics.component.html',
  styleUrls: ['./individual-statistics.component.css'],
})
export class IndividualStatisticsComponent implements OnInit {
  basicData: any;
  data: any;
  basicOptions: any;

  multiAxisData: any;

  chartOptions: any;

  constructor() {}

  ngOnInit(): void {
    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 200],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D'],
        },
      ],
    };

    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#e81e91',
          data: [65, 59, 80, 81, 56, 55 ],
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#FFA726',
          data: [28, 48, 40, 19, 86, 27],
        },
      ],
    };

    this.multiAxisData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Dataset 1',
          backgroundColor: [
            '#EC407A',
            '#AB47BC',
            '#42A5F5',
            '#7E57C2',
            '#66BB6A',
            '#FFCA28',
          ],
          yAxisID: 'y',
          data: [65, 59, 80, 81, 56, 55],
        },
        {
          label: 'Dataset 2',
          backgroundColor: '#19d448',
          yAxisID: 'y1',
          data: [28, 48, 40, 19, 86, 27],
        },
      ],
    };
  }
  applyDarkTheme() {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#e81e91',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
        y: {
          ticks: {
            color: '#ebedef',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
      },
    };
  }

  applyLightTheme() {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }
}
