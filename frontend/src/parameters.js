export const baseURL = "http://localhost:3003"
// export const baseURL = "https://ec2-107-20-95-56.compute-1.amazonaws.com"
export const config = {
    headers: {
        Authorization: localStorage.getItem("token")
    }
}