import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {HistogramDefinition} from '../../viz/model/Histogram';
import {ColorProviderService} from '../../services/color-provider.service';
import { DataProviderService } from 'src/app/services/data-provider.service';
import {map} from 'rxjs/operators';
import {RowData} from '../../model/datatypes';
import {Observable} from 'rxjs';




@Component({
  selector: 'app-graphics-holder',
  templateUrl: './graphics-holder.component.html',
  styleUrls: ['./graphics-holder.component.css']
})
export class GraphicsHolderComponent implements OnInit {

  @Input()
  topOffset = 0;
  @Input()
  bottomOffset = 0;

  myHistDef$: Observable<HistogramDefinition>;

  constructor(
    private dataProvider: DataProviderService,
    public colorProvider: ColorProviderService) {
    this.setupData();
  }

  ngOnInit() {

  }

  // TODO: vpineda setup datasetProvider to get us the datasets that we are interested on
  setupData(): void {
    let parseFn = (rows: Array<RowData>) => {
      let datasetsData: {[studyID: string]: [number[], string[]]} = {};
      rows.forEach((row) => {
        if (datasetsData[row.studyID] === undefined) {
          datasetsData[row.studyID] = [[], []];
        }
        datasetsData[row.studyID][0].push(row.sampleSize);
        datasetsData[row.studyID][1].push(Math.round(row.effectSize * 10).toString());
      });

      let ds = Object.keys(datasetsData).reduce((acc: any[], next) => {
        acc.push({
          label: next,
          backgroundColor: this.colorProvider.getColoursFillStartingAtIndex(0, rows.length),
          data: datasetsData[next][0],
          borderColor: this.colorProvider.getColoursStartingAtIndex(0, rows.length),
          borderWidth: 1,
        });
        return acc;
      }, []);
      return {
        datasets: ds,
        buckets:datasetsData[Object.keys(datasetsData)[0]][1]
      };
    };

    this.myHistDef$ = this.dataProvider.getData().pipe(
      map(parseFn)
    )
  }

}
