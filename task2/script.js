// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert.

const btn = document.querySelector('.btn');
const { width, height } = window.screen;

btn.addEventListener('click', () => {
    alert(`Ширина экрана: ${width}px, Высота экрана: ${height}px`)
});