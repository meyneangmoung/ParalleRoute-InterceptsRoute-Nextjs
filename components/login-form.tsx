"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Type

interface Login1Props {
  heading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
    className?: string;
  };
  buttonText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}
// formSchema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "At least 8 characters!")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

type LoginFormValues = z.infer<typeof formSchema>;


const Login1 = ({
  heading = "Login",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
    alt: "logo",
    title: "shadcnblocks.com",
  },
  buttonText = "Login",
  signupText = "Need an account?",
  signupUrl = "https://shadcnblocks.com",
  className,
}: Login1Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
  });

  function loginSubmit(data: LoginFormValues) {
    console.log("Login data:", data);
  }

  return (
    <section className={cn("h-150", className)}>
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <a href={logo.url}>
            <img
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="h-10 dark:invert"
            />
          </a>

          {/* Form */}
          <form onSubmit={handleSubmit(loginSubmit)}>
            <div className="flex w-full max-w-sm flex-col gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md">
              {heading && (
                <h1 className="text-center text-xl font-semibold">
                  {heading}
                </h1>
              )}

              <Input
                placeholder="Email"
                className="text-sm"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}

              <Input
                type="password"
                placeholder="Password"
                className="text-sm"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}

              <Button type="submit" className="w-full">
                {buttonText}
              </Button>
            </div>

            <div className="mt-3 flex justify-center gap-1 text-sm text-muted-foreground">
              <p>{signupText}</p>
              <a
                href={signupUrl}
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export { Login1 };
