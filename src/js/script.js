const map = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(), // open street map base map
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-1.470613878850286, 50.938115842393984]), // update location to ordnance survey office address
      zoom: 17, 
    }),
  });
  
  const iconStyle = new ol.style.Style({ // change icon to orange marker so stands out better
    image: new ol.style.Icon({
      anchor: [0.5, 46],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: "assets/img/mapbox-marker-icon-20px-orange.png",
    }),
  });
  
  const layer = new ol.layer.Vector({ // vector layer that holds the point
    source: new ol.source.Vector({
      features: [
        new ol.Feature({
          geometry: new ol.geom.Point(
            ol.proj.fromLonLat([-1.470613878850286, 50.938115842393984]) // coordinates for explorer house
          ),
        }),
      ],
    }),
    style: iconStyle,
  });
  
  map.addLayer(layer); 
  
  const container = document.getElementById("popup"); // get pop up box
  const content = document.getElementById("popup-content");
  const closer = document.getElementById("popup-closer");
  
  const overlay = new ol.Overlay({ // create overlay
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });
  
  map.addOverlay(overlay); // add overlay to map
  
  closer.onclick = function () { // click on X to close
    overlay.setPosition(undefined); // hide pop up
    closer.blur();
    return false;
  };
  
  map.on("singleclick", function (event) { //click on map if feature exists at coordinates then open pop up 
    console.log(event);
    if (map.hasFeatureAtPixel(event.pixel) === true) {
      const coordinate = event.coordinate;
  
      content.innerHTML =
        "<b>Ordnance Survey Limited</b> <br>Explorer House <br>Adanac Drive <br>Nursling <br>Southampton <br>SO16 0AS"; // set pop up content
      overlay.setPosition(coordinate);
    } else {
      overlay.setPosition(undefined);
      closer.blur();
    }
  });