"use client";
import WebsiteHeader from "@/app/components/WebsiteHeader";
import { Input, Button } from "@nextui-org/react";
import { useRef } from "react";

function Page({ params }: { params: { slug: string } }) {
  const emailRef = useRef<HTMLInputElement>(null);

  const resetPasswordHandler = async () => {
    const fetchh = fetch("./api/login/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current!.value,
      }),
    });
  };

  return (
    <>
      <WebsiteHeader />
      <form
        className=" max-w-lg mx-auto p-6 space-y-4"
        onSubmit={resetPasswordHandler}
      >
        <h1 className="text-3xl font-semibold text-sky-800">
          Återställ lösenord
        </h1>
        <Input
          isRequired
          // isDisabled={isLoading}
          // errorMessage={passwordIsWrong ? "Lösenordet är fel" : ""}
          // color={passwordIsWrong ? "danger" : "default"}
          // ref={passwordRef}
          className="overflow-hidden rounded-xl"
          variant="bordered"
          label="Email"
          type="email"
        ></Input>
        <Button fullWidth color="primary" type="submit" size="lg">
          Återställ
        </Button>
      </form>
    </>
  );
}

export default Page;
