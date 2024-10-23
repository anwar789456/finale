'use client';
import { React, useEffect, useState } from 'react';
import styles from './style.module.scss';
import Products from '../Products/Products';
import { fetchProducts } from '../../../api/fetchProducts';

export default function Background({ subcategory, filterData, sortingOption, priceRange }) {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const fetchedData = await fetchProducts();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const category = subcategory.shopping;
  const isSubcategory = category.includes('-');

  // First filter by category or subcategory
  const filteredByCategory = isSubcategory
    ? Data.filter(product => product.categorie === category)
    : Data.filter(product => product.subcategorie === category);

  // Second filter by disponibilite only if filterData is not "all"
  const filteredProducts = filterData === 'all' 
    ? filteredByCategory 
    : filteredByCategory.filter(product => product.disponibilite === filterData);

  // Filter out products with display: 'non'
  const productsWithoutNonDisplay = filteredProducts.filter(product => product.display !== 'non');

  // Check if priceRange is valid and filter products based on minPrice
  const finalFilteredProducts = priceRange && typeof priceRange.min === 'number' && typeof priceRange.max === 'number'
    ? productsWithoutNonDisplay.filter(product => product.minPrice >= priceRange.min && product.minPrice <= priceRange.max)
    : productsWithoutNonDisplay;

  // Sort the final filtered products based on the sortingOption
  const sortedProducts = finalFilteredProducts.sort((a, b) => {
    const order = sortingOption === 'descending' ? -1 : 1;
    return (a.minPrice - b.minPrice) * order;
  });

  return (
    <div className={styles.container}>
      <div className={styles.background_container}>
        {loading ? (
          <div className={styles.loader}></div> 
        ) : ( 
          <Products products={sortedProducts} />
        )}
      </div>
    </div>
  );
}
