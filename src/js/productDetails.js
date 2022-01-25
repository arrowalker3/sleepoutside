function getColors(product) {
    const colorNames = product.Colors.map(item => item.ColorName);

    return colorNames.join(' + ');
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
    }

    addToCart(e) {
        setLocalStorage("so-cart", product);
    }

    renderProductDetails() {
        document.querySelector('#title').innerHTML += this.product.Brand.Name;
        document.querySelector('#brandName').innerHTML = this.product.Brand.Name;
        document.querySelector('#productName').innerHTML = this.product.NameWithoutBrand;
        document.querySelector('#productImage').src = this.product.Image;
        document.querySelector('#productImage').alt = this.product.Name;
        document.querySelector('.product-card__price').innerHTML = `$${this.product.FinalPrice}`;
        document.querySelector('.product__color').innerHTML = getColors(this.product);
        document.querySelector('.product__description').innerHTML = this.product.DescriptionHtmlSimple;
    }
}