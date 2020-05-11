class Keys{
    static Token = "token";
    constructor() {}
}

export const store = {
    set:(key, value) => {
        localStorage.setItem(key, value)
    },

    get:(key) => {
        localStorage.getItem(key)
    },

    remove:(key) => {
        localStorage.removeItem(key)
    }
};

export default {
    setToken: (token) =>{
        store.set(Keys.Token, token)
    },
    getToken: () => store.get(Keys.Token)
}
