import HttpClient from './httpClient'
import store from './localStorage'

class UserHttpClient extends HttpClient{
     getHeaders() {
        return store.getToken() ? { 'x-auth-token': `${store.getToken()}` } : {};
    }
}

export default UserHttpClient;
const adminHttpClient = new UserHttpClient();
export { adminHttpClient };
