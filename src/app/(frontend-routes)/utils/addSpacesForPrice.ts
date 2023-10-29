export default function addSpacesForPrice(price: string | number) {
  const priceArr = String(price).split("");
  const newArr: any = [];
  priceArr.forEach((char, iteration) => {
    newArr.push(char);
    if ((priceArr.length - 1 - iteration) % 3 == 0) {
      newArr.push(" ");
    }
  });
  return newArr.join("");
}
