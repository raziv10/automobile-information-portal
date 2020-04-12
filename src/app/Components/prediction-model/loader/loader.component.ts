import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(  private dialog: MatDialogRef<any>,
                ) { }

  ngOnInit() {
    this.jquery();
    setTimeout(()=>{
      this.dialog.close('true');
    },8400);

  }
  jquery() {
    /* set radius for all circles */
    const r = 250;
    const circles = document.querySelectorAll('.circle');
    const totalCircles = circles.length;
    for (let i = 0; i < totalCircles; i++) {
      circles[i].setAttribute('r', '250');
    }
    /* set meter's wrapper dimension */
    const meterDimension = r * 2 + 100;

    /* add strokes to circles  */
    const cf = 2 * Math.PI * r;
    const semiCf = cf / 2;
    const semiCf1by3 = semiCf / 3;
    const semicf2by3 = semiCf1by3 * 2;
    document
      .querySelector('#outline_curves')
      .setAttribute('stroke-dasharray', semiCf + ',' + cf);
    document
      .querySelector('#low')
      .setAttribute('stroke-dasharray', semiCf + ',' + cf);
    document
      .querySelector('#avg')
      .setAttribute('stroke-dasharray', semicf2by3 + ',' + cf);
    document
      .querySelector('#high')
      .setAttribute('stroke-dasharray', semiCf1by3 + ',' + cf);
    document
      .querySelector('#outline_ends')
      .setAttribute('stroke-dasharray', 2 + ',' + (semiCf - 2));
    document
      .querySelector('#mask')
      .setAttribute('stroke-dasharray', semiCf + ',' + cf);
    /*bind range slider event*/
    const slider = document.querySelector('#slider');
    const lbl = document.querySelector('#lbl');
    const mask = document.querySelector('#mask');

    const meterneedle =  document.getElementById('#meter_needle') as HTMLElement;
    const percent = 100;
    const meterValue = semiCf - (percent * semiCf) / 100;
    mask.setAttribute('stroke-dasharray', meterValue + ',' + cf);
  }


}
