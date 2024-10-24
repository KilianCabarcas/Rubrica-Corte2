document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardContainer');
    const productFilter = document.getElementById('productFilter');

    // Función para cargar datos desde la API
    const loadProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) throw new Error('Error en la respuesta de la API');
            
            const products = await response.json();

            // Llenar el select del filtro con títulos de productos
            fillProductFilter(products);

            // Mostrar todas las cards al cargar la página
            displayCards(products);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    };

    // Función para mostrar todas las cards
    const displayCards = (products) => {
        cardContainer.innerHTML = ''; // Limpiar contenido previo
        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card');

            // Mostrar información del producto según la API
            const productTitle = product.title || 'Producto sin título';
            const productDescription = product.description || 'Descripción no disponible';
            const productPrice = product.price ? `Precio: $${product.price}` : 'Precio no disponible';
            const productImage = product.image || 'default.jpg'; // Ruta a una imagen por defecto si no hay imagen disponible

            card.innerHTML = `
                <h3>${productTitle}</h3>
                <img src="${productImage}" alt="${productTitle}" style="max-width: 100%;">
                <p>${productDescription}</p>
                <p>${productPrice}</p>
            `;
            cardContainer.appendChild(card);
        });
    };

    // Función para llenar el filtro con opciones
    const fillProductFilter = (products) => {
        productFilter.innerHTML = ''; // Limpiar opciones previas
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = 'Todos los productos';
        productFilter.appendChild(allOption);

        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.title;
            option.textContent = product.title;
            productFilter.appendChild(option);
        });
    };

    // Evento para filtrar productos según el select
    productFilter.addEventListener('change', () => {
        const selectedProduct = productFilter.value;

        if (selectedProduct === 'all') {
            loadProducts(); // Mostrar todas las cards si se selecciona "Todos los productos"
        } else {
            filterCards(selectedProduct);
        }
    });

    // Función para mostrar solo la card seleccionada
    const filterCards = async (selectedProduct) => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) throw new Error('Error en la respuesta de la API');

            const products = await response.json();
            const filteredProducts = products.filter(product => product.title === selectedProduct);
            displayCards(filteredProducts);
        } catch (error) {
            console.error('Error al filtrar los productos:', error);
        }
    };

    // Cargar los productos al cargar la página
    loadProducts();
});
