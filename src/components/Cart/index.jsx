import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { fetchProducts } from '@/api/fetchProducts';
import Image from 'next/image';

export default function CartContainer({ isOpen, onClose, total }) {
  const cartRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);

  const updateCartTotal = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    setCartTotal(total);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedData = await fetchProducts(); 
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
        const productsInCart = storedCartItems.map((cartItem) => {
          const product = fetchedData.find(prod => prod.idProd === cartItem.id);
          return product ? { ...product, ...cartItem } : null;
        }).filter(item => item !== null);
        setCartProducts(productsInCart);
        setLoading(false);
        updateCartTotal(storedCartItems);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    if (isOpen) {
      getProducts();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      cartRef.current.style.transform = 'translateX(0)';
    } else {
      cartRef.current.style.transform = 'translateX(100%)';
    }
  }, [isOpen]);

  const getProductName = (id) => {
    const product = cartProducts.find((prod) => prod.idProd === id);
    return product ? product.nom : 'Unknown Product';
  };

  const getProductImage = (id) => {
    const product = cartProducts.find((prod) => prod.idProd === id);
    return product ? product.images[0].img : 'default-image.jpg';
  };

  const handleQuantityChange = (id, selectedOptionTissue, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id && item.selectedOptionTissue === selectedOptionTissue) {
        return { ...item, quantity: newQuantity, totalPrice: item.totalPrice / item.quantity * newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    updateCartTotal(updatedCartItems);
  };

  const handleRemoveItem = (id, selectedOptionTissue) => {
    const updatedCartItems = cartItems.filter((item) => !(item.id === id && item.selectedOptionTissue === selectedOptionTissue));
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    updateCartTotal(updatedCartItems);
  };

  return (
    <div className={styles.cartContainer} ref={cartRef}>
      <div className={styles.headerContainer}>
        <div className={styles.cartTitle}>
          <h1 className={styles.cartH1}>Cart</h1>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={26} height={26} fill="currentColor">
            <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth=".5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className={styles.cartItemsContainer}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p className={styles.emptyCartText}>Your cart is empty.</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={`${item.id}-${item.selectedOptionTissue}`} className={styles.cartItem}>
              <div className={styles.productImageCart}>
                <Image width={500} height={500}
                  src={getProductImage(item.id)}
                  alt={getProductName(item.id)}
                  className={styles.imgCart}
                />
              </div>
              <div className={styles.tableGrid}>
                <div className={styles.itemInfo}>
                  <p>{getProductName(item.id)}</p>
                  <p>Option: {item.selectedOptionTissue}</p>
                  {/*<p>Prix Unité: {item.totalPrice / item.quantity} <span className={styles.tnworddesign}>TND</span></p>*/}
                  <p>prix: {item.totalPrice} <span className={styles.tnworddesign}>TND</span></p>
                </div>
                <div className={styles.itemActions}>
                  <div className={styles.quantityController}>
                    <button className={styles.minusButton}
                      onClick={() => handleQuantityChange(item.id, item.selectedOptionTissue, item.quantity - 1)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
                    </button>
                    <span className={styles.quantityValue}>{item.quantity}</span>
                    <button className={styles.plusButton}
                      onClick={() => handleQuantityChange(item.id, item.selectedOptionTissue, item.quantity + 1)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                    </button>
                  </div>
                  <button className={styles.removeButton} onClick={() => handleRemoveItem(item.id, item.selectedOptionTissue)}>Remove</button>
                </div>
              </div>
            </div>
          ))
        )}
        {cartItems.length > 0 && (
          <div className={styles.totalPrice}>
            <p className={styles.totalPriceText}>Total:</p>
            <p className={styles.totalPriceTextValue}>
              <span className={styles.tot}>{cartTotal}</span>
              <span className={styles.tnworddesign}>TND</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
