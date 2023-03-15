// Сверстайте кнопку, которая будет содержать в себе icon_01 (как в примере в последнем видео). При клике на кнопку иконка должна меняться на icon_02. Повторный клик меняет иконку обратно.

let btn = document.querySelector(".btn");
let svg1 = document.querySelector(".svg1");
let svg2 = document.querySelector(".svg2");
btn.addEventListener("click", () => {
    svg1.classList.toggle("none");
    svg2.classList.toggle("none");
});