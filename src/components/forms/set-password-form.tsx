"use client";
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
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const SetPasswordForm = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const userType = searchParams.get("userType") || "";

  const schema = z.object({
    password: z.string().min(8, "Enter your password"),

    confirmPassword: z.string().min(8, "Confirm your password"),
  });

  type schemaType = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({ resolver: zodResolver(schema) });

  const { isPending, mutate } = useMutation<void, Error, schemaType>({
    mutationFn: async (data) => {
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
      }
      const res = await authService.setPassword({ ...data, token });
      if (res.error) {
        toast.error("Invalid token");
        throw new Error("Invalid password");
      } else {
        router.replace(`/auth/${userType}/login`);
      }
    },
  });

  const onSubmit: SubmitHandler<schemaType> = (data) => {
    mutate(data);
  };

  if (!token || !["leader", "parishioner"].includes(userType)) {
    return (
      <div className="mt-2 text-center">
        <ErrorSpan message="Invalid or expired token" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-12">
      <div>
        <Label className="" htmlFor="id">
          Password
        </Label>
        <Input id="username" type="password" {...register("password")} />
        <ErrorSpan message={errors.password?.message as string} />
      </div>
      <div className="mt-7.5">
        <Label className="" htmlFor="password">
          Confirm Password
        </Label>
        <Input id="password" type="password" {...register("confirmPassword")} />
        <ErrorSpan message={errors.confirmPassword?.message as string} />
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

export default SetPasswordForm;
