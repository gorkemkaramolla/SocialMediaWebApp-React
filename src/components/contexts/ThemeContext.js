import { createContext, useState } from "react";

const ThemeContext = createContext();
export const ThemeContextProvider = ({ children }) => {
    const [themeValue, setThemeValue] = useState("light");

    return (
        <ThemeContext.Provider value={{ themeValue, setThemeValue }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
