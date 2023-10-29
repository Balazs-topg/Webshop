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

- [ ] Skapa admin panel

  - [ ] Byt ut drilling i admin panelen till context api
  - [ ] Fixa så onödiga api requests i admin panalen
  - [ ] Fixa så att api routsen är mer logiska typ, det är _inte_ RESTFUL atm
  - [ ] lägg till så att man kan kolla på alla användare
  - [ ] lägg till så att man kan kolla inkomande order
  - [x] Skapa log-in med bcrypt
  - [x] Lägga till items till db (brandName, productName, image, price, category)
  - [x] Ta bort items från db
  - [x] Redigera items

- [ ] Lägg till reset password (behöver först hitta en bra email-provider)
- [ ] Lägg till hur många det finns i lagert
- [ ] Lägg till kundvagn
- [ ] Lägg till så att man kan filter mellan kategorier och märken och pris mm
- [ ] Lägg till så att man kan betala och lägga order, och få order nummer
- [ ] Lägg till recensioner
- [x] Lägg till sök funktion
- [x] Lägg till "favoriter"
- [x] Lägg till förmåga att "inspektera" objekt
- [x] SERCURITY : verify jwt bruhhhh

- [x] Setup stack
- [x] Setup DB
- [x] Setup env
- [x] Skapa cards
