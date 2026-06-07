import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When you are ready to connect to backend, this is already wired up!
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/v1/products');
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
      <div className="flex justify-between items-end mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Our Inventory</h1>
        <Badge variant="secondary" className="text-sm">
          {products.length} Items
        </Badge>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p>No products available right now. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Card key={product._id} className="flex flex-col hover:shadow-md transition-shadow">
              <CardHeader className="p-0">
                <div className="w-full aspect-square bg-muted rounded-t-xl overflow-hidden relative">
                  {product.imageUrls && product.imageUrls[0] ? (
                    <img 
                      src={product.imageUrls[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                  <Badge className="absolute top-2 right-2 bg-white/90 text-black hover:bg-white">
                    {product.condition}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <div className="text-xs text-muted-foreground mb-1 font-medium tracking-wider uppercase">
                  {product.brand || product.category}
                </div>
                <CardTitle className="text-lg leading-tight mb-2">{product.name}</CardTitle>
                <div className="text-xl font-bold text-blue-600">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full font-semibold rounded-full" size="lg">
                  Chat to Buy
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Store;
