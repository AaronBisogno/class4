const fs = require('fs');

class ProductManager{
    constructor(path){
        this.path = path;
        this.id = 0;
        this.products = [];

        if (!fs.existsSync(this.path)){
            const productsJSON = JSON.stringify(this.products)
            fs.writeFileSync(this.path, JSON.stringify(productsJSON));
        } else {
            const data = fs.readFileSync(this.path, 'utf8');
            const products = JSON.parse(data);
            const productsJSON = JSON.stringify(products);
            this.products = products;
            fs.writeFileSync(this.path, productsJSON)
        }
    }

    async addProduct(product){
        const { title, description, price, thumbnail, code, stock } = product;
        if (title && description && price && thumbnail && code && stock) {
            const codeVerif = this.products.find(p => p.code === code);
            if (codeVerif) {
                console.error("Product already exists.");
            }  else {
                this.id++
                product.id = this.id;
                this.products.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                    .then(() => console.log(`The product "${product.title}" was added successfully.`))
                    .catch((err) => console.error(err))
            }
        } else {
            console.error("Product data is missing");
        }
    }
    async getProducts(){
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        console.log(products)
    }
    async getProductById(id){
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        const productForId = products.find(p => p.id === id)
        if(productForId){
            console.log(productForId)
        } else console.error("Product not found.")
    }
    async updateProduct(id, updateData) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            const updatedProduct = { ...this.products[productIndex], ...updateData };
            this.products[productIndex] = updatedProduct;
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                .then(() => console.log(`The product "${updatedProduct.title}" was updated successfully.`))
                .catch((err) => console.error(err))
        } else {
            console.error("Product not found.");
        }
    }
    async deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.error("Product not found.");
            return;
        }
    
        const product = this.products[index];
        this.products.splice(index, 1);
    
        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            .then(() => console.log(`The product "${product.title}" was deleted successfully.`))
            .catch((err) => console.error(err));
    }
}

const product1 = {
    title: "Product 1",
    description: "Product description 1",
    price: 10,
    thumbnail: "photo.jpg",
    code: "A1B2",
    stock: 12
}
const product2 = {
    title: "Product 2",
    description: "Product description 2",
    price: 10,
    thumbnail: "photo.jpg",
    code: "A1B3",
    stock: 12
}
const product3 = {
    title: "Product 3",
    description: "Product description 3",
    price: 10,
    thumbnail: "photo.jpg",
    code: "A1B4",
    stock: 12
}
const product4 = {
    title: "Product 4",
    description: "Product description 4",
    price: 10,
    thumbnail: "photo.jpg",
    code: "A1B6",
    stock: 12
}

// const myManager = new ProductManager("./products.json");
// myManager.addProduct(product1);
// myManager.addProduct(product2);
// setTimeout(() => myManager.getProducts(), 1000)
// setTimeout(() => myManager.getProductById(1), 1500);
// setTimeout(() => myManager.deleteProduct(1), 2000);
// setTimeout(() => myManager.getProducts(), 2500);
// setTimeout(() => myManager.updateProduct(2, {stock: 10, title: "El Mejor Producto"}), 3000);
// setTimeout(() => myManager.getProducts(), 3500);

