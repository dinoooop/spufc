import { create } from 'zustand';
import axios from 'axios';
import config from '../../config';

const useGeneralStore = create((set) => ({    
    loading: false,
    success: '',
    error: '',
    
    enquiry: async () => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.get(`${config.api}/enquiry`, config.header());
            set({ loading: false, success: response.data });
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'An error occurred',
                success: '',
            });
        }
    },
    
    reset: () => set({
        error: '',
        success: '',
        loading: false
    })
}));

export default useGeneralStore;