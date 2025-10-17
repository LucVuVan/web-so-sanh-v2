document.addEventListener('DOMContentLoaded', () => {

    // 1. Dữ liệu mẫu (Cập nhật với trường "seller")
    const allProductsDatabase = [
        { id: 1, name: 'iPhone 15 Pro 256GB', price: 27500000, img: 'https://via.placeholder.com/300x200?text=iPhone', seller: 'Shopee' },
        { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 32000000, img: 'https://via.placeholder.com/300x200?text=Samsung', seller: 'Lazada' },
        { id: 3, name: 'Laptop Dell XPS 15', price: 45000000, img: 'https://via.placeholder.com/300x200?text=Dell+XPS', seller: 'Tiki' },
        { id: 4, name: 'Tai nghe Sony XM5', price: 7900000, img: 'https://via.placeholder.com/300x200?text=Sony+XM5', seller: 'Lazada' },
        { id: 5, name: 'iPhone 15 Pro 256GB', price: 27100000, img: 'https://via.placeholder.com/300x200?text=iPhone', seller: 'Tiki' },
        { id: 6, name: 'Chuột Logitech MX Master 3S', price: 2300000, img: 'https://via.placeholder.com/300x200?text=Logitech', seller: 'Shopee' }
    ];

    // 2. Lấy các phần tử DOM (Như cũ)
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const sortSelect = document.getElementById('sort-select');
    const productList = document.getElementById('product-list');

    let currentProducts = [];

    // 3. HÀM MÔ PHỎNG BACK-END (CRAWLER) (Như cũ)
    function mockFetchProducts(searchTerm) {
        console.log(`Đang "crawl" với từ khóa: ${searchTerm}`);
        
        return new Promise(resolve => {
            setTimeout(() => {
                const term = searchTerm.toLowerCase();
                if (!term) {
                    resolve([]); 
                    return;
                }
                const results = allProductsDatabase.filter(product =>
                    product.name.toLowerCase().includes(term)
                );
                resolve(results);
            }, 1000); 
        });
    }

    // 4. Hàm để hiển thị sản phẩm lên giao diện (Cập nhật)
    function displayProducts(products) {
        productList.innerHTML = ''; 

        if (products.length === 0) {
            productList.innerHTML = '<p class="no-results">Không tìm thấy sản phẩm nào.</p>';
            return;
        }

        products.forEach(product => {
            const formattedPrice = product.price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });

            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            // === THAY ĐỔI Ở ĐÂY ===
            // Thêm <p class="seller">${product.seller}</p>
            productCard.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${formattedPrice}</p>
                <p class="seller">Nơi bán: ${product.seller}</p>
            `;
            // === KẾT THÚC THAY ĐỔI ===
            
            productList.appendChild(productCard);
        });
    }

    // 5. Hàm sắp xếp (Như cũ)
    function applySortAndDisplay() {
        const sortValue = sortSelect.value;
        let sortedProducts = [...currentProducts];

        if (sortValue === 'price-asc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-desc') {
            sortedProducts.sort((a, b) => b.price - b.price);
        } else if (sortValue === 'default') {
            sortedProducts.sort((a, b) => a.id - b.id);
        }

        displayProducts(sortedProducts);
    }

    // 6. Hàm xử lý chính khi nhấn nút TÌM KIẾM (Như cũ)
    async function handleSearch() {
        const searchTerm = searchBar.value;
        productList.innerHTML = '<p class="loading">Đang tìm kiếm và crawl dữ liệu...</p>';
        searchButton.disabled = true;

        currentProducts = await mockFetchProducts(searchTerm);
        applySortAndDisplay();
        
        searchButton.disabled = false;
    }

    // 7. Gắn sự kiện (Như cũ)
    searchButton.addEventListener('click', handleSearch);
    searchBar.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
    sortSelect.addEventListener('change', applySortAndDisplay);

});