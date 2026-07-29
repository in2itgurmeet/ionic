import { Component, AfterViewInit, Input, OnDestroy, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() pickupAddress: string = '';
  @Input() deliveryAddress: string = '';
  @Input() showDirections: boolean = false;

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  private map: L.Map | undefined;
  private routingLayer: L.Polyline | undefined;
  private markers: L.Marker[] = [];
  directions: any[] = [];

  constructor(private http: HttpClient) {
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';

    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && (changes['pickupAddress'] || changes['deliveryAddress'])) {
      this.loadRoute();
    }
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement).setView([28.6279, 77.3666], 10); // Default Noida

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Fix map rendering issues in Ionic by invalidating size after a short delay
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 500);

    this.loadRoute();
  }

  private async loadRoute() {
    if (!this.map || !this.pickupAddress || !this.deliveryAddress) {
      return;
    }

    try {
      const pickupCoords = await this.geocode(this.pickupAddress);
      const deliveryCoords = await this.geocode(this.deliveryAddress);

      this.clearMap();

      if (pickupCoords) {
        const pMarker = L.marker([pickupCoords.lat, pickupCoords.lon]).addTo(this.map)
          .bindPopup('Pickup: ' + this.pickupAddress);
        this.markers.push(pMarker);
      }

      if (deliveryCoords) {
        const dMarker = L.marker([deliveryCoords.lat, deliveryCoords.lon]).addTo(this.map)
          .bindPopup('Delivery: ' + this.deliveryAddress);
        this.markers.push(dMarker);
      }

      if (pickupCoords && deliveryCoords) {
        // Fit bounds to both
        const bounds = L.latLngBounds([
          [pickupCoords.lat, pickupCoords.lon],
          [deliveryCoords.lat, deliveryCoords.lon]
        ]);
        this.map.fitBounds(bounds, { padding: [50, 50] });

        // Fetch route from OSRM (Using FOSSGIS routing server which has better CORS/Rate limits)
        const url = `https://routing.openstreetmap.de/routed-car/route/v1/driving/${pickupCoords.lon},${pickupCoords.lat};${deliveryCoords.lon},${deliveryCoords.lat}?overview=full&geometries=geojson&steps=true`;
        this.http.get(url).subscribe({
          next: (res: any) => {
            if (res.code === 'Ok' && res.routes.length > 0) {
              const route = res.routes[0];
              const coordinates = route.geometry.coordinates.map((coord: any[]) => [coord[1], coord[0]]); // GeoJSON is [lon, lat]

              this.routingLayer = L.polyline(coordinates, { color: '#3880ff', weight: 5, opacity: 0.7 }).addTo(this.map!);

              if (this.showDirections && route.legs && route.legs[0].steps) {
                this.directions = route.legs[0].steps.map((step: any) => ({
                  instruction: step.maneuver?.modifier
                    ? `${step.maneuver.type} ${step.maneuver.modifier} onto ${step.name || 'unnamed road'}`
                    : `${step.maneuver?.type} on ${step.name || 'unnamed road'}`,
                  distance: (step.distance / 1000).toFixed(2) + ' km'
                }));
              }
            } else {
              console.warn('OSRM returned no routes');
            }
          },
          error: (err) => {
            console.error('OSRM route fetch failed', err);
          }
        });
      } else if (pickupCoords) {
        this.map.setView([pickupCoords.lat, pickupCoords.lon], 13);
      } else if (deliveryCoords) {
        this.map.setView([deliveryCoords.lat, deliveryCoords.lon], 13);
      }

    } catch (err) {
      console.error('Error loading route', err);
    }
  }

  private async geocode(address: string): Promise<{ lat: number, lon: number } | null> {
    const tryGeocode = async (query: string) => {
      try {
        const res: any = await this.http.get(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1`).toPromise();
        if (res && res.features && res.features.length > 0) {
          const coords = res.features[0].geometry.coordinates; // [lon, lat]
          return {
            lat: coords[1],
            lon: coords[0]
          };
        }
        return null;
      } catch (err) {
        return null;
      }
    };

    if (!address) return null;

    let result = await tryGeocode(address);
    if (result) return result;

    console.warn(`Exact geocode failed for "${address}". Trying fallback...`);

    const parts = address.split(',').map(p => p.trim()).filter(p => p.length > 0);
    if (parts.length > 1) {
      const fallbackQuery = parts.slice(-2).join(', ');
      result = await tryGeocode(fallbackQuery);
      if (result) return result;
    }

    if (parts.length > 0) {
      const fallbackQuery = parts[parts.length - 1];
      result = await tryGeocode(fallbackQuery);
      if (result) return result;
    }

    console.warn(`All geocoding fallbacks failed for "${address}".`);
    return null;
  }

  private clearMap() {
    if (this.routingLayer) {
      this.map?.removeLayer(this.routingLayer);
      this.routingLayer = undefined;
    }
    this.markers.forEach(m => this.map?.removeLayer(m));
    this.markers = [];
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
