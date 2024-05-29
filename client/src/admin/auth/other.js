export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleTheme: (state, action) => {
            state.theme = action.payload
            localStorage.setItem('theme', action.payload)
        },
        reset: (state, action) => {
            state.error = ''
            state.success = ''
        },
        logout: (state, action) => {
            localStorage.removeItem('authUser')
            localStorage.removeItem('token')
            window.location.href = '/'
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.loading = false
                localStorage.setItem('authUser', JSON.stringify(action.payload.user))
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.loading = false;
                localStorage.setItem('authUser', JSON.stringify(action.payload.user))
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Show
            .addCase(show.pending, (state) => {
                state.loading = true;
            })
            .addCase(show.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(show.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Update
            .addCase(update.pending, (state) => {
                state.loading = true
            })
            .addCase(update.fulfilled, (state, action) => {
                state.loading = false
                state.error = ''
                state.success = action.payload.message ?? ''
                localStorage.setItem('authUser', JSON.stringify(action.payload.user))
            })
            .addCase(update.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // security
            .addCase(security.pending, (state) => {
                state.loading = true
            })
            .addCase(security.fulfilled, (state, action) => {
                state.loading = false
                state.error = ''
                state.success = action.payload.message ?? ''
            })
            .addCase(security.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // verify
            .addCase(verify.pending, (state) => {
                state.loading = true
            })
            .addCase(verify.fulfilled, (state, action) => {
                console.log("verify fullfilled");
                console.log(action.payload);
                state.loading = false
                state.error = ''
                localStorage.setItem('authUser', JSON.stringify(action.payload.user))
            })
            .addCase(verify.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Resend verfification mail
            .addCase(resendVerify.pending, (state) => {
                state.loading = true
            })
            .addCase(resendVerify.fulfilled, (state, action) => {
                state.loading = false
                state.success = action.payload.message
            })
            .addCase(resendVerify.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Forgot password
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false
                state.success = action.payload.message
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Reset password
            .addCase(resetPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})
export const { toggleTheme, reset, logout } = authSlice.actions

export default authSlice.reducer