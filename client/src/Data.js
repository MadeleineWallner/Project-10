
import config from './config'

export default class Data {

    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null){
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };
        return fetch(url, options)
    }

    async getCourses(){
        const response = await this.api(`/courses/`, 'GET', null, false, null);
        if (response.status === 200){
            return response.json().then(data => data);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }

    async getCourse(id){
        const response = await this.api(`/courses/${id}`, 'GET', null, false, null);
        if(response.status === 200){
            return response.json().then(data => data);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }

    async deleteCourse(id){
        const response = await this.api(`/courses/${id}`, 'DELETE', null, false, null);
        if(response.status === 204){
            return null;
        } else if (response.status === 401){
            return null;
        } else {
            throw new Error();
        }
    }
    
}