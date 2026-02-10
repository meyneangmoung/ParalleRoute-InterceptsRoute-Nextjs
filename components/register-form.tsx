"use client";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
interface RegisterProps {
  heading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
    className?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}
const formSchema = z.object({
  email: z.email().nonempty(),
  password: z
    .string()
    .min(8, "At least 8 characters!")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});
const Register = ({
  heading = "Register",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "app\favicon.ico",
    alt: "logo",
    title: "shadcnblocks.com",
  },
  buttonText = "Register",
  signupText = "Need an account?",
  signupUrl = "https://shadcnblocks.com",
  className,
}: RegisterProps) => {
  //define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, control } = form;

  function loginSubmit(data: any) {
    console.log(data);
  }
  return (
    <section className={cn(" h-150 ", className)}>
      <div className="flex h-full items-center justify-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <Form {...form}>
            <form onSubmit={handleSubmit(loginSubmit)}>
              <div className="flex w-full max-w-sm min-w-sm flex-col items-center gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md">
                {heading && (
                  <h1 className="text-xl font-semibold">{heading}</h1>
                )}
                <div className="w-90">
                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display email.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* <p className="text-red-500">{errors.email?.message}</p> */}
                <div className="w-90">
                  <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* <p className="text-red-500">{errors.password?.message}</p> */}

                <Button type="submit" className="w-full">
                  {buttonText}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export { Register };
