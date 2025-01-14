// Initialisiere die Karte
const map = L.map('map').setView([43.942, 12.457], 13);
// Füge eine OpenStreetMap-Kachel hinzu
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);
// Funktion, um die nächste Gemeinde anzuzeigen
let currentGemeindeIndex = 0;
const gemeinden = []; // Hier werden die Namen der Gemeinden gespeichert
function showNextGemeinde() {
    const gemeinde = gemeinden[currentGemeindeIndex];
    document.getElementById('gemeinde-name').textContent = gemeinde;
}
// Lade die GeoJSON-Daten
fetch('export.geojson_SM.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                // Speichere den Namen der Gemeinde
                gemeinden.push(feature.properties.name);
                // Füge einen Klick-Listener hinzu
                layer.on('click', function () {
                    if (feature.properties.name === gemeinden[currentGemeindeIndex]) {
                        alert('Richtig!');
                        currentGemeindeIndex = (currentGemeindeIndex + 1) % gemeinden.length;
                        showNextGemeinde();
                    } else {
                        alert('Falsch, versuche es erneut!');
                    }
                });
            }
        }).addTo(map);
        // Starte das Spiel
        showNextGemeinde();
    })
    .catch(error => console.error('Fehler beim Laden der GeoJSON-Daten:', error));
