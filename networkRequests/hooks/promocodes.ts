import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URI_BASE}/cabme`,
});

export const fetchPromoCodes = async () => {
    try {
        const response = await api.get('/promocodes');
        return response.data;
    } catch (error) {
        console.error('Error fetching promo codes:', error);
        throw error;
    }
};

export const fetchPromoCodesForWeb = async () => {
    try {
        const response = await api.get('/user/allpromocodes');
        return response.data;
    } catch (error) {
        console.error('Error fetching promo codes:', error);
        throw error;
    }
};
