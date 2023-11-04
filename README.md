# Webshop

Planen med denna repo:n är att bygg en webshop. Detta är även en del mitt GA.

## stack

- MongoDB _(databas)_
- Tailwind _(styling)_
- NextUI _(komponent bibliotek)_
- Next.js _(ramverk)_
- Redux toolkit _(state managment)_

## Todo + notes

Spara jwt i cookies istället för localstorage. coockies sparas på clienten så samma sätt som localstorage, men skillnaden är att cookies automatiskt skickas med till domänen när clienten ber efter den.

fördelen med att spara jwt i cookies är att jag då hade kunnat skydda admin dashboarden med en server-component.

Både rditing och upladdning av items bör gå genom en komponent, då blir det mycket enklare.

CP-prestanda planen:
Kör isg på hem-sidan, hela skiten blir bara enkel html. problemet blir blir då att favs och cart info tappas, men det kan man faktiskt använda local storage till, sen då och då fetcha den ifrån databasen bara för att överenstämma med lokala grejer

- [ ] Skapa admin panel

  - [ ] FIX CRITICAL BUG att logginen inte gör ett skit typ, vette fan. ändå om man inloggad så tas inte cart infot ifrån inloggen, utan fortsätter att tas ifråg guestCarten, ingen aning vad det kan vara
  - [ ] fixa cartcount i röda pricken, döp om variablerna också lol, det e kaos
  - [ ] Fixa så att api routsen är mer logiska typ, det är _inte_ RESTFUL atm
  - [ ] lägg till så att man kan kolla på alla användare
  - [ ] lägg till så att man kan kolla inkomande order
  - [x] Fixa så onödiga api requests i admin panalen
  - [x] Byt ut drilling i admin panelen till context api
  - [x] Skapa log-in med bcrypt
  - [x] Lägga till items till db (brandName, productName, image, price, category)
  - [x] Ta bort items från db
  - [x] Redigera items

- [ ] Lägg till reset password (behöver först hitta en bra email-provider)
- [ ] Lägg till hur många det finns i lagert
- [ ] Lägg till så att man kan filter mellan kategorier och märken och pris mm
- [ ] Lägg till så att man kan betala och lägga order, och få order nummer
- [ ] Lägg till recensioner
- [x] Lägg till kundvagn
- [x] Lägg till sök funktion
- [x] Lägg till "favoriter"
- [x] Lägg till förmåga att "inspektera" objekt
- [x] SERCURITY : verify jwt bruhhhh

- [ ] Fixa bug där favorite staten inte sparas, för att återskapa: tabort/lägg-till favorite gå till view-account, gå tillbaka till hemskärmen,

- [x] Setup stack
- [x] Setup DB
- [x] Setup env
- [x] Skapa cards
