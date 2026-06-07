import {z} from "zod";
//1. define the base shape of a product.
const productBodySchema = z.object({
        name: z.string({ required_error: "Product name is required" }).min(3, "Name must be at least 3 characters"),
        description: z.string().optional(),
        price: z.number({ required_error: "Price is required" }).nonnegative("Price cannot be negative"),
        condition: z.enum(["NEW", "LIKE NEW", "GOOD", "FAIR"]).optional(),
        category: z.enum(["PHONE", "ACCESSORY", "REPAIR"]),
        brand: z.string().optional(),
        stock: z.number().int().nonnegative().optional(),
        isAvailable: z.boolean().optional(),
        imageUrls: z.array(z.string().url("Must be a valid URL")).optional(),
})

//2. Schema for POST    requests (Updating a product