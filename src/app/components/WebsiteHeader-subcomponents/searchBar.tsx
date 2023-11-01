"use client";
import { useState, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface SearchBar {
  isInFocus?: boolean;
  onSearch?: Function;
  placeholder?: string;
  initalValue?: string;
}

export default function SearchBar({
  isInFocus = false,
  initalValue = "",
  placeholder = "Search This Website",
}: SearchBar) {
  const router = useRouter();
  const [isInFocusState, setIsInFocusState] = useState(isInFocus);
  const [inputValue, setInputValue] = useState(initalValue);
  const [keepLeft, setKeepLeft] = useState(!!initalValue);
  const refInput = useRef<HTMLInputElement>(null);

  const onSearch = (value: string) => {
    router.push(`/search?q=${value}`);
  };

  return (
    <div
      tabIndex={0}
      className={
        isInFocusState
          ? "group relative flex w-full cursor-text items-center overflow-hidden rounded-full border-2 border-primary px-4 py-2 text-sm font-medium"
          : "group relative flex w-full cursor-text items-center overflow-hidden rounded-full border-2 px-4 py-2 text-sm font-medium"
      }
      onFocus={() => {
        setIsInFocusState(true);
        setKeepLeft(true);
        refInput.current?.focus();
      }}
      onBlur={() => {
        setIsInFocusState(false);
        if (inputValue.length === 0) setKeepLeft(false);
      }}
    >
      <div
        className={
          keepLeft
            ? "relative ml-[0%] -translate-x-[0%]  transition-all"
            : "relative ml-[50%] -translate-x-[50%] transition-all"
        }
      >
        {/* just a "ghost element"*/}
        <div className="flex w-full gap-2 whitespace-nowrap">
          <div className="flex items-center justify-center">
            <MagnifyingGlassIcon
              stroke="rgb(148 163 184)"
              className="heroicon-sw-2 h-5 w-5"
            />
          </div>
          <span style={{ whiteSpace: "pre" }}>
            {inputValue.length == 0 ? placeholder : inputValue}
          </span>
        </div>
        {/* the real element*/}
        <div className="absolute left-0 top-0 flex w-full gap-2">
          <div className="flex items-center justify-center">
            <MagnifyingGlassIcon
              stroke={inputValue.length == 0 ? "rgb(148 163 184)" : "black"}
              className={
                keepLeft
                  ? "heroicon-sw-2 h-5 w-5 transition-all"
                  : "heroicon-sw-2 h-5 w-5 transition-all"
              }
            />
          </div>
          <input
            ref={refInput}
            type="text"
            className="placeholder:text-base-400 w-full bg-stone-100 outline-none transition-all"
            placeholder={placeholder}
            value={inputValue}
            onInput={(e: any) => {
              setInputValue(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch(inputValue);
            }}
          />
        </div>
      </div>
    </div>
  );
}
