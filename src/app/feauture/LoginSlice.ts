import { axiosInstance } from "@/api/ConfigueAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CookiesService from '../../services/CookiesService'

export interface UserLoginResponse {
    jwt: string;
    user: {
      id: number;
      email: string;
      username: string;
    };
  }
  

const initialState: {
    loading: boolean;
    data: UserLoginResponse | null; 
    error: string | null;  
} = {
    loading: false,
    data: null,
    error: null,
};

interface APIError {
    message: string;
    [key: string]: string; // Allow any additional fields
  }
  


export const userLogin = createAsyncThunk("login/userLogin", 
async (user: { identifier: string; password: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
        const { data } = await axiosInstance.post(`/api/auth/local`,user);
        return data;
    } catch (error) {
        return rejectWithValue(error)
    }
});

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        

        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;

                state.error = null;
                 const date = new Date();
                 const options={path:'/',expires:date};
                 date.setTime(date.getTime() + 1000*60*60*24)
                 CookiesService.set('jwt',action.payload.jwt,options)
                // toast({
                //     title:'success',
                //     description: "We've created your account for you.",
                //     status: 'success',
                //     duration: 4000,
                //     isClosable: true,
                //   })
               
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = (action.payload as APIError)?.message || "An error occurred";
                // toast({
                //     title: action.payload.response.data.error.message,
                //     description: "We've created your account for you.",
                //     status: 'error',
                //     duration: 4000,
                //     isClosable: true,
                //   })
            });
            
            // .addCase(userLogin.rejected, (state, action) => {
            //     state.loading = false;
            //     state.data = null; // Mettez à jour le contenu en conséquence
            //     state.error = action.payload;
                
                
               
            // });
    },
})


export const selectLogin = (state: { login: typeof initialState }) => state.login;

export default loginSlice.reducer;