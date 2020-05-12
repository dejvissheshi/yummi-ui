import {httpClient} from "../commons/httpClient";

const getCheckoutInformation = (data) => {
    return httpClient.post("/checkout",data);
};

export default getCheckoutInformation;
