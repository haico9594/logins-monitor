export function getLoggedUser() {
    return JSON.parse(window.sessionStorage.getItem("user"));
}

export function setLoggedUser(user) {
    window.sessionStorage.setItem('user',JSON.stringify(user));
}

export function clearLoggedUser(user) {
    window.sessionStorage.removeItem('user');
}