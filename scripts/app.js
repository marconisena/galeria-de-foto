const photoGrid = document.getElementById("photoGrid");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

// URL da API da Unsplash
const UNSPLASH_API_URL = "https://api.unsplash.com/photos/random?count=10";
const ACCESS_KEY = "v8U88XjCJzI1c0c9i4bQrBCNp-Fgcts4f2Vm5vpdfQs"; // Sua chave de acesso da API Unsplash

// Função para buscar fotos da API Unsplash
async function fetchPhotos(query = "") {
  try {
    // Se houver uma palavra-chave, utilize a URL de busca
    const url = query
      ? `https://api.unsplash.com/search/photos?query=${query}&per_page=10`
      : UNSPLASH_API_URL;

    const response = await fetch(`${url}&client_id=${ACCESS_KEY}`);
    const data = await response.json();

    // Unsplash retorna os resultados diferentes para busca
    const photos = query ? data.results : data;

    loadPhotos(photos);
  } catch (error) {
    console.error("Erro ao buscar fotos:", error);
    noResults.classList.remove("hidden");
    noResults.textContent = "Erro ao carregar fotos. Tente novamente mais tarde.";
  }
}

// Função para carregar as fotos no grid
function loadPhotos(photos) {
  photoGrid.innerHTML = ""; // Limpa o grid antes de carregar novas fotos

  if (photos.length === 0) {
    noResults.classList.remove("hidden");
    noResults.textContent = "Nenhuma foto encontrada.";
    return;
  }

  noResults.classList.add("hidden");

  photos.forEach((photo) => {
    const photoCard = document.createElement("div");
    photoCard.className = "photo-card";

    photoCard.innerHTML = `
      <img src="${photo.urls.regular}" alt="${photo.alt_description || "Foto"}" />
      <p>${photo.description || photo.alt_description || "Foto sem descrição"}</p>
    `;

    photoGrid.appendChild(photoCard);
  });
}

// Função para tratar a pesquisa
function handleSearch() {
  const query = searchInput.value.trim();
  fetchPhotos(query);
}

searchInput.addEventListener("input", handleSearch);

fetchPhotos();
