"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Login = () => {
  const router = useRouter();
  const formSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    formState: { errors },
  } = form;

  const isFormLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (errors.email && errors.password) {
        toast.error("There was a problem with your email or password.");
        return;
      }
      if (errors.email) {
        toast.error("Please enter a valid email address.");
        return;
      }
      if (errors.password) {
        toast.error("Please enter your password.");
        return;
      }

      console.log(values);

      toast.success("The column has been added successfully.");
    } catch (error: any) {
      console.log(error);

      toast.error(`${error.message}`);
    }
  };

  const registerRedirect = () => {
    router.push("/register");
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center ">
      <div className="flex h-[650px] w-[580px] flex-col items-center justify-center rounded-lg border-[0.5px] border-[#181818] bg-zinc-950">
        <h1 className="mb-[50px] text-3xl font-semibold text-white">Sign In</h1>
        <div className="flex flex-col gap-6">
          <Button className="flex w-[300px] items-center justify-center gap-2 bg-zinc-900/50 text-zinc-300 transition-all duration-300 hover:bg-zinc-900/80">
            <FaGithub className="h-4 w-4 text-zinc-300" />
            Continue with Github
          </Button>
          <Button className="flex w-[300px] items-center justify-center gap-2 bg-zinc-900/50 text-zinc-300 transition-all duration-300 hover:bg-zinc-900/80">
            <FaGoogle className="h-4 w-4 text-zinc-300" />
            Continue with Google
          </Button>
        </div>
        <span className="mt-5">Or</span>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel
                    className={`text-sm text-zinc-400 ${
                      error ? "text-white" : ""
                    }`}
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isFormLoading}
                      className="w-[300px] text-zinc-400"
                      placeholder="example@domain.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-white" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className={`text-sm text-zinc-400 ${error ? "text-white" : ""}`}>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isFormLoading}
                      className="w-[300px] text-zinc-400"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-white" />
                </FormItem>
              )}
            />

            <Button className="mb-[10px] mt-[25px] w-[300px] gap-2 bg-zinc-900/50 text-zinc-300 transition-all duration-300 hover:bg-zinc-900/80">
              Continue
            </Button>
            <p className="text-md mt-4 text-zinc-400">
              Don&apos;t have an account yet?{" "}
              <span
                role="button"
                className="ml-1 text-zinc-200 transition-all duration-500 hover:text-zinc-300/80 "
                onClick={registerRedirect}
              >
                Register here.
              </span>{" "}
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
