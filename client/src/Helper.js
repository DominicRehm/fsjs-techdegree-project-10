const apiUrl = 'http://localhost:5000/api';

export default class Data {

    // Fetch API
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = apiUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        };

        // Authentication
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    };

    // API Create User
    async createUser(user) {
        const response = await this.api('/users', 'POST', user)
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        };
    };

    // API Get User
    async getUser(emailAddress, password) {
        const response = await this.api('/users', 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        };
    };

    // API Get Courses
    async getCourses() {
        const response = await this.api('/courses', 'GET', null);
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        };
    };

    // API -- Get course
    async getCourse(courseId) {
        const response = await this.api(`/courses/${courseId}`, 'GET', null);
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    // API New Course
    async createCourse(course, emailAddress, password) {
        const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors
            });
        }
        else {
            throw new Error();
        };
    };

    // API Update Course
    async updateCourse(courseId, course, emailAddress, password) {
        const response = await this.api(`/courses/${courseId}`, 'PUT', course, true, { emailAddress, password });
        if (response.status === 204) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        };
    };

    // API Delete Course
    async deleteCourse(id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {
            emailAddress,
            password
        })
        if (response.status === 204) {
            return [];

        }
        else if (response.status === 403) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }
};