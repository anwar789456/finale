import axios from 'axios';

export const fetchProducts = async () => {
    try {
        const response = await axios.get('http://57.128.221.37/api/get-products');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
