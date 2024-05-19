class Map {
  constructor (lat, long) {
    this.control = undefined
    this.lat = lat
    this.long = long
    this.map = {}
    this.icon = new L.divIcon({
      className: 'icon', 
      html: '',
      iconSize: [32, 32],
      iconAnchor: new L.Point(16, 0)
    })

    this.init()

    if (this.lat && this.long) {
      this.visit(this.lat, this.long)
    }
  }

  init () {
    this.map = L.map('map').setView([40.4, -3.7], 10);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}' + (L.Browser.retina ? '@2x.png' : '.png'), {
      attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
      minZoom: 0
    }).addTo(this.map)

    this.map.zoomControl.setPosition('topright');

    L.Control.Watermark = L.Control.extend({
      onRemove: () => {
      },
      onAdd: (map)  => {
        let div = L.DomUtil.create('div', 'Boom')
        L.DomEvent.on(div, 'click', () => {
          map.setView([40, -3], 6, { animate: true, easeLinearity: .5, duration: 0.500 })
        })
        return div
      }
    });

    let Control = function(opts) {
      return new L.Control.Watermark(opts);
    }
  }

  visit (lat, lng) {
    let latlng= { lat, lng }

    if (!this.marker) {
      this.marker = L.marker(latlng, { icon: this.icon })
    } else {
      this.marker.setLatLng(latlng)

    }

    this.map.setView(this.marker.getLatLng(), 17, { animate: true, easeLinearity: .5, duration: 0.850 });
    this.map.addLayer(this.marker)
  }
}

