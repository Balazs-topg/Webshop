import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import adminIcons from "../../../adminIcons";
import Image from "next/image";

function UrlInput({
  index,
  state,
  setState,
  value,
}: {
  index?: number;
  setState: Function;
  state: any;
  value: string;
}) {
  // const [currentUrl, setCurrentUrl] = useState("");
  if (index == 0) {
    return (
      <div className="flex gap-2 items-center">
        <Input
          isRequired
          value={value}
          type="text"
          label="Image URL"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState((prevState: []) =>
              prevState.map((item: any, idx: number) =>
                idx === index ? e.target.value : item
              )
            )
          }
        >
          ImageUrlInput
        </Input>
        <Button
          isIconOnly
          size="lg"
          color="primary"
          onClick={() => {
            setState([...state, ""]);
          }}
        >
          {adminIcons.plus}
        </Button>
      </div>
    );
  }
  return (
    <div className="flex gap-2 items-center">
      <Input
        value={value}
        type="text"
        label="Image URL"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setState((prevState: []) =>
            prevState.map((item: any, idx: number) =>
              idx === index ? e.target.value : item
            )
          )
        }
      >
        ImageUrlInput
      </Input>
      <Button
        isIconOnly
        size="lg"
        color="danger"
        onClick={() => {
          setState((prevState: []) =>
            prevState.filter((_, idx) => idx !== index)
          );
        }}
      >
        {adminIcons.trash}
      </Button>
    </div>
  );
}

function ImageUrlInput({
  state,
  setState,
}: {
  state: string[];
  setState: Function;
}) {
  const [listOfUrls, setListOfUrls] = useState<string[]>(state);

  //sync input prop state, to component state
  useEffect(() => {
    setState(listOfUrls);
  }, [listOfUrls, setState]);

  return (
    <div className=" space-y-3">
      {listOfUrls.map((item, index) => {
        return (
          <>
            <UrlInput
              value={listOfUrls[index]}
              index={index}
              state={listOfUrls}
              setState={setListOfUrls}
              key={index}
            ></UrlInput>
            {listOfUrls[index] && (
              <div className="rounded-xl overflow-hidden">
                <img src={listOfUrls[index]} alt="" />
              </div>
            )}{" "}
          </>
        );
      })}
    </div>
  );
}

export default ImageUrlInput;
