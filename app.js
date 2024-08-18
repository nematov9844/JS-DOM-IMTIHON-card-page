let products = [];

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    products = data;
    displayCards(products);
  });

function displayCards(data) {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  data.forEach(product => {
    const card = document.createElement('div');
    card.className = 'bg-white flex flex-col gap-4 items-center rounded-lg shadow-md p-4 cursor-pointer transition transform hover:scale-105';
    card.innerHTML = `
      <img class="w-full h-48 object-fit rounded-t-lg" src="${product.image}" alt="${product.title}" />
      <div class="mt-4 text-center">
        <h2 class="text-lg font-semibold">${product.title}</h2>
        <p class="text-gray-500">${product.price}$</p>
      </div>
    `;
    card.addEventListener('click', () => showDetails(product));
    cardContainer.appendChild(card);
  });
}

function showDetails(product) {
  const cardContainer = document.getElementById('card-container');
  const cardDetail = document.getElementById('card-detail');

  cardContainer.classList.add('hidden');

  cardDetail.classList.remove('hidden');
  cardDetail.innerHTML = `
    <button onclick="goBack()" class="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Orqaga</button>
    <h2 class="text-2xl font-bold mb-4">${product.title}</h2>
    <img class="w-full max-w-lg h-auto object-cover rounded-lg mb-4" src="${product.image}" alt="${product.title}" />
    <p class="text-gray-700 mb-4">${product.description}</p>
    <p class="text-xl font-semibold mb-2">Price: ${product.price}$</p>
    <p class="text-gray-600 mb-2">Category: ${product.category}</p>
    <p class="text-gray-600">Rating: ${product.rating.rate} / 5 (${product.rating.count} reviews)</p>
  `;
}

function goBack() {
  const cardContainer = document.getElementById('card-container');
  const cardDetail = document.getElementById('card-detail');

  cardDetail.classList.add('hidden');
  cardContainer.classList.remove('hidden');
}

document.getElementById('search-input').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm)
  );
  displayCards(filteredProducts);
});

document.getElementById('category-select').addEventListener('change', function() {
  const selectedCategory = this.value;
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;
  displayCards(filteredProducts);
});
