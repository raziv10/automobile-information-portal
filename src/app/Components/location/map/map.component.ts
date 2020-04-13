import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../_common-services/base-service/base.service';
declare var ol: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map;
  private latitude: number;
  private longitude: number;
  private company: string;

  constructor(private service:BaseService) {
  }



  ngOnInit() {
    this.MapData();
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 18
      })
    });
    this.addPoint(this.latitude, this.longitude);
  }
MapData(){
    this.latitude = this.service.getLatitude();
    this.longitude = this.service.getLongitude();
    this.company = this.service.getCompany();
}
  setCenter() {
    const view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.addMarker(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(18);
  }

  addPoint(lat: number, lng: number) {
    const vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({

        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "assets/images/pin.png",
        }),

      })
    });
    const fonts = '18px Lucida Console';
    const textLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style:  new ol.style.Style({
        text: new ol.style.Text({
          text: this.company,
          font:fonts,

          offsetY: -25,
          fill: new ol.style.Fill({
            color: 'darkslategray',
          })
        }),
        stroke: new ol.style.Stroke({
          color:'black',
          width: 3.5
        })
      })
    });
    this.map.addLayer(vectorLayer);
    this.map.addLayer(textLayer);

  }
}
