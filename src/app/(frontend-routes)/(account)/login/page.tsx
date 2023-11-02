"use client";
import React, { useRef, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import WebsiteHeader from "@/app/components/WebsiteHeader";
import { Input, Button } from "@nextui-org/react";

// import WebsiteHeader from "@/app/components/WebsiteHeader";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "../../utils/manageCookies";
import WebsiteFooter from "@/app/components/WebsiteFooter";

function Page() {
  const router = useRouter();
  useEffect(() => {
    try {
      const userJwt = getCookie("jwt");
      if (userJwt && JSON.parse(userJwt)) {
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

    setIsLoading(false);
    data.loginIsSuccessful && router.push("./");
  };

  return (
    <>
      <form
        className=" mx-auto min-h-screen max-w-lg space-y-4 p-6"
        onSubmit={loginHandler}
      >
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
            <Link className="font-semibold text-sky-800" href="./signup">
              registrera dig här
            </Link>
          </div>
          <div>
            Glömt lösenord?{" "}
            <Link
              className="font-semibold text-sky-800"
              href="login/reset-password"
            >
              återställ lösenord
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default Page;
