import { create } from 'zustand';
import axios from 'axios';
import config from '../../config';  // Assuming you have a config file for API endpoints and headers
import { dummySettings } from '../../helpers/dummyData';

const useSettingStore = create((set) => ({
    items: [],
    item: dummySettings,
    perPage: 0,
    total: 0,
    loading: false,
    success: '',
    error: '',
    
    show: async () => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.get(`${config.api}/settings`, config.header());
            set({
                loading: false,
                item: response.data,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'An error occurred',
                success: '',
            });
        }
    },
    store: async (data) => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.post(`${config.api}/settings`, data, config.formdataheader())
            set({
                loading: false,
                // item: response.data,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'An error occurred',
                success: '',
            });
            throw error;
        }
    },
    
    reset: () => set({
        error: '',
        success: '',
        loading: false
    })
}));

export default useSettingStore;