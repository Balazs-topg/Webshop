"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Spinner, Input } from "@nextui-org/react";
import WebsiteHeader from "@/app/components/WebsiteHeader";
import { setCookie } from "../../utils/manageCookies";

function Page() {
  const router = useRouter();
  useEffect(() => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo !== null && JSON.parse(userInfo)) {
        router.push("./view-account");
      }
    } catch {}
  }, [router]);

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);

  const [usernameIsTaken, setUsernameIsTaken] = useState(false);
  const [emailIsTaken, setEmailIsTaken] = useState(false);
  const [passwordIsWeak, setPasswordIsWeak] = useState(false);

  const [repeatPassIsIncorrect, setRepeatWordIsIncorrect] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const signupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (passwordRef.current!.value !== repeatPasswordRef.current!.value) {
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
        username: usernameRef.current!.value,
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      }),
    });
    const data = await response.json();
    console.log(data);

    data.usernameIsTaken ? setUsernameIsTaken(true) : setUsernameIsTaken(false);
    data.emailIsTaken ? setEmailIsTaken(true) : setEmailIsTaken(false);
    data.passwordIsWeak ? setPasswordIsWeak(true) : setPasswordIsWeak(false);
    data.jwt && setCookie("jwt", data.jwt);
    data.jwt && localStorage.setItem("jwt", data.jwt);
    data.signupIsSuccessful &&
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          username: usernameRef.current!.value,
          email: emailRef.current!.value,
        })
      );
    data.signupIsSuccessful && router.push("./signup-success");
    setIsLoading(false);
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
          isDisabled={isLoading}
          errorMessage={usernameIsTaken && "Användarnamnet är upptaget"}
          color={usernameIsTaken ? "danger" : "default"}
          className="overflow-hidden rounded-xl"
          isRequired
          ref={usernameRef}
          variant="bordered"
          type="username"
          label="Användarnamn"
        ></Input>
        <Input
          isDisabled={isLoading}
          errorMessage={emailIsTaken && "Emailet är redan registrerat"}
          color={emailIsTaken ? "danger" : "default"}
          className="overflow-hidden rounded-xl"
          isRequired
          ref={emailRef}
          variant="bordered"
          type="email"
          label="Email"
        ></Input>
        <Input
          isDisabled={isLoading}
          errorMessage={passwordIsWeak && "Lösenordet är för kort"}
          color={passwordIsWeak ? "danger" : "default"}
          className="overflow-hidden rounded-xl"
          isRequired
          ref={passwordRef}
          variant="bordered"
          type="password"
          label="Lösenord"
        ></Input>
        <Input
          isDisabled={isLoading}
          errorMessage={repeatPassIsIncorrect && "Lösenorden är olika"}
          color={repeatPassIsIncorrect ? "danger" : "default"}
          ref={repeatPasswordRef}
          className="overflow-hidden rounded-xl"
          isRequired
          variant="bordered"
          type="password"
          label="Upprepa Lösenord"
        ></Input>
        <Checkbox isRequired>Jag godkänner GDPR</Checkbox>
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          spinner={<Spinner color="white" size="sm"></Spinner>}
          type="submit"
          size="lg"
          color="primary"
          fullWidth
        >
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