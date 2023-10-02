"use client";
import React, { useRef, useState, useEffect } from "react";
import WebsiteHeader from "@/app/components/WebsiteHeader";
import { Button, Spinner, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "../../utils/manageCookies";

function Page() {
  const router = useRouter();
  useEffect(() => {
    try {
      if (JSON.parse(localStorage.getItem("userInfo")).username) {
        router.push("./view-account");
      }
    } catch {}
  }, []);

  const emailRef = useRef();
  const passwordRef = useRef();

  const [userFound, setUserFound] = useState(true);
  const [passwordIsWrong, setPasswordIsWrong] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("./api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    });
    const data = await response.json();
    console.log(data);

    data.userFound ? setUserFound(true) : setUserFound(false);
    !data.loginIsSuccessful && setPasswordIsWrong(true);
    data.jwt && setCookie("jwt", data.jwt);
    data.jwt && localStorage.setItem("jwt", data.jwt);
    data.loginIsSuccessful &&
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          username: data.username,
          email: emailRef.current.value,
        })
      );

    setIsLoading(false);
    data.loginIsSuccessful && router.push("./");
  };

  return (
    <>
      <WebsiteHeader />
      <form className=" max-w-lg mx-auto p-6 space-y-4" onSubmit={loginHandler}>
        <h1 className="text-3xl font-semibold text-sky-800">Logga in</h1>
        <Input
          isRequired
          isDisabled={isLoading}
          errorMessage={!userFound ? "Emailen är inte registrerad" : ""}
          color={!userFound && "danger"}
          ref={emailRef}
          className="overflow-hidden rounded-xl"
          variant="bordered"
          label="Email"
        ></Input>
        <Input
          isRequired
          isDisabled={isLoading}
          errorMessage={passwordIsWrong ? "Lösenordet är fel" : ""}
          color={passwordIsWrong && "danger"}
          ref={passwordRef}
          className="overflow-hidden rounded-xl"
          variant="bordered"
          label="Lösenord"
          type="password"
        ></Input>
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          spinner={<Spinner color="white" size="sm"></Spinner>}
          type="submit"
          size="lg"
          color="primary"
          fullWidth
        >
          Logga in
        </Button>
        <p>
          Är du inte registerad?{" "}
          <Link className="text-sky-800 font-semibold" href="./signup">
            registrera dig här
          </Link>
        </p>
      </form>
    </>
  );
}

export default Page;
