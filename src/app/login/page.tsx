"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema, LoginSchemaType } from "@/Schema/Login.S";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Link from "next/link";
function LogIn() {
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  async function handleLogIn(values: LoginSchemaType) {
    // try {
    //   const { data } = await axios.post(
    //     "https://ecommerce.routemisr.com/api/v1/auth/signin",
    //     values
    //   );
    //   console.log(data);
    //   toast.success(data.message);
    //   router.push("/");
    // } catch (error: AxiosError | any) {
    //   console.log(error);
    //   toast.error(error.response.data.message || "An error occurred", {
    //     duration: 4000,
    //     position: "top-center",
    //   });
    // }
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (res?.ok) {
      toast.success("SUCCESS", { duration: 4000, position: "top-center" });
      window.location.href = res.url || "/";
    } else {
      toast.success(res?.error || "Failed", {
        duration: 4000,
        position: "top-center",
      });
    }
  }

  //
  return (
    <>
      <div className="mx-auto px-5 md:px-0 w-full my-12 md:w-1/2">
        <h1 className="text-2xl font-bold text-center">Log In</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogIn)}
            className="space-y-5 mt-5"
          >
            {/* Email Field */}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full hover:translate-y-0.5" type="submit">
              Log In
            </Button>
          </form>
        </Form>
        <div className="mx-auto w-fit mt-3">
          <Link
            className="cursor-pointer text-green-900 hover:border-green-900 hover:border-b-1"
            href="/forgotPassword"
          >
            Forgot your password ?
          </Link>
        </div>
      </div>
    </>
  );
}

export default LogIn;
