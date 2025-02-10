import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://dummyjson.com/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error..");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center text-lg">Yuklanmoqda...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-wrap justify-center p-4 bg-gray-100 min-h-screen">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 m-2 rounded-lg shadow-lg w-80 h-[600px]">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-[100%] h-80 object-cover rounded-md"
          />
          <h2 className="text-xl font-bold mt-2">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center justify-between">
          <p className="text-lg font-semibold mt-2">${product.price}</p>
          <p className="text-sm text-gray-500">Rating: {product.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
