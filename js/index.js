const apiURL = "http://makeup-api.herokuapp.com/api/v1/products.json";

async function fetchProducts() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error("Erro ao buscar os dados da API.");
        }

        const products = await response.json();
        populateCarousel(products);
    } catch (error) {
        console.error(error.message);
    }
}

function populateCarousel(products) {
    const carouselContent = document.getElementById("carouselContent");
    carouselContent.innerHTML = "";

    // Seleciona 5 produtos aleatórios
    const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 5);

    randomProducts.forEach((product, index) => {
        const isActive = index === 0 ? "active" : ""; // Ativa o primeiro slide
        const productImage = product.api_featured_image.startsWith("http")
            ? product.api_featured_image
            : `http:${product.api_featured_image}`;

        const carouselItem = `
            <div class="carousel-item ${isActive}">
                <img src="${productImage}" class="d-block w-100" alt="${product.name}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${product.name}</h5>
                    <p>${product.description || "Sem descrição disponível."}</p>
                </div>
            </div>
        `;
        carouselContent.innerHTML += carouselItem;
    });
}

// Chama a função ao carregar a página
fetchProducts();
