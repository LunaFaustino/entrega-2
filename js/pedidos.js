document.addEventListener('DOMContentLoaded', () => {
    // DECLARANDO VARIÁVEIS
    const searchInput = document.getElementById('search');
    const tableBody = document.getElementById('orderTableBody');
    let currentEditingRow = null;
    let deleteRow = null;
    let deleteId = null;

    // EVENT LISTENERS
    tableBody.addEventListener('click', (e) => {
        if (e.target.closest('.edit-btn')) {
            const row = e.target.closest('tr');
            editPedido(row);
        }
        if (e.target.closest('.delete-btn')) {
            const row = e.target.closest('tr');
            const id = row.querySelector('.delete-btn').dataset.id;
            deletePedido(id, row);
        }
    });

    searchInput.addEventListener('input', (e) => {
        const filter = e.target.value;
        loadPedidos(filter);
    });

    document.getElementById('editForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const marca = document.getElementById('editMarca').value;
        const produto = document.getElementById('editProduto').value;
        const quantidade = document.getElementById('editQuantidade').value;
        
        if (!marca || !produto || !quantidade) {
            return;
        }
        
        saveEdit();
    });

    document.getElementById('confirmDelete').addEventListener('click', () => {
        if (deleteRow && deleteId) {
            // Removendo do localStorage
            const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
            const updatedPedidos = pedidos.filter(pedido => pedido.id !== deleteId);
            localStorage.setItem('pedidos', JSON.stringify(updatedPedidos));
            
            // Removendo da UI
            deleteRow.remove();
            
            // Fechando o modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
            modal.hide();
            
            // Resetando as variáveis
            deleteRow = null;
            deleteId = null;
        }
    });

    // FUNÇÕES
    function loadPedidos(filter = '') {
        const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
        const filteredPedidos = pedidos.filter(pedido => 
            pedido.produto.toLowerCase().includes(filter.toLowerCase())
        );
        
        tableBody.innerHTML = '';
        
        filteredPedidos.forEach(pedido => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-marca>${pedido.marca}</td>
                <td data-produto>${pedido.produto}</td>
                <td data-quantidade>${pedido.quantidade}</td>
                <td>${pedido.data}</td>
                <td>
                    <button class="btn btn-sm btn-primary edit-btn" data-id="${pedido.id}">
                        <i class="fa-solid fa-pen-to-square" style="color: blue;"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${pedido.id}">
                        <i class="fas fa-trash" style="color: red;"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function editPedido(row) {
        currentEditingRow = row;
        const marca = row.querySelector('[data-marca]').textContent;
        const produto = row.querySelector('[data-produto]').textContent;
        const quantidade = row.querySelector('[data-quantidade]').textContent;
        
        document.getElementById('editMarca').value = marca;
        document.getElementById('editProduto').value = produto;
        document.getElementById('editQuantidade').value = quantidade;
        
        const modal = new bootstrap.Modal(document.getElementById('editModal'));
        modal.show();
    }

    function saveEdit() {
        if (currentEditingRow) {
            const id = currentEditingRow.querySelector('.edit-btn').dataset.id;
            const marca = document.getElementById('editMarca').value;
            const produto = document.getElementById('editProduto').value;
            const quantidade = document.getElementById('editQuantidade').value;
            
            // Atualizando a UI
            currentEditingRow.querySelector('[data-marca]').textContent = marca;
            currentEditingRow.querySelector('[data-produto]').textContent = produto;
            currentEditingRow.querySelector('[data-quantidade]').textContent = quantidade;
            
            // Atualizando o localStorage
            const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
            const pedidoIndex = pedidos.findIndex(p => p.id === id);
            if (pedidoIndex !== -1) {
                pedidos[pedidoIndex].marca = marca;
                pedidos[pedidoIndex].produto = produto;
                pedidos[pedidoIndex].quantidade = quantidade;
                localStorage.setItem('pedidos', JSON.stringify(pedidos));
            }
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
            modal.hide();
        }
    }

    function deletePedido(id, row) {
        deleteRow = row;
        deleteId = id;
        const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
        modal.show();
    }

    // INICIALIZAÇÕES
    window.saveEdit = saveEdit;
    loadPedidos();
});
