import Image from "next/image";

import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center mb-6">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="hidden bg-muted  lg:flex items-center h-full">
        <Image
          src="/images/login-animate.gif"
          alt="Image"
          width={440}
          height={440}
          className="mx-auto my-auto rounded-xl bg-white"
        />
      </div>
    </div>
  );
}
