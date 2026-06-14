import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import InventoryList from '../components/admin/InventoryList';
import ProductForm from '../components/admin/ProductForm';

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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const fetchProducts = async () => {
    try {
      setIsLoadingProducts(true);
      const response = await axios.get('/api/v1/products'); 
      const fetchedData = response.data.data || response.data.products || response.data;
      if (Array.isArray(fetchedData)) {
        setProducts(fetchedData);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]); 
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/api/v1/products/${productId}`, { withCredentials: true });
      toast.success('Product deleted successfully!');
      setProducts(products.filter(p => p._id !== productId)); 
    } catch (error) {
      toast.error('Failed to delete product.');
    }
  };

  const handleEditClick = (product) => {
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price || '',
      condition: product.condition || 'GOOD',
      category: product.category || 'PHONE',
      brand: product.brand || '',
      stock: product.stock || 1,
      imageUrls: product.imageUrls || []
    });
    setEditingId(product._id); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrls: [...prev.imageUrls, reader.result] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleBeforeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => {
        const newUrls = [...prev.imageUrls];
        newUrls[0] = reader.result;
        return { ...prev, imageUrls: newUrls };
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAfterUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => {
        const newUrls = [...prev.imageUrls];
        newUrls[1] = reader.result;
        return { ...prev, imageUrls: newUrls };
      });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = { ...formData };
      if (formData.category !== 'REPAIR') {
        payload.price = Number(formData.price);
        payload.stock = Number(formData.stock);
      } else {
        delete payload.price;
        delete payload.stock;
      }

      if (editingId) {
        await axios.put(`/api/v1/products/${editingId}`, payload, { withCredentials: true });
        toast.success('Product updated successfully!');
        setEditingId(null);
      } else {
        await axios.post('/api/v1/products', payload, { withCredentials: true });
        toast.success('Product created successfully!');
      }
      
      fetchProducts(); 
      setFormData({ 
        name: '', description: '', price: '', condition: 'GOOD', 
        category: 'PHONE', brand: '', stock: 1, imageUrls: [] 
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-extrabold text-foreground mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 lg:sticky lg:top-8">
          <InventoryList 
            products={products}
            isLoadingProducts={isLoadingProducts}
            fetchProducts={fetchProducts}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
          />
        </div>
        
        <div className="lg:col-span-2">
          <ProductForm 
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            editingId={editingId}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            handleBeforeUpload={handleBeforeUpload}
            handleAfterUpload={handleAfterUpload}
            removeImage={removeImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
