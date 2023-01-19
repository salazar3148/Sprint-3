const putDataFetch = async (url, objeto) => {
    try {
        const options = {
            method: "PUT",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(objeto)
        };
        const response = await fetch(url, options);
        const resp = response.json();
        console.log(res);
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export default putDataFetch;