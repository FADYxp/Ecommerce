"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { RegisterationSchema, RegisterationSchemaType } from '@/Schema/Registeration.S';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';
import { styleText } from 'util';

function Signup() {

  const router = useRouter();
  const form = useForm <RegisterationSchemaType>({
defaultValues: {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  },
  resolver:zodResolver(RegisterationSchema)
  })
  
  async function handleRegister(values : RegisterationSchemaType){
try {
  const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
  console.log(data);
  toast.success(data.message)
  router.push("/login")
} catch (error : AxiosError | any) {
  console.log(error);
  toast.error(error.response.data.message || "An error occurred" , {duration: 4000 , position: "top-center"})

  
}

  }

  // 
  return (
    <>
    <div className='mx-auto px-5 md:px-0 w-full my-12 md:w-1/2'>
    <h1 className='text-2xl font-bold text-center'>Signup</h1>
    <Form {...form}>
 <form onSubmit={form.handleSubmit(handleRegister)} className='space-y-5 mt-5'>
  {/* Name Field */}
  <FormField
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Name</FormLabel>
      <FormControl>
        <Input placeholder="name" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

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
  {/* Confirm Password Field */}
<FormField
  control={form.control}
  name="rePassword"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Confirm Password</FormLabel>
      <FormControl>
        <Input placeholder="Confirm Password" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

  {/* Phone Field */}
<FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Phone</FormLabel>
      <FormControl>
        <Input placeholder="phone number" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<Button className='w-full hover:translate-y-0.5' type='submit'>Sign Up Now</Button>
 </form>
</Form>
    </div>
    </>
  )
}

export default Signup