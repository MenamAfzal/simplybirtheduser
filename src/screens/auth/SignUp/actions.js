import API from "../../../utils/API";

export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await API.get(`/tour/${id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);