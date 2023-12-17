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
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { getSocialLoginUrl, parseJwt } from "@/lib/auth/auth-utils";
import axios from "axios";
import { useAuth } from "@/components/providers/auth-provider";

const SignIn = () => {
  const Auth = useAuth();
  const isLoggedIn = Auth?.userIsAuthenticated();
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

  const isFormLoading = form.formState.isSubmitting;
  const [showPassword, setShowPassword] = useState(false);



  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`,
        values,
      );
      const { accessToken } = response.data;
      const data = parseJwt(accessToken);
      const authenticatedUser = {data, accessToken};
      Auth?.userLogin(authenticatedUser);
      toast.success("You have successfully logged in.");
      form.reset();
      router.push("/boards");

      
    } catch (error: any) {
      console.log(error);

      toast.error(`${error.message}`);
    }
  };

  const registerRedirect = () => {
    router.push("/signup");
  };
  const handleLoginWithGithub = () => {
    const socialLoginUrl = getSocialLoginUrl("linkedin");
    router.push(socialLoginUrl);
  };

  const handleLoginWithGoogle = () => {
    const socialLoginUrl = getSocialLoginUrl("google");
    router.push(socialLoginUrl);
  };

  if(isLoggedIn) {
    router.push("/");
  }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center ">
      <div className="flex h-[650px] w-[300px] flex-col items-center justify-center rounded-lg border-[#181818] sm:w-[580px] sm:border-[0.5px] sm:bg-zinc-950 ">
        <h1 className="mb-[30px] text-2xl font-semibold text-white sm:mb-[50px] sm:text-3xl">
          Sign In
        </h1>
        <div className="flex flex-col gap-6">
          <Button
            className="flex w-[300px] items-center justify-center gap-2 bg-zinc-900/50 text-zinc-300 transition-all duration-300 hover:bg-zinc-900/80"
            onClick={handleLoginWithGithub}
          >
            <FaGithub className="h-4 w-4 text-zinc-300" />
            Continue with Github
          </Button>
          <Button
            className="flex w-[300px] items-center justify-center gap-2 bg-zinc-900/50 text-zinc-300 transition-all duration-300 hover:bg-zinc-900/80"
            onClick={handleLoginWithGoogle}
          >
            <FaGoogle className="h-4 w-4 text-zinc-300" />
            Continue with Google
          </Button>
        </div>
        <div className="mb-2 mt-5 flex items-center justify-center gap-2">
          <Separator className="w-[130px]" />
          <span className="">Or</span>
          <Separator className="w-[130px]" />
        </div>

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
                    className={`text-xs text-zinc-400 sm:text-sm ${
                      error ? "text-white" : ""
                    }`}
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isFormLoading}
                      className="w-[300px] text-zinc-400"
                      placeholder="Enter your email"
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
                  <FormLabel
                    className={`text-xs text-zinc-400 sm:text-sm ${
                      error ? "text-white" : ""
                    }`}
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        disabled={isFormLoading}
                        className="w-[300px] pr-10 text-zinc-400"
                        placeholder="Enter your password"
                        {...field}
                      />
                      {showPassword ? (
                        <EyeOff
                          className={`absolute right-2 top-1/2 mr-1 h-4 w-4 -translate-y-1/2 transform cursor-pointer`}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <Eye
                          className={`absolute right-2 top-1/2 mr-1 h-4 w-4 -translate-y-1/2 transform cursor-pointer`}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-white" />
                </FormItem>
              )}
            />

            <Button className="mb-[10px] mt-[25px] w-[300px] gap-2 bg-zinc-900/50 text-zinc-300 transition-all duration-300 hover:bg-zinc-900/80">
              Continue
            </Button>
            <p className="sm:text-md mt-4 text-sm text-zinc-400">
              Don&apos;t have an account yet?{" "}
              <span
                role="button"
                className="ml-1 text-zinc-200 transition-all duration-500 hover:text-zinc-300/80 "
                onClick={registerRedirect}
              >
                Sign Up.
              </span>{" "}
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
