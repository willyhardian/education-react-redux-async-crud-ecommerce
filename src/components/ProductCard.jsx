import React from "react";
import ProductCardFooter from "./ProductCardFooter";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
    deleteProducts,
    editProducts,
    fetchLoading,
    getError,
    setEditId,
    setFormActionValue,
    setFormEdit,
} from "../store/product-slice";

export default function ProductCard({ product }) {
    const dispatch = useDispatch();
    function handleDelete(id) {
        dispatch(deleteProducts(id));
    }
    function handleEdit(id) {
        dispatch(editProducts(id));
        dispatch(setEditId(id));
    }
    // async function handleEdit(id) {
    //     try {
    //         dispatch(fetchLoading(true));
    //         const response = await axios.get(
    //             import.meta.env.VITE_BASE_URL + "/products/" + id,
    //             {
    //                 headers: {
    //                     Authorization:
    //                         "Bearer " + localStorage.getItem("access_token"),
    //                 },
    //             }
    //         );
    //         dispatch(setFormEdit(response.data));
    //         dispatch(setEditId(id));
    //     } catch (err) {
    //         dispatch(getError(err));
    //     } finally {
    //         dispatch(fetchLoading(false));
    //         dispatch(setFormActionValue("edit"));
    //     }
    // }
    return (
        <>
            <div>
                <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                            alt={product.name}
                            src={product.imgUrl}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div>
                            <h3 className="text-sm text-gray-700">
                                <a href={product.href}>
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0"
                                    />
                                    {product.name}
                                </a>
                            </h3>
                            {/* <p className="mt-1 text-sm text-gray-500">
                                                    {product.color}
                                                </p> */}
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                            {product.price}
                        </p>
                    </div>
                    {/* <ProductCardFooter /> */}
                </div>
                <button
                    className="btn btn-neutral"
                    onClick={() => handleDelete(product.id)}
                >
                    Delete
                </button>
                <button
                    className="btn btn-neutral"
                    onClick={() => handleEdit(product.id)}
                >
                    Edit
                </button>
            </div>
        </>
    );
}
