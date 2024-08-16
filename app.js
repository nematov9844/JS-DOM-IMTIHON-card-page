let baseUrl = "https://fakestoreapi.com/products";
let result = document.getElementById("result");
async function getData() {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    console.log(data);
    displayAdd(data);
  } catch (error) {
    console.log(error);
  }
}
getData();

function displayAdd(data = []) {
  result.innerHTML = "";
  result.classList = "bg-gray-200  p-4 grid grid-cols-1 sm:grid-cols-2   md:grid-cols-3  gap-4"
  data.forEach((item) => {
    let div = document.createElement("div");

    div.innerHTML += `
    <a onclick="addDisplay(${item.id})" class="h-full" target="_blank">
    <div class="max-w-sm  rounded h-full  overflow-hidden shadow-lg w-[400px] bg-white">
        <img class="w-full h-[450px]" src="${item.image}" alt="${item.title}">
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">${item.title}</div>
            
        </div>
        <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            ${item.category}
            </span>
        </div>
        <div class="px-6 py-4">
            <div class="flex items-center">
                <div class="text-lg text-gray-900 font-bold">${item.price}</div>
                <div class="ml-auto flex items-center">
                    <div class="text-yellow-500 mr-1">
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09L5.09 11.33 0 7.09l6.177-.898L10 0l3.823 6.192L20 7.09l-5.09 4.24 1.967 6.76z"/>
                        </svg>
                    </div>
                    <div class="text-gray-700">(${item.rating.rate})</div>
                </div>
            </div>
        </div>
    </div>
</a>

    `;
    result.appendChild(div);
    div.classList = `flex justify-center`;
  });
}

async function addDisplay(id) {
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    const dataSingle = await response.json();
    console.log(dataSingle);
    AddSingle(dataSingle);
  } catch (error) {
    console.log(error);
  }
}

function AddSingle(item = {}) {
  result.classList =
    "bg-gray-200 w-full flex items-center justify-center";
  result.innerHTML = `
    <div class="max-w-sm mx-auto my-8 p-4 shadow-lg rounded-lg overflow-hidden bg-white">
    <img class="w-full h-auto object-cover" src="${item.image}" alt="${item.title}">
    <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">${item.title}</div>
        <p class="text-gray-700 text-base">
            ${item.description}
        </p>
    </div>
    <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            ${item.category}
        </span>
    </div>
    <div class="px-6 py-4">
        <div class="flex items-center">
            <div class="text-lg text-gray-900 font-bold">${item.price}</div>
            <div class="ml-auto flex items-center">
                <div class="text-yellow-500 mr-1">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09L5.09 11.33 0 7.09l6.177-.898L10 0l3.823 6.192L20 7.09l-5.09 4.24 1.967 6.76z"/>
                    </svg>
                </div>
                <div class="text-gray-700">(${item.rating.rate})</div>
            </div>
        </div>
    </div>
    <div><button onclick="getData()" class="bg-gray-400 font-bold text-white py-1 px-2 rounded-lg">Orqaga</button></div>
</div>

    `;
}
