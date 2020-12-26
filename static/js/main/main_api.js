import HTTP from "../modules/http.js";
export const host = 'https://ya-praktikum.tech';
export const testApi2 = () => {
    const testAPIInstance = new HTTP(host);
    return testAPIInstance.post('/api/v2/auth/signup', {
        headers: {
            'content-type': 'application/json',
        },
        data: {
            first_name: "Артурт",
            second_name: "Морган",
            login: `a.morgan`,
            email: `a.morgan@rdr2.com`,
            phone: "+71234567890",
            password: "p@ssw0rd"
        }
    })
        .then((data) => JSON.parse(data))
        .catch(console.error);
};
//# sourceMappingURL=main_api.js.map