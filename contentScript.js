const cursorPosition = { x: 0, y: 0 };
document.addEventListener('mousemove', (e) => {
  cursorPosition.x = e.clientX;
  cursorPosition.y = e.clientY;
});

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.altKey && (event.key === 'p' || event.key === 'P')) {
    copyImageUnderCursor();
  }
});

function copyImageUnderCursor() {
  const gmailImagePreview = document.querySelector('img[aria-label="Image preview"]');

  if (gmailImagePreview) {
    const imageUrl = gmailImagePreview.src;
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Add a visual indication for 1 second
        gmailImagePreview.style.border = '5px solid red';
        setTimeout(() => {
          gmailImagePreview.style.border = '';
        }, 1000);
      })
      .catch((error) => console.error('Error fetching image:', error));
  }
}

