import { createContext } from "react";
import { useState, useEffect } from "react";

export const ThemeContext = createContext("light");

export default function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState("light");
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
