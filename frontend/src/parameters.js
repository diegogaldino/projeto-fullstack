export const baseURL = "http://localhost:3003"
export const config = {
    headers: {
        Authorization: localStorage.getItem("token")
    }
}