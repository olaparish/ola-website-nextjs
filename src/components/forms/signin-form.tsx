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
import { signIn, signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserLoginTypes } from "../../../types/auth.type";
import { getLoginCallback } from "@/lib/helpers";
import { setAccessToken } from "@/utils/axios";

type Props = {
  type: UserLoginTypes;
};

const SigninForm = ({ type }: Props) => {
  const schema = z.object({
    username:
      type === "parishioner"
        ? z.string().min(2, "Please enter your ID")
        : z.email("Please enter your email"),
    password: z.string().min(2, "Please enter a password"),
  });

  type schemaType = z.infer<typeof schema>;

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({ resolver: zodResolver(schema) });

  const { isPending, mutate } = useMutation<void, Error, schemaType>({
    mutationFn: async (data) => {
      // let callbackUrl;
      let authFunction;
      let credentialsObj;
      if (type === "parishioner") {
        authFunction = authService.parishionerSignin;
        credentialsObj = {
          id: data.username,
          password: data.password,
        };
      } else {
        authFunction = authService.leaderSignin;
        credentialsObj = {
          email: data.username,
          password: data.password,
        };
      }

      const res = await authFunction(credentialsObj);
      if (!res.data || res.error) {
        toast.error("Incorrect username or password");
        throw new Error("username or password");
      }

      console.log("Res obj: ", res);
      if (!res.data.requires2FA) {
        try {
          await signIn("credentials", {
            user: JSON.stringify({
              ...res.data.user,
              permissions: res.data.permissions,
            }),
            tokenData: JSON.stringify(res.data.tokenData),
            userType: JSON.stringify(res.data.user.role),
            redirect: false,
          });
          const callbackUrl = getLoginCallback(res.data.user.role);
          if (!callbackUrl) {
            throw new Error("User dashboard not implemented");
          }
          setAccessToken(res.data.tokenData.access.token);
          router.push(callbackUrl);
          toast.success("Sign in success");
        } catch (error) {
          console.log("Sign in error: ", error);
          signOut();
          throw new Error("User dashboard not implemented");
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
        <Label className="" htmlFor="id">
          {type === "parishioner" ? "Parishioner ID" : "username"}
        </Label>
        <Input
          id="username"
          type={type === "parishioner" ? "text" : "email"}
          {...register("username")}
        />
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
