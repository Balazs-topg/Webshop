"use client";
import React, { useRef, useState } from "react";
import WebsiteHeader from "@/app/components/WebsiteHeader";
import { Input } from "@nextui-org/react";
import { Button, Checkbox } from "@nextui-org/react";
import Link from "next/link";
import { METHODS } from "http";
function Page() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const consentRef = useRef();

  const usernameIsTaken = useState(false);
  const emailIsTaken = useState(false);
  const passwordIsWeak = useState(false);

  const signupHandler = async (e) => {
    e.preventDefault();
    response = await fetch("./api/signup", {
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
    if (response.ok) {
      console.log("it worked");
    }
  };

  return (
    <>
      <WebsiteHeader />
      <form
        onSubmit={signupHandler}
        className=" max-w-lg mx-auto p-6 space-y-4"
      >
        <h1 className="text-3xl font-semibold text-sky-800">Registrera</h1>
        <Input
          className="overflow-hidden rounded-xl"
          isRequired
          ref={usernameRef}
          variant="bordered"
          type="username"
          label="Användarnamn"
        ></Input>
        <Input
          className="overflow-hidden rounded-xl"
          isRequired
          ref={emailRef}
          variant="bordered"
          type="email"
          label="Email"
        ></Input>
        <Input
          className="overflow-hidden rounded-xl"
          isRequired
          ref={passwordRef}
          variant="bordered"
          type="password"
          label="Lösenord"
        ></Input>
        <Input
          className="overflow-hidden rounded-xl"
          isRequired
          variant="bordered"
          type="password"
          label="Upprepa Lösenord"
        ></Input>
        <Checkbox isRequired ref={consentRef}>
          Jag godkänner GDPR
        </Checkbox>
        <Button type="submit" size="lg" color="primary" fullWidth>
          Registrera
        </Button>
        <p>
          Är du redan registrerad?{" "}
          <Link className="text-sky-800 font-semibold" href="./login">
            logga in här
          </Link>
        </p>
      </form>
    </>
  );
}

export default Page;
