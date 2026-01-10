// js/charts.js
document.addEventListener("DOMContentLoaded", () => {
    const products = getData("products");
    const orders = getData("purchaseOrders");
    // ====== CARTES ======
    document.getElementById("totalProducts").textContent = products.length;
    document.getElementById("totalSuppliers").textContent =
        _.uniq(products.map(p => p.supplier)).length;
    document.getElementById("lowStock").textContent =
        products.filter(p => p.stock < 100).length;
    document.getElementById("totalOrders").textContent = orders.length;
    document.getElementById("totalCategories").textContent =
        _.uniq(products.map(p => p.category)).length;
    // ====== SCATTER : PRIX VS STOCK ======
    new Chart(document.getElementById("scatterChart"), {
        type: "scatter",
        data: {
            datasets: [{
                label: "Prix vs Stock",
                data: products.map(p => ({ x: p.price, y: p.stock })),
                backgroundColor: "#36a2eb"
            }]
        }
    });
    // ====== BAR : STOCK ======
    new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
            labels: products.map(p => p.name),
            datasets: [{
                label: "Stock",
                data: products.map(p => p.stock),
                backgroundColor: "#4e73df"
            }]
        }
    });
    // ====== LINE : COMMANDES ======
    new Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
            labels: orders.map(o => o.date.split("T")[0]),
            datasets: [{
                label: "Quantité commandée",
                data: orders.map(o => o.quantity),
                borderColor: "#1cc88a",
                fill: false
            }]
        }
    });
    // ====== PIE : QUANTITÉ COMMANDES ======
    new Chart(document.getElementById("ordersQuantityPieChart"), {
        type: "pie",
        data: {
            labels: orders.map(o => o.product),
            datasets: [{
                data: orders.map(o => o.quantity),
                backgroundColor: [
                    "#e74a3b", "#f6c23e", "#36b9cc", "#858796"
                ]
            }]
        }
    });
    // ====== DONUT : PRIX PRODUITS ======
    new Chart(document.getElementById("productsPriceDonutChart"), {
        type: "doughnut",
        data: {
            labels: products.map(p => p.name),
            datasets: [{
                data: products.map(p => p.price),
                backgroundColor: [
                    "#4e73df", "#1cc88a", "#36b9cc", "#f6c23e"
                ]
            }]
        }
    });
});