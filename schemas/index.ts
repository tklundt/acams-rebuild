import * as z from "zod";

// Validation schemas sending stuff TO the db

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1,{
        message: "Password is required",
    })
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6,{
        message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
});

export const AssetSchema = z.object({
    type: z.string(),
    status: z.string(),
    usedBy: z.optional(z.string()),
    name: z.string(),
    description: z.optional(z.string()),
    condition: z.string()
});

export const TicketSchema = z.object({
    assetId: z.optional(z.string()),
    subject: z.string(),
    description: z.string(),
    adminNote: z.optional(z.string()),
    status: z.string(),
})

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
})
    .refine((data)=>{
        if(data.password && !data.newPassword){
            return false;
        }
        return true;
    }, {
        message: "New password is required",
        path:["newPassword"]
    })
    .refine((data)=>{
        if(data.newPassword && !data.password){
            return false;
        }
        return true;
    }, {
        message: "Password is required",
        path:["password"]
    })