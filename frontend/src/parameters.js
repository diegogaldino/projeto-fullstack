export const baseURL = ""
export const config = {
    headers: {
        Authorization: localStorage.getItem("token")
    }
}