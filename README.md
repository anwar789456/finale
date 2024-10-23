This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.








Produits = [
    {
        id: "",

        Type prod: [""],

        nom: "",
        
        description: "",

        quantité: "",
        
        liste des images: [
            {
                img1,
                HyperPoints: [{produit, x, y}]
            }
        ],
        
        Price Range: ["min","max"],
        
        Dimensions: [
            {
                Longueur: "",
                Largeur: "",
                Hauteur: "",
                profondeur assise: "",
            }
        ],

        Declinaison: [""],
        
        enStock: ""; oui ou non (depandant of quantity)
        
        display : "", oui ou non

        surCommande: "oui",

        options: [{
            option:{
                nom : "T2",
                additional price : "40"
            },
            option:{
                nom : "T3",
                additional price : "80"
            },
            option:{
                nom : "T4",
                additional price : "120"
            },
            option:{
                nom : "T5",
                additional price : "160"
            },
            option:{
                nom : "T6",
                additional price : "200"
            },
            option:{
                nom : "T7",
                additional price : "240"
            },
            option:{
                nom : "T8",
                additional price : "280"
            },
            option:{
                nom : "T9",
                additional price : "230"
            },
        }]
    }
]


    <Swiper
        className={styles.swiperContainer}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={15}
        freeMode={true}
        modules={[FreeMode]}
        
        /*pagination={{
          dynamicBullets: true,
          clickable: true,
        }}*/
        //modules={[Pagination]}
        
        breakpoints={{
          '@0.00': {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          '@0.75': {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          '@1.00': {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          '@1.50': {
            slidesPerView: 6,
            spaceBetween: 15,
          },
        }}
        >
        
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

          <SwiperSlide>
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

          <SwiperSlide>
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


          <SwiperSlide>
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

      </Swiper>

