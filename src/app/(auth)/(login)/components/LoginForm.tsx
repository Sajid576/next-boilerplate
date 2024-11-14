"use client";

import TextField from "@components/custom/inputs/TextField/TextField";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginFormSchema } from "../login-form-schema";
import { useRouter } from "next/navigation";
import { PasswordField } from "./PasswordField";

export default function LoginForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    console.log("data", data);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log("response", response);
    if (!response?.error) {
      router.push("/dashboard");
      router.refresh();
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <TextField label="Email" name="email" form={form} placeholder="Enter Email" />
        <PasswordField />
        <Button type="submit" className="w-full mt-4">
          Login
        </Button>
      </form>
    </Form>
  );
}
