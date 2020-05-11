import axios from 'axios';

class HttpClient {

    getHeaders() {}
    apiEndpoint="https://yummi-service.herokuapp.com";

    getAxiosInstance() {
        return axios.create({
            baseURL: this.apiEndpoint,
            headers: this.getHeaders()
        });
    }

    get(url, params) {
        return new Promise((resolve, reject) => {
            this.getAxiosInstance()
                .get(url, {params})
                .then(response => {
                    resolve(response.data.data);
                })
                .catch(err => {
                    reject(err.response);
                });
        })
    }

    post(url, data){
        return new Promise((resolve, reject) => {
            this.getAxiosInstance()
                .post(url, data)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err.response);
                });
        });
    }
}

export default HttpClient;
const httpClient = new HttpClient();
export { httpClient };
