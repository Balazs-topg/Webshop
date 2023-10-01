"use client";
import { Card, useSelect } from "@nextui-org/react";
import Image from "next/image";

import ItemCard from "../components/ItemCard";

import { useDispatch, useSelector } from "react-redux";
import WebsiteHeader from "../components/WebsiteHeader";

export default function Home() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);
  const cart = useSelector((state) => state.cart);

  return (
    <div className=" font-poppins">
      <WebsiteHeader />
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
