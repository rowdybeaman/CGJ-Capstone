import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import './Product.css';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(response => {
        setProduct(response.data.product);
        setRelatedProducts(response.data.relatedProducts);
      })
      .catch(error => console.error(error));
  }, [id]);

  return (
    <div className="product">
      <div className="product-details">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        {/* other product details */}
      </div>
      <div className="related-products">
        {relatedProducts.map(relatedProduct => (
          <ProductCard key={relatedProduct.id} product={relatedProduct} />
        ))}
      </div>
    </div>
  );
}

export default Product;
