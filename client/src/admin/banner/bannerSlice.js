import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import config from '../../config'

const initialState = {
    items: [],
    item: {},
    perPage: 0,
    total: 0,
    loading: false,
    success: '',
    error: '',
}

export const index = createAsyncThunk('banner/index', async (data = {}) => {
    try {
        const response = await axios.get(`${config.api}/banners`, {
            params: data,
            headers: config.header().headers,
        })
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const show = createAsyncThunk('banner/show', async (id) => {
    try {
        const response = await axios.get(`${config.api}/banners/${id}`, config.header())
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const store = createAsyncThunk('banner/store', async (data) => {
    try {
        const response = await axios.post(`${config.api}/banners`, data, config.formdataheader())
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const update = createAsyncThunk('banner/update', async (data) => {
    try {
        const response = await axios.put(`${config.api}/banners/${data.id}`, data, config.header())
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const destroy = createAsyncThunk('banner/destroy', async (data) => {
    try {
        const response = await axios.delete(`${config.api}/banners/${data._id}`, config.header())
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
        remove: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload._id)
        },
        reset: (state, action) => {
            state.error = ''
            state.success = ''
        },
    },
    extraReducers: (builder) => {
        builder
            // index
            .addCase(index.pending, (state) => {
                state.loading = true
            })
            .addCase(index.fulfilled, (state, action) => {
                state.items = action.payload
                state.loading = false
            })
            .addCase(index.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            // show
            .addCase(show.pending, (state) => {
                state.loading = true
                state.success = ''
                state.error = ''
            })
            .addCase(show.fulfilled, (state, action) => {
                state.loading = false
                state.item = action.payload
            })
            .addCase(show.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            // Store
            .addCase(store.pending, (state) => {
                state.loading = true
            })
            .addCase(store.fulfilled, (state, action) => {
                state.loading = false
                state.item = action.payload
                state.error = ''
            })
            .addCase(store.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            // update
            .addCase(update.pending, (state) => {
                state.loading = true
            })
            .addCase(update.fulfilled, (state, action) => {
                state.loading = false
                state.error = ''
                state.success = action.payload.message ?? ''
            })
            .addCase(update.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            // destroy
            .addCase(destroy.pending, (state) => {
                state.loading = true
            })
            .addCase(destroy.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(destroy.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const { remove, reset } = bannerSlice.actions

export default bannerSlice.reducer