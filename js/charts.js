document.addEventListener('DOMContentLoaded', () => {
    const products = getData('products');
    const suppliers = getData('suppliers');
    const warehouses = getData('warehouses');
    const categories = getData('categories');
    const orders = getData('purchaseOrders');

    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('totalSuppliers').textContent = suppliers.length;
    document.getElementById('lowStock').textContent = products.filter(p => p.stock < 100).length; // Exemple stock bas < 100
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('totalCategories').textContent = categories.length;

    // Peupler filtre fournisseurs
    const uniqueSuppliers = _.uniq(products.map(p => p.supplier));
    uniqueSuppliers.forEach(s => {
        const option = document.createElement('option');
        option.value = s;
        option.text = s;
        document.getElementById('filterSupplier').appendChild(option);
    });

    function updateCharts(filter = '') {
        let filteredProducts = products;
        if (filter) filteredProducts = products.filter(p => p.supplier === filter);

        // Pie Chart: Distribution catégories
        new Chart(document.getElementById('pieChart'), {
            type: 'pie',
            data: {
                labels: _.uniq(filteredProducts.map(p => p.category)),
                datasets: [{ data: _.countBy(filteredProducts, 'category'), backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'] }]
            },
            options: { responsive: true }
        });

        // Bar Chart: Niveaux stock
        new Chart(document.getElementById('barChart'), {
            type: 'bar',
            data: {
                labels: filteredProducts.map(p => p.name),
                datasets: [{ label: 'Stock', data: filteredProducts.map(p => p.stock), backgroundColor: '#36a2eb' }]
            },
            options: { responsive: true, scales: { y: { beginAtZero: true } } }
        });

        // Line Chart: Tendances mock (ex: stock par catégorie, mock data)
        new Chart(document.getElementById('lineChart'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Mock dates
                datasets: [{ label: 'Stock Trends', data: [65, 59, 80, 81, 56], fill: false, borderColor: '#ff6384' }]
            },
            options: { responsive: true }
        });

        // Donut Chart: Parts fournisseurs
        new Chart(document.getElementById('donutChart'), {
            type: 'doughnut',
            data: {
                labels: _.uniq(filteredProducts.map(p => p.supplier)),
                datasets: [{ data: _.countBy(filteredProducts, 'supplier'), backgroundColor: ['#ffce56', '#4bc0c0', '#9966ff', '#ff6384', '#36a2eb'] }]
            },
            options: { responsive: true }
        });

        // Scatter Chart: Prix vs Stock
        new Chart(document.getElementById('scatterChart'), {
            type: 'scatter',
            data: {
                datasets: [{ label: 'Prix vs Stock', data: filteredProducts.map(p => ({x: p.price, y: p.stock})), backgroundColor: '#4bc0c0' }]
            },
            options: { responsive: true, scales: { x: { title: { display: true, text: 'Prix' } }, y: { title: { display: true, text: 'Stock' } } } }
        });
    }

    document.getElementById('filterSupplier').addEventListener('change', (e) => updateCharts(e.target.value));
    updateCharts();
});