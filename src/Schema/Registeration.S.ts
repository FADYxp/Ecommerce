import z from "zod";

export const RegisterationSchema = z.object({
    name: z.string().min(2 , "Name must be at least 2 characters long").max(15 , "Name must be at most 15 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(6,"Password must be at least 6 characters long").max(20,"Password must be at most 20 characters long"),
    rePassword: z.string().min(6,"Confirm Password must be at least 6 characters long").max(20,"Confirm Password must be at most 20 characters long"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Phone number must be 10 digits long"),
}).refine(function (object) {
    if (object.password === object.rePassword) {
        return true;
    }
    return false
 }, { path: ["rePassword"], error: "Passwords do not match"});





export type RegisterationSchemaType = z.infer<typeof RegisterationSchema>;
