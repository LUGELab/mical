import { Component, OnInit } from '@angular/core';
import mbx from 'mapbox-gl/dist/mapbox-gl.js';

@Component({
  selector: 'app-map-holder',
  templateUrl: './map-holder.component.html',
  styleUrls: ['./map-holder.component.css']
})
export class MapHolderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    mbx.accessToken = 'pk.eyJ1IjoidnBpbmVkYTE5OTYiLCJhIjoiNWRmYjcxNTQyODFmNGM1MTJkMjg3OGQ3ODcyZDA5MTUifQ.l8nQjhBq_mmCrZ9mWDv9Yw';
    var map = new mbx.Map({
      container: 'dynamicMap',
      style: 'mapbox://styles/mapbox/streets-v10'
    });
  }

}
