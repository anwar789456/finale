'use client';
import { useState } from 'react';
import styles from './style.module.scss';

export default function Index() {
    // State to manage form data
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        tel: '',
        message_user: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://51.91.56.10:5000/submit-chatlog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Form submitted successfully!');
                // Reset form data
                setFormData({ nom: '', email: '', tel: '', message_user: '' });
            } else {
                const errorData = await response.json();
                alert(`Failed to submit the form: ${errorData.message}`);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while submitting the form.');
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Contactez-nous</h1>
                <input 
                    type="text" 
                    name="nom" 
                    placeholder="Nom & Prénom" 
                    autoComplete="off" 
                    maxLength="30" 
                    className={styles.inputName} 
                    required 
                    value={formData.nom} 
                    onChange={handleChange} 
                />
                <div className={styles.inputGroup}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        autoComplete="off" 
                        className={styles.input} 
                        required 
                        value={formData.email} 
                        onChange={handleChange} 
                    />
                    <input 
                        type="text" 
                        name="tel" 
                        placeholder="+216" 
                        autoComplete="off" 
                        className={styles.input} 
                        required 
                        value={formData.tel} 
                        onChange={handleChange} 
                    />
                </div>
                <textarea 
                    name="message_user" 
                    placeholder="Message" 
                    rows="5" 
                    className={styles.textarea} 
                    required 
                    value={formData.message_user} 
                    onChange={handleChange} 
                ></textarea>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>
    );
}
