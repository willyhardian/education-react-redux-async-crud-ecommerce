import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../store/product-context";
import { ThemeContext } from "../store/theme-context";
import { useDispatch, useSelector } from "react-redux";
import {
    decrement,
    increment,
    incrementByAmount,
} from "../store/counter-slice";
import {
    fetch,
    fetchLoading,
    fetchProducts,
    setForm,
    setFormActionValue,
    setFormReset,
} from "../store/product-slice";
export default function Seller() {
    // const [products, setProducts] = useState();
    // useEffect(() => {
    //     async function fetchProducts() {
    //         const response = await axios.get(
    //             import.meta.env.VITE_BASE_URL + "/products?category=2",
    //             {
    //                 headers: {
    //                     Authorization:
    //                         "Bearer " + localStorage.getItem("access_token"),
    //                 },
    //             }
    //         );
    //         const products = response.data.rows;
    //         setProducts(products);
    //     }
    //     fetchProducts();
    // }, []);
    const count = useSelector((state) => state.counter.value);

    //versi 1
    const {
        items: products,
        loading,
        error,
        form,
        formAction,
        editId,
    } = useSelector((state) => {
        return {
            items: state.product.items,
            loading: state.product.loading,
            error: state.product.error,
            form: state.product.form,
            formAction: state.product.formAction,
            editId: state.product.editId,
        };
    });
    //versi 2
    // const products = useSelector((state) => state.product.items);
    // const loading = useSelector((state) => state.product.loading);

    const dispatch = useDispatch();
    // const { products, setProducts, fetchProducts } = useContext(ProductContext);
    const { theme, setTheme } = useContext(ThemeContext);
    // console.log(JSON.stringify(theme), "< theme value");

    // const [products, setProducts] = useState();
    // async function fetchProducts() {
    //     dispatch(fetchLoading(true));
    //     const response = await axios.get(
    //         import.meta.env.VITE_BASE_URL + "/products?category=3",
    //         {
    //             headers: {
    //                 Authorization:
    //                     "Bearer " + localStorage.getItem("access_token"),
    //             },
    //         }
    //     );
    //     const products = response.data.rows;
    //     //setProducts(products);
    //     dispatch(fetch(products));
    //     dispatch(fetchLoading(false));
    // }
    useEffect(() => {
        // fetchProducts();
        dispatch(fetchProducts());
    }, []);
    // console.log(products, "<< products");

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("price", form.price);
        formData.append("description", form.description);
        formData.append("stock", form.stock);
        formData.append("categoryId", form.categoryId);
        formData.append("image", form.image);

        async function submitProduct() {
            try {
                dispatch(fetchLoading(true));
                if (formAction === "add") {
                    const response = await axios.post(
                        import.meta.env.VITE_BASE_URL +
                            `/products?cloud_name=${
                                import.meta.env.VITE_CLOUD_NAME
                            }&api_key=${
                                import.meta.env.VITE_API_KEY
                            }&api_secret=${import.meta.env.VITE_API_SECRET}`,
                        formData,
                        {
                            headers: {
                                Authorization:
                                    "Bearer " +
                                    localStorage.getItem("access_token"),
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                } else {
                    const response = await axios.put(
                        import.meta.env.VITE_BASE_URL +
                            `/products/${editId}?cloud_name=${
                                import.meta.env.VITE_CLOUD_NAME
                            }&api_key=${
                                import.meta.env.VITE_API_KEY
                            }&api_secret=${import.meta.env.VITE_API_SECRET}`,
                        formData,
                        {
                            headers: {
                                Authorization:
                                    "Bearer " +
                                    localStorage.getItem("access_token"),
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                    dispatch(setFormActionValue("add"));
                }
            } catch (err) {
                console.log(err, "< errr");
            } finally {
                dispatch(fetchLoading(false));
                dispatch(fetchProducts());
                dispatch(setFormReset());
                e.target?.reset();
            }
        }
        submitProduct();
    }

    function handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        if (e.target?.files) {
            value = e.target.files[0];
        }
        dispatch(
            setForm({
                name,
                value,
            })
        );
        console.log(form, "< form");
    }
    return (
        <>
            <Navbar />
            <button onClick={() => dispatch(incrementByAmount(5))}>Plus</button>
            <br />
            <button onClick={() => dispatch(decrement())}>Minus</button>
            <p>Count: {count}</p>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            <div className="container mx-auto">
                <div className="bg-white">
                    <form onSubmit={handleSubmit}>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full max-w-xs"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                            <div className="label">
                                <span className="label-text">Description</span>
                            </div>
                            <textarea
                                className="input input-bordered w-full max-w-xs"
                                name="description"
                                onChange={handleChange}
                                value={form.description}
                            />

                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input
                                type="number"
                                className="input input-bordered w-full max-w-xs"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                            />
                            <div className="label">
                                <span className="label-text">Stock</span>
                            </div>
                            <input
                                type="number"
                                className="input input-bordered w-full max-w-xs"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                            />
                            <div className="label">
                                <span className="label-text">CategoryId</span>
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full max-w-xs"
                                name="categoryId"
                                value={form.categoryId}
                                onChange={handleChange}
                            />
                        </label>
                        <div className="label">
                            <span className="label-text">Image</span>
                        </div>
                        <input
                            type="file"
                            className="input input-bordered w-full max-w-xs"
                            name="image"
                            // value={form.image}
                            onChange={handleChange}
                        />
                        <div>
                            {formAction === "add" ? (
                                <button
                                    className="btn btn-accent"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            ) : (
                                <button
                                    className="btn btn-warning"
                                    type="submit"
                                >
                                    Update
                                </button>
                            )}
                        </div>
                    </form>

                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Seller Page
                        </h2>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {products &&
                                products.map((product, idx) => (
                                    <ProductCard key={idx} product={product} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
