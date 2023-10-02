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
- [ ] Setup DB
- [ ] Setup env
- [x] Skapa cards

- [ ] Skapa admin dashboard
  - [ ] Skapa log-in med bcrypt
  - [ ] Lägga till items till db (brandName, productName, image, price, category)
  - [ ] Redigera items
  - [ ] Ta bort items från db
