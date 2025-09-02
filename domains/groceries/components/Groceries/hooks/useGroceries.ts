import { useContext } from "react";
import { GroceriesContext } from "../context/GroceriesContext";

export const useGroceries = () => useContext(GroceriesContext);
