import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;
  private centroid: L.LatLngExpression = [42.3601, -71.0589];

  private initMap(): void {
    this.map = L.map('map').setView(this.centroid, 20);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  private addMarker(): void {
    this.marker = L.marker(this.centroid).addTo(this.map!);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initMap();
    this.addMarker();
  }
}
