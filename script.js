// Produtos Database
const produtos = [
  {
    id: 1,
    nome: 'Camiseta Vermelha',
    descricao: 'Modelo esportivo confortável com design exclusivo',
    preco: 79.90,
    imagem: 'https://via.placeholder.com/300x200?text=Camiseta+Vermelha'
  },
  {
    id: 2,
    nome: 'Camiseta Preta',
    descricao: 'Modelo casual premium com acabamento sofisticado',
    preco: 89.90,
    imagem: 'https://via.placeholder.com/300x200?text=Camiseta+Preta'
  },
  {
    id: 3,
    nome: 'Camiseta Branca',
    descricao: 'Estilo moderno e leve, perfeita para o dia a dia',
    preco: 69.90,
    imagem: 'https://via.placeholder.com/300x200?text=Camiseta+Branca'
  },
  {
    id: 4,
    nome: 'Camiseta Azul',
    descricao: 'Design elegante com toque esportivo e confortável',
    preco: 79.90,
    imagem: 'https://via.placeholder.com/300x200?text=Camiseta+Azul'
  },
  {
    id: 5,
    nome: 'Camiseta Cinza',
    descricao: 'Versátil e confortável para qualquer ocasião',
    preco: 74.90,
    imagem: 'https://via.placeholder.com/300x200?text=Camiseta+Cinza'
  },
  {
    id: 6,
    nome: 'Camiseta Verde',
    descricao: 'Cor vibrante com qualidade premium e durável',
    preco: 84.90,
    imagem: 'https://via.placeholder.com/300x200?text=Camiseta+Verde'
  }
];

// Carrinho
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para carregar produtos
function carregarProdutos() {
  const container = document.getElementById('produtos-container');
  
  if (!container) return;

  container.innerHTML = produtos.map(produto => `
    <div class="card">
      <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
      <div class="card-content">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
        <div class="card-buttons">
          <button class="btn-comprar" onclick="adicionarAoCarrinho(${produto.id})">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Função para adicionar ao carrinho
function adicionarAoCarrinho(produtoId) {
  const produto = produtos.find(p => p.id === produtoId);
  const itemCarrinho = carrinho.find(item => item.id === produtoId);

  if (itemCarrinho) {
    itemCarrinho.quantidade++;
  } else {
    carrinho.push({
      ...produto,
      quantidade: 1
    });
  }

  salvarCarrinho();
  atualizarCarrinho();
  mostrarNotificacao(`${produto.nome} adicionado ao carrinho!`);
}

// Função para remover do carrinho
function removerDoCarrinho(produtoId) {
  carrinho = carrinho.filter(item => item.id !== produtoId);
  salvarCarrinho();
  atualizarCarrinho();
}

// Função para atualizar quantidade
function atualizarQuantidade(produtoId, quantidade) {
  const item = carrinho.find(i => i.id === produtoId);
  if (item) {
    if (quantidade <= 0) {
      removerDoCarrinho(produtoId);
    } else {
      item.quantidade = quantidade;
      salvarCarrinho();
      atualizarCarrinho();
    }
  }
}

// Função para atualizar visualização do carrinho
function atualizarCarrinho() {
  const container = document.getElementById('carrinho-container');
  const cartCount = document.getElementById('cart-count');

  if (!container) return;

  cartCount.textContent = carrinho.reduce((total, item) => total + item.quantidade, 0);

  if (carrinho.length === 0) {
    container.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
    return;
  }

  const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

  container.innerHTML = `
    ${carrinho.map(item => `
      <div class="carrinho-item">
        <div>
          <h4>${item.nome}</h4>
          <p>R$ ${item.preco.toFixed(2)}</p>
        </div>
        <div>
          <input type="number" min="1" value="${item.quantidade}" 
                 onchange="atualizarQuantidade(${item.id}, this.value)">
          <button class="btn-remover" onclick="removerDoCarrinho(${item.id})">Remover</button>
        </div>
      </div>
    `).join('')}
    <div class="carrinho-total">
      Total: R$ ${total.toFixed(2)}
    </div>
    <button class="btn-checkout" onclick="finalizarCompra()">Finalizar Compra</button>
  `;
}

// Função para finalizar compra
function finalizarCompra() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
  alert(`Compra realizada com sucesso!\nTotal: R$ ${total.toFixed(2)}\n\nObrigado por comprar conosco!`);
  
  carrinho = [];
  salvarCarrinho();
  atualizarCarrinho();
}

// Função para salvar carrinho no localStorage
function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Função para mostrar notificação
function mostrarNotificacao(mensagem) {
  const notificacao = document.createElement('div');
  notificacao.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #d60000;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  notificacao.textContent = mensagem;
  document.body.appendChild(notificacao);

  setTimeout(() => notificacao.remove(), 3000);
}

// Função para lidar com envio de formulário de contato
document.addEventListener('DOMContentLoaded', function() {
  carregarProdutos();
  atualizarCarrinho();

  const form = document.getElementById('contato-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      form.reset();
    });
  }
});