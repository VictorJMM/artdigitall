const API_KEY = '45363128-30ade2bd408709cf9f5e7e963'; // Sua chave de API do Pixabay

// Mapeamento de palavras-chave para caminhos de imagens locais correspondentes
const SPECIAL_IMAGES = {
  'happy': 'https://i.imgur.com/PcZ8mNK.jpg',
  'sad': 'https://i.imgur.com/UmCC0bC.jpeg'
};

async function generateImage() {
  const description = document.getElementById('description').value;
  if (!description) {
    alert('Por favor, insira uma descrição.');
    return;
  }

  // Verifica se a descrição corresponde a uma palavra-chave específica
  const imagePath = SPECIAL_IMAGES[description.trim().toLowerCase()];
  if (imagePath) {
    document.getElementById('image-container').innerHTML = `<img src="${imagePath}" alt="Imagem Especial">`;
    return;
  }

  try {
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(description)}&image_type=photo`);
    const data = await response.json();
    
    if (data && data.hits && data.hits.length > 0) {
      const imageUrl = data.hits[0].webformatURL; 
      document.getElementById('image-container').innerHTML = `<img src="${imageUrl}" alt="Imagem gerada">`;
    } else {
      document.getElementById('image-container').innerHTML = '<p>Nenhuma imagem encontrada. Tente novamente.</p>';
    }
  } catch (error) {
    console.error('Erro ao gerar a imagem:', error);
    document.getElementById('image-container').innerHTML = '<p>Ocorreu um erro ao gerar a imagem. Tente novamente.</p>';
  }
}
