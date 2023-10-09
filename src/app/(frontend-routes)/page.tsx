import ItemCard from "../components/ItemCard";
import WebsiteHeader from "../components/WebsiteHeader";

export default function Home() {
  return (
    <div className=" font-poppins">
      <WebsiteHeader />
      <div className="p-4 flex items-center gap-2 overflow-scroll selection:bg-sky-200">
        <ItemCard
          brandName="Alvedon"
          productName="Tabletter 500 mg Paracetamol 20 st"
          image="https://www.apohem.se/globalassets/produktbilder/7046260976108_1.jpg?ref=ED26DF427F&f.sharpen=70&w=900&format=jpg"
          isFavourite={false}
          isInstock={true}
        ></ItemCard>
        <ItemCard
          brandName="Alvedon"
          productName="Tabletter 500 mg Paracetamol 20 st"
          image="https://www.apohem.se/globalassets/produktbilder/7046260976108_1.jpg?ref=ED26DF427F&f.sharpen=70&w=900&format=jpg"
          isFavourite={false}
          isInstock={true}
        ></ItemCard>
        <ItemCard
          brandName="Alvedon"
          productName="Tabletter 500 mg Paracetamol 20 st"
          image="https://www.apohem.se/globalassets/produktbilder/7046260976108_1.jpg?ref=ED26DF427F&f.sharpen=70&w=900&format=jpg"
          isFavourite={false}
          isInstock={true}
        ></ItemCard>
        <ItemCard
          brandName="Alvedon"
          productName="Tabletter 500 mg Paracetamol 20 st"
          image="https://www.apohem.se/globalassets/produktbilder/7046260976108_1.jpg?ref=ED26DF427F&f.sharpen=70&w=900&format=jpg"
          isFavourite={false}
          isInstock={true}
        ></ItemCard>
        <ItemCard
          brandName="Alvedon"
          productName="Tabletter 500 mg Paracetamol 20 st"
          image="https://www.apohem.se/globalassets/produktbilder/7046260976108_1.jpg?ref=ED26DF427F&f.sharpen=70&w=900&format=jpg"
          isFavourite={false}
          isInstock={true}
        ></ItemCard>
      </div>
    </div>
  );
}
