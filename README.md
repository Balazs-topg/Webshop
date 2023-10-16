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

- [x] Setup stack
- [x] Setup DB
- [x] Setup env
- [x] Skapa cards

- [ ] Skapa admin dashboard

  - [x] Skapa log-in med bcrypt
  - [x] Lägga till items till db (brandName, productName, image, price, category)
  - [ ] Redigera items
  - [x] Ta bort items från db
  - [ ] lägg till så att man kan kolla på alla användare
  - [ ] lägg till så att man kan kolla inkomande order

- [ ] Lägg till reset password (behöver först hitta en bra email-provider)
- [x] Lägg till förmåga att "inspektera" objekt
- [x] Lägg till "favoriter"
- [ ] Lägg till hur många det finns i lagert
- [ ] Lägg till kundvagn
- [ ] Lägg till så att man kan filter mellan kategorier och märken och pris mm
- [ ] Lägg till sök funktion
- [ ] Lägg till så att man kan betala och lägga order, och få order nummer
