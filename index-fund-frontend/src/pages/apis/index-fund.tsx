import axios from './index';

export const createSession = async (payload) => {
    try {
        const result = await axios.post('create-session', payload);
        return result;
    } catch (error) {
        console.log('[Error in createSession]');
        throw error?.response;
    }
}

export const getAvailableProducts = async () => {
    try {
        const result = await axios.get('products');
        return result;
    } catch (error) {
        console.log('[Error in createSession]');
        throw error.response;
    }
}

export const getAllPrices = async () => {
    try {
        const result = await axios.get('price');
        return result;
    } catch (error) {
        console.log('[Error in createSession]');
        throw error.response;
    }
}