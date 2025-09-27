"use client";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type VerifyCodeForm = {
  resetCode: string;
};

function VerifyCode() {
      const router = useRouter();
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeForm>();

  async function onSubmit(data: VerifyCodeForm) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: data.resetCode }
      );
toast.success("Code verified successfully ✅")
       router.push("/resetPassword");
 
    } catch (err: any) {
toast.error(err.response?.data?.message || "Invalid code ❌")
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Verify Reset Code</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Reset Code</label>
          <input
            type="text"
            {...register("resetCode", { required: "Reset code is required" })}
            className="w-full border rounded p-2"
            placeholder="Enter the code you received"
          />
          {errors.resetCode && (
            <p className="text-red-500 text-sm">{errors.resetCode.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Verify
        </button>
      </form>
    </div>
  );
}

export default VerifyCode;
