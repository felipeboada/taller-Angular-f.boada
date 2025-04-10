import { Component, OnInit } from '@angular/core';
import { Serie } from '../serie';
import { SeriesService } from '../series.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-series-list',
  imports: [CommonModule],
  templateUrl: './series-list.component.html',
  styleUrl: './series-list.component.css'
})
export class SeriesListComponent implements OnInit {
  series: Serie[] = [];
  averageSeasons: number = 0;

  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
      this.seriesService.getSeries().subscribe(series => {
        this.series = series;
        this.averageSeasons = this.calcularAverage(series);
      })
  }

  calcularAverage(series: Serie[]): number {
      const totalSeasons = series.reduce((sum, serie) => sum + serie.seasons, 0);
      return totalSeasons / series.length;
  }

}
