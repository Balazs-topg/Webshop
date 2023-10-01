"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Spinner, Input } from "@nextui-org/react";
import WebsiteHeader from "@/app/components/WebsiteHeader";

function Page() {
  const router = useRouter();

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();

  const consentRef = useRef();

  const [usernameIsTaken, setUsernameIsTaken] = useState(false);
  const [emailIsTaken, setEmailIsTaken] = useState(false);
  const [passwordIsWeak, setPasswordIsWeak] = useState(false);

  const [repeatPassIsIncorrect, setRepeatWordIsIncorrect] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const signupHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (passwordRef.current.value !== repeatPasswordRef.current.value) {
      console.log("wrong");
      setIsLoading(false);
      setRepeatWordIsIncorrect(true);
      return;
    } else {
      setRepeatWordIsIncorrect(false);
    }

    const response = await fetch("./api/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        consent: consentRef.current.checked,
      }),
    });
    const data = await response.json();
    console.log(data);

    data.usernameIsTaken == true
      ? setUsernameIsTaken(true)
      : setUsernameIsTaken(false);
    data.emailIsTaken == true ? setEmailIsTaken(true) : setEmailIsTaken(false);
    data.passwordIsWeak == true
      ? setPasswordIsWeak(true)
      : setPasswordIsWeak(false);
    data.jwt && localStorage.setItem("jwt", data.jwt);
    data.signupIsSuccessful && router.push("./signup-success");
    setIsLoading(false);
  };

  return (
    <>
      <WebsiteHeader />
      <div
        onSubmit={signupHandler}
        className=" max-w-lg mx-auto p-6 space-y-4 flex justify-center flex-col"
      >
        <h1 className="text-3xl font-semibold text-sky-800 text-center">
          Välkommen till webshop!
          <br /> Nu är du registrerad!
        </h1>
        <Link href={"./"} className=" mx-auto">
          <Button color="primary">Gå hem</Button>
        </Link>
      </div>
    </>
  );
}

export default Page;
