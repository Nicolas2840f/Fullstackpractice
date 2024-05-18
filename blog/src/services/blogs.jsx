import axios from 'axios';
const baseUrl= "/api/blogs";

const getAll = ()=>{
    const request = axios.get(baseUrl)
    return request.then(response=>response.data)
}

const addBlog = blog=>{
    const request = axios.post(baseUrl,blog)
    return request.then(response=>response.data)
}

export default {getAll,addBlog}