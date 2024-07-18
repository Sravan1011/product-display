"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export default function Products() {
  const [products, setProducts] = useState<Product[]>([]); 

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get<Product[]>('https://fakestoreapi.com/products'); 
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    
    <div className="container mx-auto my-10">
      
      <h2 className="text-3xl mb-6">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
         <div key={product.id} className="border p-4 rounded-md bg-white dark:bg-gray-800">
         <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
         <h3 className="text-xl mb-2 text-black dark:text-white">{product.title}</h3>
         <p className="text-gray-700 mb-4 dark:text-gray-300">{product.description}</p>
         <p className="text-gray-900 font-bold mb-2 dark:text-gray-200">${product.price}</p>
         <p className="text-yellow-500">Rating: {product.rating.rate} / 5</p>
       </div>
       
        ))}
      </div>
    </div>
  );
}
