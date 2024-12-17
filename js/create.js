document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const marca = document.getElementById('marca').value;
        const produto = document.getElementById('produto').value;
        const quantidade = document.getElementById('quantidade').value;
        
        /// gerando ID único
        const id = Date.now().toString();
        
        // criando objeto com os campos
        const pedido = {
            id,
            marca,
            produto,
            quantidade,
            data: new Date().toLocaleDateString()
        };
        
        // obtendo pedidos existentes
        const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
        
        // adicionando um novo pedido
        pedidos.push(pedido);
        
        // salvando no local storage
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        
        // limpando o forms
        form.reset();
    
    });
});

// alerta de sucesso para pedido enviado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // mostrando a mensagem
        successMessage.style.display = 'block';
        successMessage.classList.add('show');
        
        // resetando o form
        form.reset();
        
        // esconde após 5 segundos
        setTimeout(() => {
            successMessage.classList.remove('show');
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 150);
        }, 5000);
    });
});