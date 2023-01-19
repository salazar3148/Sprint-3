const PostDataFetch = async (url, objeto) => {
    try {
        const options = {
            method: "POST",
            body: JSON.stringify(objeto),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }
        const response = await fetch(url, options);
        const resp = await response.json(objeto);
        console.log(resp);
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export default PostDataFetch;