"use client";
import SelectBox from '@/components/SelectBox';
import SelectBoxDim from '@/components/SelectBoxDimension'
import SelectBoxMousse from '@/components/SelectBoxMousse'
import Footer from '@/components/NewFooter/Footer';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { scaleVariants, heartAnimVariants } from './anim.js'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from './ProductPage.module.scss';
import Accordion from '@/components/ProductPageComponents/Accordion';
import { fetchProducts } from '../../../api/fetchProducts';
import RecentProductsClicked from '@/components/LivingComponents/RecentProductsClicked';
import RecommendedProducts from '@/components/RecommendationSystem';
import Link from 'next/link';
import { FiCopy } from "react-icons/fi";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const WhiteHeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(48, 48, 48, 0.8)"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '24px', height: '24px' }}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);
const PinkHeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="rgba(167, 11, 11)"
    stroke="rgba(167, 11, 11)"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '24px', height: '24px' }}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const ProductPage = ({ params }) => {
  const [recommendedProductsCategory, setRecommendedProductsCategory] = useState('');
  const [data, setData] = useState([]);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showTooltips, setShowTooltips] = useState(false);
  const [selectedImageIndexCarousel, setSelectedImageIndexCarousel] = useState(0);
  const [likedImage, setLikedImage] = useState(false);
  const [isFavorisFilled, setIsFavorisFilled] = useState(false);
  const [showShareBar, setShowShareBar] = useState(false);
  const [triggerHeartAnim, settriggerHeartAnim] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const websiteURL = encodeURIComponent(window.location.href);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedOptionTissue, setSelectedOptionTissue] = useState('T1');

  const [titleOptionSelect1, settitleOptionSelect1] = useState("Dimensions");
  const [titleOptionSelect2, settitleOptionSelect2] = useState('');

  const [selectedPricesecond, setSelectedPricesecond] = useState(0);
  const [selectedPriceMousse, setSelectedPriceMousse] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleOptionSelect = (option) => {
    setSelectedPrice(parseFloat(option.prix_option));
  };
  const updateSelectedPrice = (option) => {
    setSelectedPricesecond(parseFloat(option.prix_option));
    setSelectedOptionTissue(option.option_name)
  };
  const updateSelectedPriceMousse = (option) => {
    setSelectedPriceMousse(parseFloat(option.mousse_prix));
  };
  

  useEffect(() => {
    settotalPrice((parseFloat(selectedPrice) + parseFloat(selectedPricesecond)+ parseFloat(selectedPriceMousse)));
  }, [selectedPrice, selectedPricesecond, selectedPriceMousse]);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(websiteURL);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const handleShareClick = () => {
    setShowShareBar(!showShareBar);
  };
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(window.location.href)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
  const messengerShareUrl = `fb-messenger://share/?link=${encodeURIComponent(window.location.href)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`;
  const handleFavorisClick = () => {
    setIsFavorisFilled(!isFavorisFilled);
  };
  const handleHeartClick = () => {
    setLikedImage(!likedImage);
    if (likedImage == false){
      settriggerHeartAnim(true);
      setTimeout(() => {
        settriggerHeartAnim(false);
      }, 400);
    }
  };
  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedData = await fetchProducts();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
  }, []);
  useEffect(() => {
    if (params.id) {
      const productData = data.find((item) => item.idProd === params.id);
      if (productData) {
        setProduct(productData);
        settotalPrice(productData.minPrice);
        setSelectedPrice(productData.minPrice);
        if (productData.typeProd === 'LIT'){
          settitleOptionSelect1("Dimensions");
          settitleOptionSelect2("Tarification Tissus");
        }
        else if (productData.typeProd === 'salon'){
          settitleOptionSelect2("Tarification Tissus");
        }
        else if ((productData.typeProd === 'canape_angle')||(productData.typeProd === 'canape')){
          settitleOptionSelect2("Tarification Tissus");
        }
        setRecommendedProductsCategory(productData.categorie.trim());
        setMainImage(productData.images[0].img);
        setSelectedImageIndex(0);
      }
    }
  }, [params.id, data]);

  const handleAddToCart = () => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingProductIndex = existingCartItems.findIndex(
      item => item.id === params.id && item.selectedOptionTissue === selectedOptionTissue
    );
  
    if (existingProductIndex !== -1) {
      existingCartItems[existingProductIndex].quantity += quantity;
      existingCartItems[existingProductIndex].totalPrice += Number(totalPrice);
    } else {
      existingCartItems.push({
        id: params.id,
        quantity,
        totalPrice: Number(totalPrice),
        selectedOptionTissue,
      });
    }
  
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
  };
  
  
  /*
  const handleAddToCart = () => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingProductIndex = existingCartItems.findIndex(item => item.id === params.id);
    if (existingProductIndex !== -1) {
      existingCartItems[existingProductIndex].quantity += quantity;
    } else {
      existingCartItems.push({ id: params.id, quantity });
    }
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    // Emit custom event to notify that cart has been updated
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
  };
  */
  const handlePrev = () => {
    setShowTooltips(false);
    setSelectedImageIndexCarousel((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };
  const handleNext = () => {
    setShowTooltips(false);
    setSelectedImageIndexCarousel((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleDotClick = (index) => {
    setShowTooltips(false);
    setSelectedImageIndexCarousel(index);
  };
  const handleImageClick = (img, index) => {
    setMainImage(img);
    setSelectedImageIndex(index);
  };
  const handleMainImageClick = () => {
    setShowTooltips((prevState) => !prevState);
  };
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const overlayVariants = {
    initial: {
      opacity: 0,
      y: 20
  },
  enter: {
      y: 0,
      opacity: 1,
      transition: {
          duration: 0.3,
          ease: [1, 0.29, 0, 0.02],
      },
  },
  exit: {
      y: 20,
      opacity: 0,
      transition: {
          duration: 0.3,
          ease: [.72, .34, 0, 1.58],
      },
  },
  };
  if (!product) return <div className={styles.loadingDiv}><span className={styles.loadingText}>Loading...</span></div>;
  const renderTooltips = (hyperPoints, showTooltips) => {
    return (
      <AnimatePresence>
        {showTooltips &&
          hyperPoints.map((point, index) => (
            <motion.div
              key={index}
              className={styles.tooltipBox}
              style={{ top: `calc(${point.posY}% + 10px)`, left: `calc(${point.posX}% - 20px)` }}
              variants={scaleVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <div className={styles.tooltipContent}>
                <Link href={`/ProductPage/${point.produitID}`}>
                  <p className={styles.productName}>
                    {data.find((item) => item.idProd === point.produitID)?.nom}
                  </p>
                </Link>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    );
  };

  return (
    <>
      <Header sticky={true} />
      <div className={styles.productPage}>
        <div className={styles.imageGallery}>
          <div className={styles.scrollImages} style={{ position: 'relative' }}>
            {product.images.map((img, index) => (
              <div key={index} 
                className={`${styles.thumbnail} ${index === selectedImageIndex ? styles.selected : ''}`}
                onClick={() => handleImageClick(img.img, index)} 
                style={{ position: 'relative' }}
              >
                <Image 
                  className={styles.image} 
                  src={img.img} 
                  alt={`${product.nom} image ${index + 1}`} 
                  width={100} 
                  height={100} 
                  layout="responsive"
                />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          key={mainImage}
          className={styles.mainImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleMainImageClick}
        >
          
          <div className={styles.mainImageWrapper}>
            <Image
              src={mainImage}
              alt={product.nom}
              width={500}
              height={500}
              layout="responsive"
              className={styles.mainImageimg}
            />
            <AnimatePresence>
              {triggerHeartAnim && (
                <motion.div
                  className={styles.heart}
                  variants={heartAnimVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(243, 242, 236, 0.7)"
                    //stroke="rgba(243, 242, 236, 0.7)"
                    //strokeWidth="0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '100px', height: '100px' }}
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {renderTooltips(product.images[selectedImageIndex].hyperPoints, showTooltips)}
        </motion.div>

        <div className={styles.carouselContainer}>
          <div className={styles.barClick}>
            <p className={styles.barClicktext}>cliquer sur la photo</p>
          </div>
          <div className={styles.imageCarousel} >
            <div onClick={handleMainImageClick}>
              <Carousel 
                selectedItem={selectedImageIndexCarousel} 
                showArrows={false} 
                showIndicators={false} 
                showStatus={false}
                swipeable={true}
                emulateTouch={true}
                onChange={(index) => setSelectedImageIndexCarousel(index)}
              >

                {product.images.map((img, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <Image
                      src={img.img}
                      alt={`${product.nom} image ${index + 1}`}
                      width={500}
                      height={500}
                      layout="responsive"
                    />
                    {renderTooltips(product.images[selectedImageIndexCarousel].hyperPoints, showTooltips)}
                    <AnimatePresence>
                      {triggerHeartAnim && (
                        <motion.div
                          className={styles.heart}
                          variants={heartAnimVariants}
                          initial="initial"
                          animate="enter"
                          exit="exit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="rgba(243, 242, 236, 0.7)"
                            //stroke="rgba(243, 242, 236, 0.7)"
                            //strokeWidth="0"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ width: '100px', height: '100px' }}
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </Carousel>
            </div>
            <div className={styles.controlsContainer}>
            <button className={styles.arrow} onClick={handlePrev}>
              <span className={styles.leftArrow}></span>
            </button>
              {/* Pagination Dots */}
              <div className={styles.paginationDots}>
                {product.images.map((_, index) => (
                  <span 
                    key={index} 
                    className={`${styles.dot} ${index === selectedImageIndexCarousel ? styles.active : ''}`} 
                    onClick={() => handleDotClick(index)} // Dot click handler
                  />
                ))}
              </div>
              <button className={styles.arrow} onClick={handleNext}>
                <span className={styles.rightArrow}></span>
              </button>

              <div className={styles.heartButtonDiv}>
                <button onClick={handleHeartClick}>
                  {likedImage ? <PinkHeartIcon /> : <WhiteHeartIcon />}
                </button>
              </div>

              <div className={styles.shareButtonDiv}>
                <button onClick={handleShareClick}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="rgba(48, 48, 48, 0.8)" 
                    strokeWidth="1" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    style={{ width: '24px', height: '24px', transform: 'rotate(20deg)' }}>
                    <path d="M22 2L11 13"></path>
                    <path d="M22 2L15 22 11 13 2 9l20-7z"></path>
                  </svg>
                </button>
              </div>

              <div className={styles.favorisIcon} onClick={handleFavorisClick}>
                {isFavorisFilled ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(48, 48, 48, 0.8)"
                    stroke="rgba(48, 48, 48, 0.8)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '24px', height: '24px' }}
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                ) : (

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(48, 48, 48, 0.8)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '24px', height: '24px' }}
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                )}
              </div>

            </div>

          </div>
        </div>

        <div className={styles.productDetails}>
          <div className={styles.Productinfos}>
            <div className={styles.titleDiv}>
              <h1 className={styles.titleInfo}>{product.nom}</h1>
            </div>
            
            <div className={styles.priceDiv}>
              <p className={styles.priceInfo}>
                {selectedPrice === 0 && selectedPricesecond === 0 && (
                  <span className={styles.fromPrice}>From</span>
                )}
                <span className={styles.minmaxPrice}>{totalPrice}</span>
                <span className={styles.tnworddesign}>TND</span>
              </p>
            </div>

            <div className='flex'>
              <div className={styles.heartButtonDivDetail}>
                <button onClick={handleHeartClick}>
                  {likedImage ? <PinkHeartIcon /> : <WhiteHeartIcon />}
                </button>
              </div>

              <div className={styles.shareButtonDivDetail}>
                <button className={styles.shareButtonDivDet} onClick={handleShareClick}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="rgba(48, 48, 48, 0.8)" 
                    strokeWidth="1" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    style={{ width: '24px', height: '24px', transform: 'rotate(20deg)' }}>
                    <path d="M22 2L11 13"></path>
                    <path d="M22 2L15 22 11 13 2 9l20-7z"></path>
                  </svg>
                </button>
                <AnimatePresence>
                  {showShareBar && (
                    <motion.div
                      variants={overlayVariants}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                      className={styles.shareBarOverlay}
                    >
                      <div className={styles.shareBar}>
                        <button className={styles.closeBtn} onClick={handleShareClick}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={26}
                            height={26}
                            fill="currentColor"
                          >
                            <path
                              d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <h3 className={styles.shareText}>Share This Product</h3>
                    
                        <div className={styles.shareOptions}>
                        <Swiper
                          className={`${styles.swiperContainer} ${styles.swiperNavigation}`}
                          centeredSlides={false}
                          slidesPerView={3}
                          spaceBetween={0}
                          navigation
                          modules={[Navigation]}
                        >
                          
                          <SwiperSlide className={styles.swiperSlide}>
                            <a href={messengerShareUrl} target="_blank" rel="noopener noreferrer" className={styles.shareLink}>
                              <div className={styles.iconContainer}>
                                  <div className={styles.icon}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48" id="messenger">
                                      <path fill="url(#paint0_radial_147648_891)" d="M23.9979 0C10.4811 0 0 9.90512 0 23.2779C0 30.2733 2.86775 36.3208 7.53533 40.4964C7.9253 40.8444 8.16528 41.3363 8.17728 41.8643L8.30926 46.1359C8.35126 47.4978 9.75514 48.3857 11.003 47.8338L15.7666 45.7339C16.1686 45.554 16.6245 45.524 17.0505 45.638C19.2403 46.2379 21.5681 46.5619 23.9979 46.5619C37.5147 46.5619 47.9957 36.6568 47.9957 23.2839C47.9957 9.91112 37.5147 0 23.9979 0Z"></path>
                                      <path fill="#fff" d="M9.58715 30.0873L16.6365 18.9043C17.7584 17.1225 20.1582 16.6845 21.8441 17.9444L27.4536 22.15C27.9695 22.534 28.6775 22.534 29.1874 22.144L36.7587 16.3965C37.7667 15.6286 39.0865 16.8405 38.4146 17.9144L31.3592 29.0914C30.2373 30.8732 27.8375 31.3112 26.1517 30.0513L20.5422 25.8457C20.0262 25.4617 19.3183 25.4617 18.8083 25.8517L11.237 31.5992C10.2291 32.3671 8.90921 31.1612 9.58715 30.0873Z"></path>
                                      <defs>
                                      <radialGradient id="paint0_radial_147648_891" cx="0" cy="0" r="1" gradientTransform="matrix(52.2962 0 0 52.2961 9.24 47.734)" gradientUnits="userSpaceOnUse">
                                          <stop stop-color="#09F"></stop>
                                          <stop offset=".61" stop-color="#A033FF"></stop>
                                          <stop offset=".935" stop-color="#FF5280"></stop>
                                          <stop offset="1" stop-color="#FF7061"></stop>
                                      </radialGradient>
                                      </defs>
                                  </svg>
                                  </div>
                                  <span className={styles.shareText}>Messenger</span>
                              </div>
                            </a>
                          </SwiperSlide> 
                          <SwiperSlide className={styles.swiperSlide}>
                            <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" className={styles.shareLink}>
                              <div className={styles.iconContainer}>
                                  <div className={styles.icon}>
                                  <svg xmlns="http://www.w3.org/2000/svg"  
                                  fill="#25d366" 
                                  width={40}
                                  height={40}
                                  viewBox="0 0 240 241.19">
                                      <path class="cls-1" d="M205,35.05A118.61,118.61,0,0,0,120.46,0C54.6,0,1,53.61,1,119.51a119.5,119.5,0,0,0,16,59.74L0,241.19l63.36-16.63a119.43,119.43,0,0,0,57.08,14.57h0A119.54,119.54,0,0,0,205,35.07v0ZM120.5,219A99.18,99.18,0,0,1,69.91,205.1l-3.64-2.17-37.6,9.85,10-36.65-2.35-3.76A99.37,99.37,0,0,1,190.79,49.27,99.43,99.43,0,0,1,120.49,219ZM175,144.54c-3-1.51-17.67-8.71-20.39-9.71s-4.72-1.51-6.75,1.51-7.72,9.71-9.46,11.72-3.49,2.27-6.45.76-12.63-4.66-24-14.84A91.1,91.1,0,0,1,91.25,113.3c-1.75-3-.19-4.61,1.33-6.07s3-3.48,4.47-5.23a19.65,19.65,0,0,0,3-5,5.51,5.51,0,0,0-.24-5.23C99,90.27,93,75.57,90.6,69.58s-4.89-5-6.73-5.14-3.73-.09-5.7-.09a11,11,0,0,0-8,3.73C67.48,71.05,59.75,78.3,59.75,93s10.69,28.88,12.19,30.9S93,156.07,123,169c7.12,3.06,12.68,4.9,17,6.32a41.18,41.18,0,0,0,18.8,1.17c5.74-.84,17.66-7.21,20.17-14.18s2.5-13,1.75-14.19-2.69-2.06-5.7-3.59l0,0Z"/>
                                  </svg>
                                  </div>
                                  <span className={styles.shareText}>WhatsApp</span>
                              </div>
                            </a>
                          </SwiperSlide> 
                          <SwiperSlide className={styles.swiperSlide}>
                            <div className={styles.productCard}>
                              <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className={styles.shareLink}>
                                <div className={styles.iconContainer}>
                                    <div className={styles.icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 509 509"><g fill-rule="nonzero">
                                        <path fill="#0866FF" d="M509 254.5C509 113.94 395.06 0 254.5 0S0 113.94 0 254.5C0 373.86 82.17 474 193.02 501.51V332.27h-52.48V254.5h52.48v-33.51c0-86.63 39.2-126.78 124.24-126.78 16.13 0 43.95 3.17 55.33 6.33v70.5c-6.01-.63-16.44-.95-29.4-.95-41.73 0-57.86 15.81-57.86 56.91v27.5h83.13l-14.28 77.77h-68.85v174.87C411.35 491.92 509 384.62 509 254.5z"/>
                                        <path fill="#fff" d="M354.18 332.27l14.28-77.77h-83.13V227c0-41.1 16.13-56.91 57.86-56.91 12.96 0 23.39.32 29.4.95v-70.5c-11.38-3.16-39.2-6.33-55.33-6.33-85.04 0-124.24 40.16-124.24 126.78v33.51h-52.48v77.77h52.48v169.24c19.69 4.88 40.28 7.49 61.48 7.49 10.44 0 20.72-.64 30.83-1.86V332.27h68.85z"/></g>
                                    </svg>
                                    </div>
                                    <span className={styles.shareText}>Facebook</span>
                                </div>
                                </a>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide className={styles.swiperSlide}>
                            <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className={styles.shareLink}>
                              <div className={styles.iconContainer}>
                                  <div className={styles.icon}>
                                  <svg xmlns="http://www.w3.org/2000/svg" 
                                  shape-rendering="geometricPrecision" 
                                  text-rendering="geometricPrecision" image-rendering="optimizeQuality" 
                                  fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512">
                                      <path d="M256 0c141.385 0 256 114.615 256 256S397.385 512 256 512 0 397.385 0 256 114.615 0 256 0z"/><path fill="#fff" fill-rule="nonzero" d="M318.64 157.549h33.401l-72.973 83.407 85.85 113.495h-67.222l-52.647-68.836-60.242 68.836h-33.423l78.052-89.212-82.354-107.69h68.924l47.59 62.917 55.044-62.917zm-11.724 176.908h18.51L205.95 176.493h-19.86l120.826 157.964z"/>
                                  </svg>
                                  </div>
                                  <span className={styles.shareText}>Twitter</span>
                              </div>
                            </a>
                          </SwiperSlide>

                        </Swiper>
                        </div>

                        <div className={styles.shareLinkDiv}>
                          <div className={styles.urlContainer}>
                            <span className={styles.urlText}>{websiteURL}</span>
                            <button className={styles.copyButton} onClick={handleCopy}>
                              <FiCopy className={styles.copyIcon} />
                              {isCopied ? "Copied!" : "Copy"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  
                  )}
                </AnimatePresence>
              </div>

              <div className={styles.favorisIconDetail} onClick={handleFavorisClick}>
                  {isFavorisFilled ? (
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(48, 48, 48, 0.8)"
                    stroke="rgba(48, 48, 48, 0.8)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '24px', height: '24px' }}
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                ) : (

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(48, 48, 48, 0.8)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '24px', height: '24px' }}
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                  )}
              </div>

            </div>
          </div>
          
          <div className={styles.Description}>
            <p className={styles.DescriptionP}>{product.description}</p>
          </div>
          
          {product?.sizes?.length > 0 && (
            <SelectBoxDim titleOptionSelect={titleOptionSelect1} optionsDim={product.sizes} onOptionSelect={handleOptionSelect} />
          )}

          {product?.options?.length > 0 && (
            <SelectBox titleOptionSelect={titleOptionSelect2} options={product.options} updateSelectedPrice={updateSelectedPrice} />
          )}

          <br />
          {product?.mousse?.length > 0 && (
            <SelectBoxMousse titleOptionSelect={"Mousse"} options={product.mousse} updateSelectedPriceMousse={updateSelectedPriceMousse} />
          )}

          
          {product?.typeProd === "LIT" && (
            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className={styles.checkbox}
                />
                <span className={styles.customCheckbox}></span>
                Avec Coffre
              </label>
            </div>
          )}



          <div className={styles.FullquantityDiv}>
            <div className={styles.quantityController}>
              <div className={styles.minusDiv} onClick={decreaseQuantity}>
                <button className={styles.quantityBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.minusIcon}
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      >
                  <path d="M5 12h14" />
                  </svg>
                </button>
              </div>
              <div className={styles.quantityDiv}>
                <span className={styles.quantityDisplay}>{quantity}</span>
              </div>
              <div className={styles.plusDiv} onClick={increaseQuantity}>
                <button className={styles.quantityBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.plusIcon}
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                      strokeLinecap="round" 
                      strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.addToCart}>
            <button className={styles.addToCartBTN} onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
          <div className={styles.AccordionDiv}>
            <Accordion />
          </div>
        </div>
      </div>
      <RecommendedProducts productCategorie={recommendedProductsCategory} allProducts={data} />
      <RecentProductsClicked />
      <Footer />
    </>
  );
};
export default ProductPage;