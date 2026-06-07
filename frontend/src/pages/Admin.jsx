import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    condition: 'GOOD',
    category: 'PHONE',
    brand: '',
    stock: 1
  });
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    // In a real app, you would get this from your auth state/context
    const dummyAdminToken = "YOUR_BEARER_TOKEN_HERE"; 

    try {
      const response = await axios.post('/api/v1/products', {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      }, {
        headers: {
          Authorization: `Bearer ${dummyAdminToken}`
        }
      });
      
      setStatus({ type: 'success', message: 'Product created successfully!' });
      // Reset form
      setFormData({ name: '', price: '', condition: 'GOOD', category: 'PHONE', brand: '', stock: 1 });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Something went wrong';
      setStatus({ type: 'error', message: errorMessage });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h3 className="text-xl font-bold text-blue-900">Inventory</h3>
          <p className="text-blue-700 text-sm mt-1">Manage your active products</p>
        </div>
        <div className="bg-muted p-6 rounded-2xl border border-border opacity-50 cursor-not-allowed">
          <h3 className="text-xl font-bold text-foreground">Live Chat</h3>
          <p className="text-muted-foreground text-sm mt-1">Coming soon (Socket.io)</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>Add a new second-hand phone, accessory, or repair service to your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {status && (
              <div className={`p-4 rounded-lg text-sm font-medium ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {status.message}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input id="name" placeholder="e.g. iPhone 13 Pro" required value={formData.name} onChange={handleInputChange} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input id="price" type="number" min="0" placeholder="45000" required value={formData.price} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" placeholder="e.g. Apple" value={formData.brand} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input id="stock" type="number" min="0" value={formData.stock} onChange={handleInputChange} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select 
                  id="category" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={formData.category} 
                  onChange={handleInputChange}
                >
                  <option value="PHONE">Phone</option>
                  <option value="ACCESSORY">Accessory</option>
                  <option value="REPAIR">Repair Service</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <select 
                  id="condition" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={formData.condition} 
                  onChange={handleInputChange}
                >
                  <option value="NEW">New</option>
                  <option value="LIKE NEW">Like New</option>
                  <option value="GOOD">Good</option>
                  <option value="FAIR">Fair</option>
                </select>
              </div>
            </div>

            <Button type="submit" className="w-full">Create Product</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
