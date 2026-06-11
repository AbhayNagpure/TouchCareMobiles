import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Camera, X, ImagePlus, Loader2, Trash2, Edit, RefreshCw, Search } from "lucide-react";
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    condition: 'GOOD',
    category: 'PHONE',
    brand: '',
    stock: 1,
    imageUrls: []
  });
  
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const fetchProducts = async () => {
      try {
        setIsLoadingProducts(true);
        const response = await axios.get('/api/v1/products'); 
        
        // Try to get the array from common backend structures (like response.data.data)
        const fetchedData = response.data.data || response.data.products || response.data;
        
        // Ensure we ONLY set an array in our state
        if (Array.isArray(fetchedData)) {
          setProducts(fetchedData);
        } else {
          console.error("Expected an array of products, but got:", fetchedData);
          setProducts([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]); // Fallback to empty array on error
      } finally {
        setIsLoadingProducts(false);
      }
    };
 
    useEffect(() => {
      fetchProducts();
    }, []);

    
    const handleDelete = async (productId) => {
      if (!window.confirm("Are you sure you want to delete this product?")) return;
      
      try {
        // Adjust URL if needed
        await axios.delete(`/api/v1/products/${productId}`, { withCredentials: true });
        setStatus({ type: 'success', message: 'Product deleted successfully!' });
        // Remove product from UI immediately
        setProducts(products.filter(p => p._id !== productId)); 
      } catch (error) {
        setStatus({ type: 'error', message: 'Failed to delete product.' });
      }
    };

    const handleEditClick = (product) => {
      // Populate the form with the product's data
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price,
        condition: product.condition || 'GOOD',
        category: product.category || 'PHONE',
        brand: product.brand || '',
        stock: product.stock || 1,
        imageUrls: product.imageUrls || []
      });
      setEditingId(product._id); // Mark that we are editing this specific product
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll up to the form
    };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  // Convert image to Base64
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageUrls: [...prev.imageUrls, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      if (editingId) {
        // UPDATE existing product
        await axios.put(`/api/v1/products/${editingId}`, {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        }, { withCredentials: true });
        
        setStatus({ type: 'success', message: 'Product updated successfully!' });
        setEditingId(null); // Clear editing state
      } else {
        // CREATE new product (your existing code)
        await axios.post('/api/v1/products', {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        }, { withCredentials: true });
        
        setStatus({ type: 'success', message: 'Product created successfully!' });
      }
      
      // Refresh the product list
      fetchProducts(); 
      
      // Reset form
      setFormData({ 
        name: '', description: '', price: '', condition: 'GOOD', 
        category: 'PHONE', brand: '', stock: 1, imageUrls: [] 
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Something went wrong';
      setStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-extrabold text-foreground mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Inventory List */}
        <div className="lg:col-span-1 lg:sticky lg:top-8">
          <div className="bg-white dark:bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col h-[500px] lg:h-auto lg:max-h-[calc(100vh-6rem)]">
            <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-foreground">Inventory</h3>
            <Button variant="outline" size="sm" onClick={fetchProducts} disabled={isLoadingProducts}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingProducts ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-9 bg-muted/50" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="overflow-y-auto flex-1 min-h-0 pr-2 space-y-3 custom-scrollbar">
            {isLoadingProducts ? (
              <p className="text-sm text-muted-foreground">Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No products found.</p>
            ) : (
              filteredProducts.map((product) => (
                <div key={product._id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    {product.imageUrls && product.imageUrls[0] && (
                      <img src={product.imageUrls[0]} alt={product.name} className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
                    )}
                    <div className="truncate">
                      <p className="text-sm font-semibold truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">₹{product.price} • Stock: {product.stock}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 ml-2">
                    <Button size="icon" variant="ghost" onClick={() => handleEditClick(product)}>
                      <Edit className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(product._id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          </div>
        </div>
        

        {/* Right Column: Form */}
        <div className="lg:col-span-2">
          <Card className="border-border/50 shadow-md">
        <CardHeader className="bg-muted/30 border-b border-border/50 pb-6 mb-6">
          <CardTitle className="text-2xl">Add New Product</CardTitle>
          <CardDescription>Upload photos directly from your phone camera or gallery.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {status && (
              <div className={`p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${status.type === 'error' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-900/50' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50'}`}>
                {status.message}
              </div>
            )}

            <div className="flex flex-col xl:flex-row gap-8">
              
              {/* Left Column: Image Upload Section */}
              <div className="w-full xl:w-1/3 space-y-4">
                <div>
                  <Label className="text-base font-semibold">Product Images</Label>
                  <p className="text-xs text-muted-foreground mt-1">Upload at least one photo of the item.</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                  
                  {formData.imageUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-border group bg-muted/30">
                      <img src={url} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1.5 right-1.5 bg-black/50 text-white p-1 rounded-full hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100 md:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <Label 
                    htmlFor="image-upload" 
                    className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-500/10 flex flex-col items-center justify-center cursor-pointer transition-colors group"
                  >
                    <Camera className="w-8 h-8 text-muted-foreground group-hover:text-blue-500 mb-2" />
                    <span className="text-xs text-muted-foreground group-hover:text-blue-500 font-medium">Add Photo</span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </Label>

                </div>
              </div>

              {/* Right Column: Form Fields */}
              <div className="w-full xl:w-2/3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                  
                  {/* Product Name (Full Width) */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="name" className="text-sm">Product Name <span className="text-red-500">*</span></Label>
                    <Input id="name" placeholder="e.g. iPhone 13 Pro Max (256GB)" required value={formData.name} onChange={handleInputChange} className="h-9 font-medium" />
                  </div>

                  {/* Price */}
                  <div className="space-y-1.5">
                    <Label htmlFor="price" className="text-sm">Price (₹) <span className="text-red-500">*</span></Label>
                    <Input id="price" type="number" min="0" placeholder="e.g. 45000" required value={formData.price} onChange={handleInputChange} className="h-9 font-bold text-blue-600 dark:text-blue-400" />
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <Label htmlFor="category" className="text-sm">Category <span className="text-red-500">*</span></Label>
                    <select 
                      id="category" 
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.category} 
                      onChange={handleInputChange}
                    >
                      <option value="PHONE">Phone</option>
                      <option value="ACCESSORY">Accessory</option>
                      <option value="REPAIR">Repair Service</option>
                      <option value="PART">Part</option>
                      <option value="LAPTOP">Laptop</option>
                    </select>
                  </div>

                  {/* Brand */}
                  <div className="space-y-1.5">
                    <Label htmlFor="brand" className="text-sm">Brand</Label>
                    <Input id="brand" placeholder="e.g. Apple, Samsung" value={formData.brand} onChange={handleInputChange} className="h-9" />
                  </div>

                  {/* Condition */}
                  <div className="space-y-1.5">
                    <Label htmlFor="condition" className="text-sm">Condition</Label>
                    <select 
                      id="condition" 
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.condition} 
                      onChange={handleInputChange}
                    >
                      <option value="NEW">New</option>
                      <option value="LIKE NEW">Like New</option>
                      <option value="GOOD">Good</option>
                      <option value="FAIR">Fair</option>
                    </select>
                  </div>

                  {/* Stock */}
                  <div className="space-y-1.5">
                    <Label htmlFor="stock" className="text-sm">Stock Quantity</Label>
                    <Input id="stock" type="number" min="0" value={formData.stock} onChange={handleInputChange} className="h-9" />
                  </div>
                  
                  {/* Empty slot to balance the grid if needed, or we just let description take full width */}
                  <div className="hidden sm:block"></div>

                  {/* Description (Full Width) */}
                  <div className="space-y-1.5 sm:col-span-2 mt-1">
                    <Label htmlFor="description" className="text-sm">Description Details</Label>
                    <Textarea id="description" placeholder="Describe what's included, battery health, any defects..." value={formData.description} onChange={handleInputChange} className="h-20 resize-none text-sm" />
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Footer / Submit Button */}
            <div className="pt-4 border-t border-border/50">
              <Button 
                type="submit" 
                className="w-full sm:w-auto px-8 h-12 text-base font-bold sm:float-right" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Publish Product'
                )}
              </Button>
              <div className="clear-both"></div>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
      </div>
    </div>
  );
};

export default Admin;

