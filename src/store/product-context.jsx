import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
export const ProductContext = createContext({
    products: [],
    setProducts: () => {},
    fetchProducts: () => {},
});

export default function ProductContextProvider({ children }) {
    const [products, setProducts] = useState();
    async function fetchProducts() {
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
        setProducts(products);
    }
    // useEffect(() => {
    //     if (localStorage.getItem("access_token")) {
    //         fetchProducts();
    //     }
    // }, []);
    return (
        <ProductContext.Provider
            value={{ products, setProducts, fetchProducts }}
        >
            {children}
        </ProductContext.Provider>
    );
}
