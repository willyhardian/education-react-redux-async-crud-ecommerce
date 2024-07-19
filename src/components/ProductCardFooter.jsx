import React from "react";
import { ProductContext } from "../store/product-context";
import { useContext } from "react";

export default function ProductCardFooter() {
    const { products, setProducts } = useContext(ProductContext);
    function handleClick() {
        setProducts(products);
    }
    return (
        <>
            <div>
                <button onClick={handleClick}>A</button>
                <button>B</button>
            </div>
        </>
    );
}
