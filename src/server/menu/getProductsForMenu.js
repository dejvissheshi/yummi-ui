import {httpClient} from "../commons/httpClient";

export const PriceType = {
    EURO: "euro",
    DOLLAR: "dollar"
};

export const ProductType = {
    PIZZA: "pizza",
    DRINKS: "drinks"
};

const getProductsForMenu = (product_type = null, price_type = null) => {
    if (price_type && product_type) {
        return httpClient.get(`/products?product_type=${product_type}&&?price_type=${price_type}`);
    } else if (product_type) {
        return httpClient.get(`/products?product_type=${product_type}`);
    }else if(price_type){
        return httpClient.get(`/products?price_type=${price_type}`);
    }else{
        return httpClient.get(`/products`);
    }
};

export default getProductsForMenu;
