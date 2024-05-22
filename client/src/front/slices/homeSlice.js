import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import config from '../../config'

const initialState = {
    
    loading: false,
    success: null,
    error: null,
}

export const contact = createAsyncThunk('home/contact', async (data) => {
    try {
        const response = await axios.post(`${config.api}/contact`, data)
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})


export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        reset: (state, action) => {
            state.error = ''
            state.success = ''
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(contact.pending, (state) => {
                state.loading = true
            })
            .addCase(contact.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(contact.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

    },
})

export const { reset } = homeSlice.actions

export default homeSlice.reducer