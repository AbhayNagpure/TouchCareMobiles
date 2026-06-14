import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Camera, X, Loader2 } from "lucide-react";

const ProductForm = ({
  formData,
  setFormData,
  handleSubmit,
  isSubmitting,
  editingId,
  handleInputChange,
  handleImageUpload,
  handleBeforeUpload,
  handleAfterUpload,
  removeImage
}) => {
  return (
    <Card className="border-border/50 shadow-md">
      <CardHeader className="bg-muted/30 border-b border-border/50 pb-6 mb-6">
        <CardTitle className="text-2xl">{editingId ? 'Edit Product' : 'Add New Product'}</CardTitle>
        <CardDescription>Upload photos directly from your phone camera or gallery.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Category Selection */}
          <div className="space-y-1.5 w-full sm:max-w-md bg-muted/20 p-4 rounded-xl border border-border/50 shadow-sm">
            <Label htmlFor="category" className="text-base font-bold">Category <span className="text-red-500">*</span></Label>
            <p className="text-xs text-muted-foreground mb-3">Select the category first. The form will adjust automatically.</p>
            <select 
              id="category" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-medium"
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

          <div className="flex flex-col xl:flex-row gap-8">
            {/* Image Upload Section */}
            <div className="w-full xl:w-1/3 space-y-4">
              {formData.category === 'REPAIR' ? (
                <>
                  <div>
                    <Label className="text-base font-semibold">Before & After Photos</Label>
                    <p className="text-xs text-muted-foreground mt-1">Upload the broken device photo (Before) and the fixed device photo (After).</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Before Box */}
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-red-500 uppercase tracking-wider">Before</Label>
                      {formData.imageUrls[0] ? (
                        <div className="relative aspect-square rounded-xl overflow-hidden border border-border group bg-muted/30">
                          <img src={formData.imageUrls[0]} alt="Before" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              const newUrls = [...formData.imageUrls];
                              newUrls[0] = null;
                              setFormData({...formData, imageUrls: newUrls});
                            }}
                            className="absolute top-1.5 right-1.5 bg-black/50 text-white p-1 rounded-full hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100 md:opacity-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <Label htmlFor="before-upload" className="aspect-square rounded-xl border-2 border-dashed border-red-500/30 hover:border-red-500/50 hover:bg-red-50/50 dark:hover:bg-red-500/10 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                          <Camera className="w-8 h-8 text-red-400 group-hover:text-red-500 mb-2" />
                          <span className="text-xs text-red-400 group-hover:text-red-500 font-medium text-center px-2">Add Before Photo</span>
                          <input id="before-upload" type="file" accept="image/*" className="hidden" onChange={handleBeforeUpload} />
                        </Label>
                      )}
                    </div>
                    {/* After Box */}
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-emerald-500 uppercase tracking-wider">After</Label>
                      {formData.imageUrls[1] ? (
                        <div className="relative aspect-square rounded-xl overflow-hidden border border-border group bg-muted/30">
                          <img src={formData.imageUrls[1]} alt="After" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              const newUrls = [...formData.imageUrls];
                              newUrls[1] = null;
                              setFormData({...formData, imageUrls: newUrls});
                            }}
                            className="absolute top-1.5 right-1.5 bg-black/50 text-white p-1 rounded-full hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100 md:opacity-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <Label htmlFor="after-upload" className="aspect-square rounded-xl border-2 border-dashed border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-500/10 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                          <Camera className="w-8 h-8 text-emerald-400 group-hover:text-emerald-500 mb-2" />
                          <span className="text-xs text-emerald-400 group-hover:text-emerald-500 font-medium text-center px-2">Add After Photo</span>
                          <input id="after-upload" type="file" accept="image/*" className="hidden" onChange={handleAfterUpload} />
                        </Label>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label className="text-base font-semibold">Product Images</Label>
                    <p className="text-xs text-muted-foreground mt-1">Upload at least one photo of the item.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                    {formData.imageUrls.filter(url => url).map((url, index) => (
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
                </>
              )}
            </div>

            {/* Form Fields */}
            <div className="w-full xl:w-2/3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                {formData.category === 'REPAIR' ? (
                  <>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="name" className="text-sm">Customer Name <span className="text-red-500">*</span></Label>
                      <Input id="name" placeholder="e.g. John Doe (iPhone 13)" required value={formData.name} onChange={handleInputChange} className="h-9 font-medium" />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2 mt-1">
                      <Label htmlFor="description" className="text-sm">What problem was fixed? <span className="text-red-500">*</span></Label>
                      <Textarea id="description" placeholder="e.g. Replaced shattered OLED screen and restored true tone..." required value={formData.description} onChange={handleInputChange} className="h-24 resize-none text-sm" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="name" className="text-sm">Product Name <span className="text-red-500">*</span></Label>
                      <Input id="name" placeholder="e.g. iPhone 13 Pro Max (256GB)" required value={formData.name} onChange={handleInputChange} className="h-9 font-medium" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="price" className="text-sm">Price (₹) <span className="text-red-500">*</span></Label>
                      <Input id="price" type="number" min="0" placeholder="e.g. 45000" required value={formData.price} onChange={handleInputChange} className="h-9 font-bold text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="brand" className="text-sm">Brand</Label>
                      <Input id="brand" placeholder="e.g. Apple, Samsung" value={formData.brand} onChange={handleInputChange} className="h-9" />
                    </div>
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
                    <div className="space-y-1.5">
                      <Label htmlFor="stock" className="text-sm">Stock Quantity</Label>
                      <Input id="stock" type="number" min="0" value={formData.stock} onChange={handleInputChange} className="h-9" />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2 mt-1">
                      <Label htmlFor="description" className="text-sm">Description Details</Label>
                      <Textarea id="description" placeholder="Describe what's included, battery health, any defects..." value={formData.description} onChange={handleInputChange} className="h-20 resize-none text-sm" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50">
            <Button 
              type="submit" 
              className="w-full sm:w-auto px-8 h-12 text-base font-bold sm:float-right" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{editingId ? 'Updating...' : 'Creating...'}</>
              ) : (
                editingId ? 'Update Product' : 'Publish Product'
              )}
            </Button>
            <div className="clear-both"></div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
