"use client";
import Header from "@/components/Header";
import styles from './page.module.scss';
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/NewFooter/Footer';

export default function Contact() {
  return (
    <> 
        <Header sticky={true} />
        <div className={styles.containerContact}>
            <ContactForm />
        </div>
        <Footer/>
    </>
  )
}

