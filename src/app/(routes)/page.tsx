import { Card, useSelect } from "@nextui-org/react";
import Image from "next/image";

import ItemCard from "../components/ItemCard";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Home() {

  return (
    <div className="font-poppins">
      <nav className=" sticky w-full bg-stone-100 flex justify-center">
        <div className="max-w-5xl w-full p-4">
          <div className="text-3xl font-semibold">
            web <span className="text-sky-600">shop</span>
          </div>
        </div>
      </nav>
      <div className="p-4 flex items-center gap-2 overflow-scroll selection:bg-sky-200">
        <ItemCard
          brandName="Alvedon"
          productName="Tabletter 500 mg Paracetamol 20 st"
          image="https://www.apohem.se/globalassets/produktbilder/7046260976108_1.jpg?ref=ED26DF427F&f.sharpen=70&w=900&format=jpg"
        ></ItemCard>
        <ItemCard
          brandName="Alvedon"
          productName="Tabletter 500 mg Paracetamol 20 st"
          image="https://www.apohem.se/globalassets/produktbilder/7046260976108_1.jpg?ref=ED26DF427F&f.sharpen=70&w=900&format=jpg"
        ></ItemCard>
        <ItemCard
          brandName="Alvedon"
          productName="Tabletter 500 mg Paracetamol 20 st"
          image="https://www.apohem.se/globalassets/produktbilder/7046260976108_1.jpg?ref=ED26DF427F&f.sharpen=70&w=900&format=jpg"
        ></ItemCard>
        <ItemCard
          brandName="Alvedon"
          productName="Tabletter 500 mg Paracetamol 20 st"
          image="https://www.apohem.se/globalassets/produktbilder/7046260976108_1.jpg?ref=ED26DF427F&f.sharpen=70&w=900&format=jpg"
        ></ItemCard>
        <ItemCard
          brandName="Alvedon"
          productName="Tabletter 500 mg Paracetamol 20 st"
          image="https://www.apohem.se/globalassets/produktbilder/7046260976108_1.jpg?ref=ED26DF427F&f.sharpen=70&w=900&format=jpg"
        ></ItemCard>
      </div>
    </div>
  );
}
