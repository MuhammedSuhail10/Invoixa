const url = 'https://adsaura.pythonanywhere.com/api/';
const urls = {
    login: url + 'user/login',
    createCustomer: url + 'customer/create-customer',
    getCustomer: url + 'customer/get-customer',
    getVendor: url + 'customer/get-vendor',
    createProduct: url + 'product/create-product',
    getProduct: url + 'product/get-product',
    createSale: url + 'order/create-order',
    getSale: url + 'order/get-sale',
    getPurchase: url + 'order/get-purchase',
    downloadInvoicePdf: url + 'order/invoice-pdf/',
}

export default urls