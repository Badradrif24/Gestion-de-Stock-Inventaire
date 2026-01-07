// js/main.js
// Vérification de session pour toutes les pages sauf login
if (window.location.pathname !== '/index.html' && window.location.pathname !== '/' && !localStorage.getItem('loggedIn')) {
    window.location.href = 'index.html';
}

// Fonction de déconnexion
function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}

// Logique CRUD générale
let currentPage = 1;
const pageSize = 10;
let data = [];
let filteredData = [];

function initCRUD(entity) {
    data = getData(entity);
    filteredData = data;
    renderTable();
}

function renderTable(page = 1) {
    const tbody = document.querySelector('#dataTable tbody');
    if (tbody) tbody.innerHTML = '';
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    filteredData.slice(start, end).forEach(item => {
        const tr = document.createElement('tr');
        const path = window.location.pathname;
        if (path.includes('products.html')) {
            tr.innerHTML = `
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.price}</td>
                <td>${item.stock}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="viewDetails('products', '${item.id}')">Détails</button>
                    <button class="btn btn-warning btn-sm" onclick="editItem('${item.id}')">Modifier</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem('${item.id}')">Supprimer</button>
                </td>
            `;
        } else if (path.includes('suppliers.html')) {
            tr.innerHTML = `
                <td>${item.name}</td>
                <td>${item.contact}</td>
                <td>${item.address}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="viewDetails('suppliers', '${item.id}')">Détails</button>
                    <button class="btn btn-warning btn-sm" onclick="editItem('${item.id}')">Modifier</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem('${item.id}')">Supprimer</button>
                </td>
            `;
        } else if (path.includes('warehouses.html')) {
            tr.innerHTML = `
                <td>${item.name}</td>
                <td>${item.location}</td>
                <td>${item.capacity}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="viewDetails('warehouses', '${item.id}')">Détails</button>
                    <button class="btn btn-warning btn-sm" onclick="editItem('${item.id}')">Modifier</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem('${item.id}')">Supprimer</button>
                </td>
            `;
        } else if (path.includes('categories.html')) {
            tr.innerHTML = `
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="viewDetails('categories', '${item.id}')">Détails</button>
                    <button class="btn btn-warning btn-sm" onclick="editItem('${item.id}')">Modifier</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem('${item.id}')">Supprimer</button>
                </td>
            `;
        } else if (path.includes('purchaseOrders.html')) {
            tr.innerHTML = `
                <td>${item.product}</td>
                <td>${item.quantity}</td>
                <td>${item.date}</td>
                <td>${item.supplier}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="viewDetails('purchaseOrders', '${item.id}')">Détails</button>
                    <button class="btn btn-warning btn-sm" onclick="editItem('${item.id}')">Modifier</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem('${item.id}')">Supprimer</button>
                </td>
            `;
        }
        if (tbody) tbody.appendChild(tr);
    });
    renderPagination();
}

function renderPagination() {
    const pages = Math.ceil(filteredData.length / pageSize);
    const ul = document.getElementById('pagination');
    if (ul) ul.innerHTML = '';
    for (let i = 1; i <= pages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="renderTable(${i})">${i}</a>`;
        if (ul) ul.appendChild(li);
    }
}

function sortTable(col) {
    filteredData.sort((a, b) => {
        const valA = Object.values(a)[col];
        const valB = Object.values(b)[col];
        return valA > valB ? 1 : -1;
    });
    renderTable(currentPage);
}

const searchInput = document.getElementById('search');
if (searchInput) searchInput.addEventListener('input', (e) => {
    filteredData = data.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.product.toLowerCase().includes(e.target.value.toLowerCase()));
    renderTable(1);
});

const crudForm = document.getElementById('crudForm');
if (crudForm) crudForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const path = window.location.pathname;
    let newItem = {
        id: id || window.faker.datatype.uuid()
    };
    if (path.includes('products.html')) {
        newItem.name = document.getElementById('name').value;
        newItem.category = document.getElementById('category').value;
        newItem.price = parseFloat(document.getElementById('price').value);
        newItem.stock = parseInt(document.getElementById('stock').value);
        newItem.supplier = document.getElementById('supplier').value;
    } else if (path.includes('suppliers.html')) {
        newItem.name = document.getElementById('name').value;
        newItem.contact = document.getElementById('contact').value;
        newItem.address = document.getElementById('address').value;
    } else if (path.includes('warehouses.html')) {
        newItem.name = document.getElementById('name').value;
        newItem.location = document.getElementById('location').value;
        newItem.capacity = parseInt(document.getElementById('capacity').value);
    } else if (path.includes('categories.html')) {
        newItem.name = document.getElementById('name').value;
        newItem.description = document.getElementById('description').value;
    } else if (path.includes('purchaseOrders.html')) {
        newItem.product = document.getElementById('product').value;
        newItem.quantity = parseInt(document.getElementById('quantity').value);
        newItem.date = document.getElementById('date').value;
        newItem.supplier = document.getElementById('supplier').value;
    }
    if (id) {
        const index = data.findIndex(item => item.id === id);
        data[index] = newItem;
    } else {
        data.push(newItem);
    }
    const entity = path.split('/').pop().replace('.html', '');
    saveData(entity, data);
    filteredData = data;
    renderTable(currentPage);
    bootstrap.Modal.getInstance(document.getElementById('crudModal')).hide();
});

function editItem(id) {
    const item = data.find(item => item.id === id);
    document.getElementById('id').value = item.id;
    const path = window.location.pathname;
    if (path.includes('products.html')) {
        document.getElementById('name').value = item.name;
        document.getElementById('category').value = item.category;
        document.getElementById('price').value = item.price;
        document.getElementById('stock').value = item.stock;
        document.getElementById('supplier').value = item.supplier;
    } else if (path.includes('suppliers.html')) {
        document.getElementById('name').value = item.name;
        document.getElementById('contact').value = item.contact;
        document.getElementById('address').value = item.address;
    } else if (path.includes('warehouses.html')) {
        document.getElementById('name').value = item.name;
        document.getElementById('location').value = item.location;
        document.getElementById('capacity').value = item.capacity;
    } else if (path.includes('categories.html')) {
        document.getElementById('name').value = item.name;
        document.getElementById('description').value = item.description;
    } else if (path.includes('purchaseOrders.html')) {
        document.getElementById('product').value = item.product;
        document.getElementById('quantity').value = item.quantity;
        document.getElementById('date').value = item.date.split('T')[0]; // Format date
        document.getElementById('supplier').value = item.supplier;
    }
    new bootstrap.Modal(document.getElementById('crudModal')).show();
}

function deleteItem(id) {
    if (confirm('Êtes-vous sûr ?')) {
        data = data.filter(item => item.id !== id);
        const path = window.location.pathname;
        const entity = path.split('/').pop().replace('.html', '');
        saveData(entity, data);
        filteredData = data;
        renderTable(currentPage);
    }
}

function viewDetails(entity, id) {
    window.location.href = `details.html?entity=${entity}&id=${id}`;
}

function exportCSV(entity) {
    const csv = Papa.unparse(getData(entity));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${entity}.csv`;
    link.click();
}

// Initialisation pour toutes les pages
const path = window.location.pathname;
if (path.includes('products.html')) initCRUD('products');
if (path.includes('suppliers.html')) initCRUD('suppliers');
if (path.includes('warehouses.html')) initCRUD('warehouses');
if (path.includes('categories.html')) initCRUD('categories');
if (path.includes('purchaseOrders.html')) initCRUD('purchaseOrders');