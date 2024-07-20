import { $authHost, $host } from ".";
import {jwtDecode} from 'jwt-decode';

export const createArticle = async (article) => {
    const {data} = await $authHost.post('api/article/create', article)
    return data
}

export const fetchOneArticle = async (id) => {
    const {data} = await $host.get(`api/article/${id}`)
    return data
}


export const fetchArticles = async () => {
    const {data} = await $host.get(`api/article/`)
    return data
}
