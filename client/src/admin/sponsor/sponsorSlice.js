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

export const index = createAsyncThunk('sponsor/index', async (data = {}) => {
    try {
        const response = await axios.get(`${config.api}/sponsors`, {
            params: data,
            headers: config.header().headers,
        })
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const show = createAsyncThunk('sponsor/show', async (id) => {
    try {
        const response = await axios.get(`${config.api}/sponsors/${id}`, config.header())
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const store = createAsyncThunk('sponsor/store', async (data) => {
    try {
        const response = await axios.post(`${config.api}/sponsors`, data, config.formdataheader())
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const update = createAsyncThunk('sponsor/update', async (formData) => {
    if (typeof formData._id === 'undefined') {
        // a file upload // use POST
        const id = formData.get('_id')
        try {
            const response = await axios.put(`${config.api}/sponsors/${id}`, formData, config.formdataheader())
            return response.data
        } catch (error) {
            throw error.response.data.message
        }

    } else {
        // Normal data update using PUT
        const id = formData._id
        try {
            const response = await axios.put(`${config.api}/sponsors/${id}`, formData, config.header())
            return response.data
        } catch (error) {
            throw error.response.data.message
        }
    }
})

export const destroy = createAsyncThunk('sponsor/destroy', async (data) => {
    try {
        const response = await axios.delete(`${config.api}/sponsors/${data._id}`, config.header())
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
})

export const sponsorSlice = createSlice({
    name: 'sponsor',
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

export const { remove, reset } = sponsorSlice.actions

export default sponsorSlice.reducer