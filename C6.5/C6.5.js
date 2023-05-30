const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    const msg = `
    Ширина экрана: ${window.screen.width}
    Высота экрана: ${window.screen.height}
    `;
    alert(msg);
});

