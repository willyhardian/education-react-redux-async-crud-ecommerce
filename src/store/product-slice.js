import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        items: [],
        loading: false,
        error: null,
        form: {
            name: "",
            price: "",
            image: "",
            categoryId: "",
            stock: "",
            description: "",
        },
        formAction: "add",
        editId: "",
    },
    reducers: {
        fetch: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            const products = action.payload;
            state.items = [...products];
        },
        fetchLoading: (state, action) => {
            const loadingValue = action.payload;
            state.loading = loadingValue;
        },
        productsDeleteSuccess: (state, action) => {
            const id = action.payload;
            const newProducts = state.items.filter(
                (product) => product.id !== id
            );
            state.items = [...newProducts];
        },
        getError: (state, action) => {
            const error = action.payload;
            state.error = error;
        },
        setForm: (state, action) => {
            const form = action.payload;
            console.log(form, "< form di setForm action");
            state.form[form.name] = form.value;
        },

        setFormEdit: (state, action) => {
            state.form = {
                name: action.payload.name,
                price: action.payload.price,
                image: action.payload.image,
                categoryId: action.payload.categoryId,
                stock: action.payload.stock,
                description: action.payload.description,
            };
        },
        setFormReset: (state, action) => {
            state.form = {
                name: "",
                price: "",
                image: "",
                categoryId: "",
                stock: "",
                description: "",
            };
        },
        setFormActionValue: (state, action) => {
            state.formAction = action.payload;
        },

        setEditId: (state, action) => {
            state.editId = action.payload;
        },

        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // incrementByAmount: (state, action) => {
        //     console.log(action, "< action");
        //     state.value += action.payload;
        // },
    },
});

// Action creators are generated for each case reducer function
export const {
    fetch,
    fetchLoading,
    productsDeleteSuccess,
    getError,
    setForm,
    setFormReset,
    setFormEdit,
    setFormActionValue,
    setEditId,
} = productSlice.actions;

export function fetchProducts() {
    return async (dispatch) => {
        try {
            dispatch(fetchLoading(true));
            const response = await axios.get(
                import.meta.env.VITE_BASE_URL + "/products?category=3",
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("access_token"),
                    },
                }
            );
            const products = response.data.rows;
            //setProducts(products);
            dispatch(fetch(products));
        } catch (err) {
            dispatch(getError(err));
        } finally {
            dispatch(fetchLoading(false));
        }
    };
}

export function deleteProducts(id) {
    return async (dispatch) => {
        try {
            dispatch(fetchLoading(true));
            const response = await axios.delete(
                import.meta.env.VITE_BASE_URL + "/products/" + id,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("access_token"),
                    },
                }
            );
            dispatch(productsDeleteSuccess(id));
        } catch (err) {
            dispatch(getError(err));
        } finally {
            dispatch(fetchLoading(false));
        }
    };
}

export function editProducts(id) {
    return async (dispatch) => {
        try {
            dispatch(fetchLoading(true));
            const response = await axios.get(
                import.meta.env.VITE_BASE_URL + "/products/" + id,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("access_token"),
                    },
                }
            );
            dispatch(setFormEdit(response.data));
        } catch (err) {
            dispatch(getError(err));
        } finally {
            dispatch(fetchLoading(false));
            dispatch(setFormActionValue("edit"));
        }
    };
}

export default productSlice.reducer;
