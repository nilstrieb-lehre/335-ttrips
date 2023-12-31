# <img src="./docs/store-media/logo.png" style="height: 30px"> EasyTravel

![google_play_example.png](docs/store-media/google_play_example.png)

- Für den User optionales Login mit Firebase ✅
- Speichern von Orten in Firebase ✅
- Mit Magnetometer die Richtung zum Bahnhof anzeigen ✅
- Wetter API integrieren ❌
  - Wetter am Zielort anzeigen ❌
  - Orte mit bestimmten Wetter anzeigen ❌

## Trips suchen und starten

Mit Hilfe von der SBB Suche und den gespeicherten Orten kann man nach Trips suchen und diese
starten. Ausserdem kann man auch das Wetter benutzen, um die besten Zielorte zu finden.
Der aktuelle Ort wird auch verwendet.

## Während dem Trip

Die App begleitet einem dann auf dem Trip und zeigt die Richtung zum
Bahnhof und das Wetter an.

Vielleicht kann die App auch eine Warnung anzeigen, wenn man auf dem falschen Weg ist oder
eine Push-Notification, wenn man bald am Zielbahnhof ankommt.

## Sensoren

- GPS für aktuelle Position
- Magnetometer um die Richtung zum Bahnhof anzuzeigen

## Ressourcen

- [SBB API Beispiel](https://github.com/nilstrieb-lehre/java-frontend/blob/7be756328fad2aec5ecbe838c0dd86395f5f0bd8/5-fetching/src)
- [Kompass Beispiel](https://github.com/rahulhaque/compass-react-native-expo/blob/1bc2d906012f1026ae00f96994834c82d63c4081/App.js)

## Zielsysteme

Die App wurde für Android mit Dark Theme entwickelt, wurde aber auch erfolgreich mit dem
light theme auf Android und beiden Themes auf iOS getestet.
