import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Search, Edit, Trash2 } from "lucide-react";

const InventoryList = ({ 
  products, 
  isLoadingProducts, 
  fetchProducts, 
  handleEditClick, 
  handleDelete 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
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
  );
};

export default InventoryList;
