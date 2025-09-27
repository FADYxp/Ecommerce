"use client";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


type ResetPasswordForm = {
  email: string;
  newPassword: string;
};

function ResetPassword() {
      const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>();

  async function onSubmit(data: ResetPasswordForm) {
    try {
      const res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: data.email,
          newPassword: data.newPassword,
        }
      );
      toast.success("Password reset successfully ✅")
         router.push("/login");

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong ❌")
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border rounded p-2"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            {...register("newPassword", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            className="w-full border rounded p-2"
            placeholder="Enter new password"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
