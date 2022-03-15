const map = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-1.470613878850286, 50.938115842393984]),
      zoom: 17,
    }),
  });
  
  const iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 46],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: "assets/img/mapbox-marker-icon-20px-orange.png",
    }),
  });
  
  const layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [
        new ol.Feature({
          geometry: new ol.geom.Point(
            ol.proj.fromLonLat([-1.470613878850286, 50.938115842393984])
          ),
        }),
      ],
    }),
    style: iconStyle,
  });
  
  map.addLayer(layer);
  
  const container = document.getElementById("popup");
  const content = document.getElementById("popup-content");
  const closer = document.getElementById("popup-closer");
  
  const overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });
  map.addOverlay(overlay);
  
  closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };
  
  map.on("singleclick", function (event) {
    console.log(event);
    if (map.hasFeatureAtPixel(event.pixel) === true) {
      const coordinate = event.coordinate;
  
      content.innerHTML =
        "<b>Ordnance Survey Limited</b> <br>Explorer House <br>Adanac Drive <br>Nursling <br>Southampton <br>SO16 0AS";
      overlay.setPosition(coordinate);
    } else {
      overlay.setPosition(undefined);
      closer.blur();
    }
  });