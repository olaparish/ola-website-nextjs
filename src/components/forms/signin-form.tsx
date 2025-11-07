"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ErrorSpan } from "../ui/errors";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/services/auth.service";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const schema = z.object({
  username: z.string().min(2, "Please enter a username"),
  password: z.string().min(2, "Please enter a password"),
});

type schemaType = z.infer<typeof schema>;

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({ resolver: zodResolver(schema) });

  const { isPending, mutate } = useMutation<void, Error, schemaType>({
    mutationFn: async (data) => {
      const res = await authService.signin(data);
      if (!res.data || res.error) {
        toast.error("Incorrect username or password");
        throw new Error("username or password");
      }
      console.log("here now...");
      if (!res.data.requires2FA) {
        try {
          console.log("Signing in...");
          const signResult = await signIn("credentials", {
            user: JSON.stringify(res.data.user),
            tokenData: JSON.stringify(res.data.tokenData),
            userType: JSON.stringify(res.data.user.role),
            callbackUrl: "/parishioner/dashboard",
          });
          console.log("signin result: ", signResult);
        } catch (error) {
          console.log("Sign in error: ", error);
        }
      } else {
        toast.error("2FA not implemented");
      }
    },
  });

  const onSubmit: SubmitHandler<schemaType> = (data) => {
    mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-12">
      <div>
        <Label className="" htmlFor="username">
          Username
        </Label>
        <Input id="username" type="text" {...register("username")} />
        <ErrorSpan message={errors.username?.message as string} />
      </div>
      <div className="mt-7.5">
        <Label className="" htmlFor="password">
          Password
        </Label>
        <Input id="password" type="password" {...register("password")} />
        <ErrorSpan message={errors.password?.message as string} />
      </div>
      <Button
        className="bg-secondary-900 mt-13 w-full font-medium text-white cursor-pointer"
        type="submit"
        disabled={isPending}
      >
        <div className="flex items-center gap-2">
          <span>{isPending ? "Signing in" : "Sign in"}</span>
          {isPending && <Spinner className="size-4" />}
        </div>
      </Button>
    </form>
  );
};

export default SigninForm;
