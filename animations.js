// Wenn der img-container in den Viewport kommt, soll die Animation starten

const imgContainer = document.querySelector(".img-wrapper");
const textParagraph = document.querySelector(".welcome-text-paragraph");
const textHeading = document.querySelector(".welcome-text-heading");
const keyPoints = document.querySelectorAll("[data-key]");
const keyPointsContainer = document.querySelector(".welcome-key-value");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                imgContainer.style.animation = "slide-in 1s ease-in-out";
                imgContainer.style.transform = "translate(0%, 0%)";
                imgContainer.style.opacity = "1";
            }, 500);
            setTimeout(() => {
                textHeading.style.animation = "fade-in 1s ease-in-out";
                textHeading.style.opacity = "1";
            }, 1000);
            setTimeout(() => {
                textParagraph.style.animation = "fade-in 1s ease-in-out";
                textParagraph.style.opacity = "1";
            }, 1300);
            setTimeout(() => {
                keyPointsContainer.style.animation = "expandX 1s ease-in-out";
                keyPointsContainer.style.width = "100%";
                keyPointsContainer.style.opacity = "1";
            }, 2000);
        }
    });
});

observer.observe(imgContainer);

const ACCENT = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
  || getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()
  || '#d41919';
const DURATION = 6000;          // Flugdauer in ms
const START_WHEN_VISIBLE = true; // false = sofort beim Laden starten
 
// Stützpunkte (grob entlang des Rheins) – hier beliebig anpassen
const waypoints = [
  [50.9375, 6.9603],  // Köln
  [50.7374, 7.0982],  // Bonn
  [50.5678, 7.2706],  // Linz am Rhein
  [50.3569, 7.5890],  // Koblenz
  [50.2310, 7.5898],  // Boppard
  [49.9669, 7.8996],  // Bingen
  [50.0417, 8.1200],  // Eltville
  [50.0710, 8.2408]   // Wiesbaden
];
 
// Catmull-Rom-Spline für eine weiche Kurve
function smooth(pts, steps = 24) {
  const out = [], p = [pts[0], ...pts, pts[pts.length - 1]];
  for (let i = 1; i < p.length - 2; i++) {
    for (let s = 0; s < steps; s++) {
      const t = s / steps, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(k =>
        0.5 * ((2 * p[i][k]) + (-p[i-1][k] + p[i+1][k]) * t +
        (2*p[i-1][k] - 5*p[i][k] + 4*p[i+1][k] - p[i+2][k]) * t2 +
        (-p[i-1][k] + 3*p[i][k] - 3*p[i+1][k] + p[i+2][k]) * t3)));
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}
 
const map = L.map('map', {
  zoomControl:false, dragging:false, scrollWheelZoom:false, doubleClickZoom:false,
  touchZoom:false, boxZoom:false, keyboard:false, attributionControl:true
});
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=cb1_49hk_1_6cfbb5b631a28599db40154f', {
  maxZoom:9,
  attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);
 
const path = smooth(waypoints);
map.fitBounds(L.latLngBounds(path), { padding:[50, 50] });
 
// Gesamtlänge + kumulierte Distanzen
const cum = [0];
for (let i = 1; i < path.length; i++) cum.push(cum[i-1] + map.distance(path[i-1], path[i]));
const total = cum[cum.length - 1];
 
// Hilfsfunktion: Punkt + Winkel bei Fortschritt f (0..1)
function at(f) {
  const d = f * total; let i = 1;
  while (i < cum.length - 1 && cum[i] < d) i++;
  const k = (d - cum[i-1]) / (cum[i] - cum[i-1] || 1);
  const a = path[i-1], b = path[i];
  const pos = [a[0] + (b[0]-a[0]) * k, a[1] + (b[1]-a[1]) * k];
  const pa = map.latLngToLayerPoint(a), pb = map.latLngToLayerPoint(b);
  return { pos, angle: Math.atan2(pb.y - pa.y, pb.x - pa.x) * 180 / Math.PI };
}
 
// Marker
const cityIcon = n => L.divIcon({ className:'', html:`<div class="city" style="transform:translate(14px,-8px)">${n}</div>`, iconSize:[0,0] });
const pinIcon = L.divIcon({ className:'', html:'<div class="pin"></div>', iconSize:[14,14], iconAnchor:[7,7] });
[[waypoints[0], ''], [waypoints[waypoints.length-1], 'Wiesbaden']].forEach(([ll, n]) => {
  L.marker(ll, { icon:pinIcon }).addTo(map);
  L.marker(ll, { icon:cityIcon(n) }).addTo(map);
});
 
// Route (Hintergrund gestrichelt, Fortschritt durchgezogen)
L.polyline(path, { color:ACCENT, weight:2, opacity:.3, dashArray:'4 8' }).addTo(map);
const trail = L.polyline([], { color:ACCENT, weight:3 }).addTo(map);
 
const planeSvg = '<svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" transform="rotate(90 12 12)"/></svg>';
const plane = L.marker(path[0], {
  icon: L.divIcon({ className:'plane', html:`<div id="pl" style="width:28px;height:28px display: none;"${planeSvg}</div>`, iconSize:[28,28], iconAnchor:[14,14] }),
  interactive:false, zIndexOffset:1000
}).addTo(map);
 
function draw(f) {
  const { pos, angle } = at(f);
  document.getElementById('pl').style.transform = `rotate(${angle}deg)`;
  const n = path.findIndex((_, i) => cum[i] >= f * total);
  trail.setLatLngs([...path.slice(0, Math.max(n, 1)), pos]);
}
 
function run() {
  const t0 = performance.now();
  (function frame(now) {
    const x = Math.min((now - t0) / DURATION, 1);
    const eased = x < .5 ? 2*x*x : 1 - Math.pow(-2*x + 2, 2) / 2; // ease in-out
    draw(eased);
    if (x < 1) requestAnimationFrame(frame);
  })(t0);
}
 
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  draw(1);
} else if (START_WHEN_VISIBLE) {
  new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { run(); o.disconnect(); } }, { threshold:.5 })
    .observe(document.getElementById('map'));
} else {
  run();
}