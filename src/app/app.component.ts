import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { HitsService } from './hits.service';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ankit-ai-test';
  displayedColumns: string[] = ['title', 'url', 'created_at', 'author'];
  dataSource: any
  interval: any

  constructor(public dialog: MatDialog, public hitsService: HitsService) { }

  /* To call function initial*/
  ngOnInit() {
    this.getData();
    this.setNewInterval();
  }

  /* To clear interval*/
  ngOnDestory() {
    clearInterval(this.interval)
  }

  /* To get polls gata using api through service*/
  getData() {
    this.hitsService.getHits()
      .subscribe((data: {}) => {
        this.dataSource = new MatTableDataSource(data['hits']);
        this.setfilterPredicate();
      });
  }

  /* Search functionality on title*/
  setfilterPredicate() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.title.toLowerCase().includes(filter);
    };
  }

  /*Column value set to apply filter functionality */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /* to set new interval */
  setNewInterval() {
    this.interval = setInterval(() => { this.getData(); }, 10000)
  }

  /* To open dialog */
  openDialog(rowData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: rowData
    });
    dialogRef.afterClosed();
  }

}