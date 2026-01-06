// Vérification de session pour toutes les pages sauf login
if (window.location.pathname !== '/index.html' && window.location.pathname !== '/' && !localStorage.getItem('loggedIn')) {
    window.location.href = 'index.html';
}

// Fonction de déconnexion (utilisée plus tard dans la navbar)
function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}