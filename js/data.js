const entities = ['products', 'suppliers', 'warehouses', 'categories', 'purchaseOrders'];

function generateFakeData(entity, count = 50) {
    const faker = window.faker;
    switch (entity) {
        case 'products':
            return Array.from({length: count}, () => ({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                category: faker.commerce.department(),
                price: parseFloat(faker.commerce.price()),
                stock: faker.datatype.number({min: 0, max: 1000}),
                supplier: faker.company.companyName()
            }));
        case 'suppliers':
            return Array.from({length: count}, () => ({
                id: faker.datatype.uuid(),
                name: faker.company.companyName(),
                contact: faker.phone.phoneNumber(),
                address: faker.address.streetAddress()
            }));
        case 'warehouses':
            return Array.from({length: count}, () => ({
                id: faker.datatype.uuid(),
                name: faker.lorem.word() + ' Warehouse',
                location: faker.address.city(),
                capacity: faker.datatype.number({min: 1000, max: 10000})
            }));
        case 'categories':
            return Array.from({length: count}, () => ({
                id: faker.datatype.uuid(),
                name: faker.commerce.department(),
                description: faker.lorem.sentence()
            }));
        case 'purchaseOrders':
            return Array.from({length: count}, () => ({
                id: faker.datatype.uuid(),
                product: faker.commerce.productName(),
                quantity: faker.datatype.number({min: 1, max: 100}),
                date: faker.date.recent().toISOString(),
                supplier: faker.company.companyName()
            }));
        default: return [];
    }
}

function getData(entity) {
    let data = JSON.parse(localStorage.getItem(entity));
    if (!data || data.length === 0) {
        data = generateFakeData(entity);
        localStorage.setItem(entity, JSON.stringify(data));
    }
    return data;
}

function saveData(entity, data) {
    localStorage.setItem(entity, JSON.stringify(data));
}