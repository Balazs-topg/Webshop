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
    data.signupIsSuccessful &&
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          username: usernameRef.current.value,
          email: emailRef.current.value,
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
          errorMessage={usernameIsTaken && "Användarnamnet är upptaget"}
          color={usernameIsTaken && "danger"}
          className="overflow-hidden rounded-xl"
          isRequired
          ref={usernameRef}
          variant="bordered"
          type="username"
          label="Användarnamn"
        ></Input>
        <Input
          errorMessage={usernameIsTaken && "Emailet är redan registrerat"}
          color={usernameIsTaken && "danger"}
          className="overflow-hidden rounded-xl"
          isRequired
          ref={emailRef}
          variant="bordered"
          type="email"
          label="Email"
        ></Input>
        <Input
          errorMessage={passwordIsWeak && "Lösenordet är för kort"}
          color={passwordIsWeak && "danger"}
          className="overflow-hidden rounded-xl"
          isRequired
          ref={passwordRef}
          variant="bordered"
          type="password"
          label="Lösenord"
        ></Input>
        <Input
          errorMessage={repeatPassIsIncorrect && "Lösenorden är olika"}
          color={repeatPassIsIncorrect && "danger"}
          ref={repeatPasswordRef}
          className="overflow-hidden rounded-xl"
          isRequired
          variant="bordered"
          type="password"
          label="Upprepa Lösenord"
        ></Input>
        <Checkbox isRequired ref={consentRef}>
          Jag godkänner GDPR
        </Checkbox>
        <Button
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
