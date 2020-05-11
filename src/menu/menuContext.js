import React, {createContext} from "react";

const ProductContext = createContext([]);
ProductContext.displayName = "ProductContext";

export const OrderListContext = createContext([]);
OrderListContext.displayName = "OrderListContext";

export default ProductContext


