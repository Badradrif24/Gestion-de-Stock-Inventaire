const translations = {
    en: {
        dashboard: 'Dashboard',
        products: 'Products',
        suppliers: 'Suppliers',
        warehouses: 'Warehouses',
        categories: 'Categories',
        purchaseOrders: 'Purchase Orders',
        logout: 'Logout',
        language: 'Language',
        login: 'Login',
        username: 'Username',
        password: 'Password',
        connect: 'Connect' .
    },
    fr: {
        dashboard: 'Tableau de bord',
        products: 'Produits',
        suppliers: 'Fournisseurs',
        warehouses: 'Entrepôts',
        categories: 'Catégories',
        purchaseOrders: 'Commandes d\'Achat',
        logout: 'Déconnexion',
        language: 'Langue',
        login: 'Connexion',
        username: 'Nom d\'utilisateur',
        password: 'Mot de passe',
        connect: 'Se connecter'
    },
    ar: {
        dashboard: 'لوحة القيادة',
        products: 'المنتجات',
        suppliers: 'الموردين',
        warehouses: 'المستودعات',
        categories: 'الفئات',
        purchaseOrders: 'طلبات الشراء',
        logout: 'تسجيل الخروج',
        language: 'اللغة',
        login: 'تسجيل الدخول',
        username: 'اسم المستخدم',
        password: 'كلمة المرور',
        connect: 'الاتصال'
    }
};

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    location.reload(); // Recharger la page pour appliquer les traductions
}

document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang') || 'fr'; // Français par défaut
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    // Support RTL pour l'arabe (texte de droite à gauche)
    if (lang === 'ar') {
        document.body.setAttribute('dir', 'rtl');
        document.body.style.textAlign = 'right';
    } else {
        document.body.setAttribute('dir', 'ltr');
        document.body.style.textAlign = 'left';
    }
});