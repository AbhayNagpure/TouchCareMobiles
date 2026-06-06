import {z} from "zod";

export const createProductSchema = z.object({
    body: z.object({
        name: z.string({required_error: "Product name is required" }).min(3, "Name must be atleast 3 characters"),
        description: z.string().optional(),
        price: z.number({ required_error: "Price is required "}).positive("Price must be a positive number"),
        category: z.enum(["PHONE", "ACCESSORY", "REPAIR"]),
    })
})

