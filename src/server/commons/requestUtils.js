import { message } from "antd";

const queryRequest = async (func) => {
    try {
        return await func();
    }
    catch (err) {
        if (!err || !err.status) {
            message.error("There was an error while processing your request");
            return;
        }
        if (err.status === 401 || err.status === 400) {
            window.location.href = "/login";
        }
        else {
            message.error("There was an error while processing your request");
        }
    }
};

const commandRequest = async (func) => {
    try {
        return await func();
    }
    catch (err) {
        if (err.status === 401 || err.status === 400) {
            window.location.href = "/login";
        }
        if (!err || !err.status) {
            return {
                errors: ["There was an error while processing your request"]
            };
        }
    }
};

export {queryRequest, commandRequest};
