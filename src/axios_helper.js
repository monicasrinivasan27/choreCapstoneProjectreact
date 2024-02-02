import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.post["Content-type"] = 'application/json'

export const request = async (method, url, data) => {
    debugger;

    const abc = await axios({
        method: method,
        url: url,
        data: data
    })
    debugger;
    return abc
};
