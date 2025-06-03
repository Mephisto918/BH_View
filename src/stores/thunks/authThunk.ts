import { createAsyncThunk } from "@reduxjs/toolkit";
import API from '@/config/api';

const baseUrl = API.BASE_URL
const PORT = API.PORT

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ username, password }: {username: string, password: string}, thunkAPI)=>{
        try{
            const res = await fetch(`${baseUrl}${PORT}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            if(!res.ok) {
                console.log(res);
                throw new Error('Login failed')
            }

            const data = await res.json();
            return data;
        }catch(err: any){
            return thunkAPI.rejectWithValue(err.message || 'Something went wrong');
        }
    }
)