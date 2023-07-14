# Testfälle

## 1. Verbindung

1. App öffnen
2. Auf New Trip gehen
3. From Winterthur
4. **Wenn Winterthur ausgewählt sollte automatisch auf "To" Feld fokussieren**
5. To Bern
6. Wieder To Feld auswählen
7. **To Feld sollte automatisch geleert werden**
8. To Schaffhausen
9. Erste Verbindung auswählen
10. **Es sollte einen redirect auf die "Current trip" Seite geben**
11. **Es sollte ein Kompass erscheinen**
12. **Der Zug auf dem Kompass sollte richtung Bahnhof Winterthur zeigen**
13. **Unter dem Kompass sind die beiden Bahnhöfe Winterthur und Schaffhausen**
14. **Winterthur ist rot**
15. Warten bis der Zug losfährt
16. **Der Strich zwischen Winterthur und Schaffhausen ist rot**

## Accounts

1. Auf Settings gehen
2. Falls noch eingeloggt auf ausloggen drücken
3. **Login Fenster erscheint**
4. Eine E-Mail eingeben, die nicht existiert
5. Zufälliges 3-Zeichen Passwort eingeben
6. Auf Login drücken
7. **Invalid username or password erscheint**
8. Auf Create Account drücken
9. **Invalid password erscheint**
10. Sicheres Passwort wählen
11. Auf Create Account drücken
12. **Login Erfolgreich, Account settings erscheinen**
13. Auf Add New drücken
14. Schaffhausen eintragen
15. Auf New Trip gehen
16. **Bei To erscheint Schaffhausen mit einem Stern daneben**
17. Zurück auf Settings
18. Schaffhausen löschen
19. **Schaffhausen verschwindet von der Seite**
20. Auf New Trip gehen
21. **Bei To erscheint Schaffhausen nicht mehr**
