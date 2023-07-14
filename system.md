# Dokumentation

## Anleitung

Der Aufbau der App besteht aus zwei Hauptteilen. Der Übersicht über die aktuelle
Reise und die Auswahl einer neuen Reise. Wenn man eine neue Reise antreten will,
muss man auf den "New Trip" Tab gehen und da bei From und To den Start- und Zielort
angeben. Danach kann man eine Verbindung auswählen und wird auf den "Current trip"
Tab weitergeleitet.

In den Settings kann man sich einloggen und die vordefinierten Orte festlegen, die man
dann bei der Ortssuche ganz einfach auswählen kann.

## Persistenz-Lösung

Wir nutzen zwei Arten von Persistenz:

- AsyncStorage für die aktuelle Reise
- Firebase für die Settings

Wir haben den AsyncStorage für die Reise benutzt, da es ausreicht.
Die Reise muss nicht in der Cloud gespeichert werden, da sie sowieso nicht lange
gebraucht wird.

Für die Settings hätte sich der AsyncStorage auch sehr gut geeignet, wir haben uns
aber für Firebase entschieden, um das mit dem Login-System zu integrieren.

## Sensoren

Es werden zwei Sensoren verwendet: Magnetometer und GPS. Der Kompass nutzt den
Magnetometer, um sich korrekt auszurichten. GPS wird für den Kompass zum Berechnen
der Richtung und zum Bestimmen der aktuellen Position um einen Bahnhof in der Nähe
zu finden.

## Netzwerkservice

Wir verwenden die OpenData Transport API für die SBB-Integration. Ausserdem verwenden
wir Firebase für das Login-System und das Speichern der Settings.

## Implementation

2 Kontexts für current trip und user credentials. Für die 3 Tabs
jeweils separate Komponenten. Die predefined locations sind über die
Firebase Realtime Database synchronisiert.
