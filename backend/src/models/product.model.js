import mongoose  from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: function() { return this.category !== 'REPAIR'; },
        min: 0,
    },
    condition: {
        type: String,
        enum: ["NEW", "LIKE NEW", "GOOD", "FAIR"],
        default: "GOOD",
    },
    category: {
        type: String,
        enum: ["PHONE", "ACCESSORY", "REPAIR"],
    },
    brand: {
        type: String,
        trim: true,
    },
    stock: {
        type: Number,
        default: 1,
        min: 0,
    },
    imageUrls: {
        type: [String], //array of strings for image links.
        default: [],
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
},
    { timestamps: true } //Automatically adds createdAt and updatedAt 
);

export const Product = mongoose.model("Product", productSchema);