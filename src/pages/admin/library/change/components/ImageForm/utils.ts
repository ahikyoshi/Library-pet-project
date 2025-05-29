export const audioDeleteHandle = (id: string | string[]) => {
    if (Array.isArray(id)) {
        return;
    }
    fetch(`/api/library/book/assets/image/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
};
