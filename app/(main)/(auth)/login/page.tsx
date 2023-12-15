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

  const isFormLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
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
      <div className="mb-[70px] flex items-center justify-center gap-2">
        <Image src="/logo.png" alt="Trabago-logo " width={60} height={60} />
        <span className="text-3xl font-bold text-white ">TrabaGo</span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-[650px] w-[600px] flex-col items-center justify-center rounded-lg border-[0.5px] border-[#181818] bg-zinc-950"
        >
          <h1 className="text-3xl font-semibold text-white mb-[50px]">Sign In</h1>
          <div className="flex flex-col gap-6">
            <Button className="flex w-[300px] items-center justify-center gap-2 bg-zinc-900/50 text-white transition-all duration-300 hover:bg-zinc-900/80">
              <FaGithub className="h-4 w-4 text-white" />
              Continue with Github
            </Button>
            <Button className="flex w-[300px] items-center justify-center gap-2 bg-zinc-900/50 text-white transition-all duration-300 hover:bg-zinc-900/80">
              <FaGoogle className="h-4 w-4 text-white" />
              Continue with Google
            </Button>
          </div>
          <span className="my-5">Or</span>
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm ">Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isFormLoading}
                      className="w-[300px]"
                      placeholder="example@domain.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Password is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isFormLoading}
                      className="w-[300px]"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="mb-[10px] mt-[50px] w-[300px] gap-2 bg-zinc-900/50 text-white transition-all duration-300 hover:bg-zinc-900/80">
            Continue
          </Button>
          <p className="text-md mt-4">
            Don't have an account yet?{" "}
            <span
              role="button"
              className="ml-1 text-white transition-all duration-500 hover:text-zinc-300/80 "
              onClick={registerRedirect}
            >
              Register here.
            </span>{" "}
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Login;
