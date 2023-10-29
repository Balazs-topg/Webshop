"use client";
import React, { useRef, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

import { Input, Button } from "@nextui-org/react";

import WebsiteHeader from "@/app/components/WebsiteHeader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "../../utils/manageCookies";
import WebsiteFooter from "@/app/components/WebsiteFooter";

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

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [userFound, setUserFound] = useState(true);
  const [passwordIsWrong, setPasswordIsWrong] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("./api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      }),
    });
    const data = await response.json();

    data.userFound ? setUserFound(true) : setUserFound(false);
    !data.loginIsSuccessful && setPasswordIsWrong(true);
    data.jwt && setCookie("jwt", data.jwt);
    data.jwt && localStorage.setItem("jwt", data.jwt);
    data.loginIsSuccessful &&
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          username: data.username,
          email: emailRef.current!.value,
          id: data.id,
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
          color={!userFound ? "danger" : "default"}
          ref={emailRef}
          className="overflow-hidden rounded-xl"
          variant="bordered"
          label="Email"
        ></Input>
        <Input
          isRequired
          isDisabled={isLoading}
          errorMessage={passwordIsWrong ? "Lösenordet är fel" : ""}
          color={passwordIsWrong ? "danger" : "default"}
          ref={passwordRef}
          className="overflow-hidden rounded-xl"
          variant="bordered"
          label="Lösenord"
          type="password"
        ></Input>
        <Button
          variant="solid"
          isDisabled={isLoading}
          isLoading={isLoading}
          spinner={<Loader2 className=" animate-spin" absoluteStrokeWidth />}
          type="submit"
          size="lg"
          color="primary"
          fullWidth
        >
          Logga in
        </Button>
        <div className=" space-y-2">
          <div>
            Är du inte registerad?{" "}
            <Link className="text-sky-800 font-semibold" href="./signup">
              registrera dig här
            </Link>
          </div>
          <div>
            Glömt lösenord?{" "}
            <Link
              className="text-sky-800 font-semibold"
              href="login/reset-password"
            >
              återställ lösenord
            </Link>
          </div>
        </div>
      </form>
      <WebsiteFooter />
    </>
  );
}

export default Page;
