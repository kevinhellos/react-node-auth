export function getAuthToken() {
    if (localStorage.getItem("token")) {
        return localStorage.getItem("token");
    }
    else {
        return "";
    }
}