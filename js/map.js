
var distributionLocations = [
  {
    name: "Jordan",
    lat: 31.9632,
    lng: 35.9304,
    phone: "+962792317771",
  },
  {
    name: "Qatar",
    lat: 25.276987,
    lng: 51.2,
    phone: "+97450409081",
  },
  {
    name: "UAE",
    lat: 25.276987,
    lng: 55.296249,
    phone: "+971554491609",
  },
];
const map = L.map("map").setView([20, 5], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

var redIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

var bounds = new L.LatLngBounds();

distributionLocations.forEach(function (location) {
  var marker = L.marker([location.lat, location.lng], { icon: redIcon }).addTo(
    map
  );
  var popupContent = `
<b>${location.name}</b>
<p>    <strong>Phone:</strong> <a href="tel:${
    location.phone
  }" target="_blank">${location.phone}</a></p>

`;
  marker.bindPopup(popupContent);
  bounds.extend(marker.getLatLng());
});
map.fitBounds(bounds);

var style = document.createElement("style");
style.innerHTML = `
  .leaflet-marker-icon {
    filter: hue-rotate(356deg) saturate(2);
  }
`;
document.head.appendChild(style);

