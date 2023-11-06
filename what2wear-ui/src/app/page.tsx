"use client";
import { AuthStore } from "@/stores/auth";
import { getAuthTokens } from "@/utils/aws";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const accessToken = AuthStore((state) => state.accessToken);
  const idToken = AuthStore((state) => state.idToken);
  const refreshToken = AuthStore((state) => state.refreshToken);

  useEffect(() => {
    if (!accessToken || !idToken ||refreshToken ) {
      if (code) getAuthTokens(code);
    } else {
      console.log("we have  cached token!");
    }


  }, [accessToken, code, idToken, refreshToken]);

  useEffect(() => {
    accessToken ? router.push("/dashboard") : router.push("/login");
  },[accessToken, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <h1>Hello, your code is {code}</h1>
      </div>
    </main>
  );
}
