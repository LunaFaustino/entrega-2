const url = 'https://sephora.p.rapidapi.com/us/products/v2/list?pageSize=60&currentPage=1&categoryId=cat140006';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'ea262b61c3msh5f9d62d6beadb81p1efeb9jsne5e93e8bdc7a',
        'x-rapidapi-host': 'sephora.p.rapidapi.com'
    }
};

// Função para embaralhar um array (algoritmo Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca de posições
    }
    return array;
}

async function fetchProductsAndPopulateCarousel() {
    const carouselContent = document.getElementById('carousel-content');
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Erro: ${response.status} - ${response.statusText}`);

        const result = await response.json();
        let products = result.products;

        // Embaralha os produtos e pega os primeiros 10
        products = shuffleArray(products).slice(0, 10);

        // Limpa o conteúdo existente
        carouselContent.innerHTML = '';

        // Itera pelos 10 produtos e cria os elementos do carrossel
        products.forEach((product, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) carouselItem.classList.add('active'); // O primeiro item é "active"

            // Estrutura do conteúdo do carrossel
            carouselItem.innerHTML = `
                <img src="${product.heroImage}" class="d-block w-100" alt="${product.displayName}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${product.displayName}</h5>
                </div>
            `;

            carouselContent.appendChild(carouselItem);
        });
    } catch (error) {
        console.error('Erro ao carregar os produtos:', error.message);
    }
}

// Chama a função para buscar os produtos e popular o carrossel
fetchProductsAndPopulateCarousel();
