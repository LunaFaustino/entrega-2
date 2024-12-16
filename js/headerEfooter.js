
async function loadComponents() {
    try {
        const headerResponse = await fetch('./header.html');
        const footerResponse = await fetch('./footer.html');
            
        if (headerResponse.ok && footerResponse.ok) {
            document.getElementById('header').innerHTML = await headerResponse.text();
            document.getElementById('footer').innerHTML = await footerResponse.text();
        } else {
            console.error('Erro ao carregar os componentes:', headerResponse.status, footerResponse.status);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

loadComponents();