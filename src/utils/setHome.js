window.addEventListener("resize", sethome);
export default function sethome() {
  var home = document.querySelector(".home");
  var height = home.getBoundingClientRect().height;
  var width = home.getBoundingClientRect().width;
  var homeinner = document.querySelector(".home-inner");
  homeinner.style.borderTop = height / 2 + "px solid green";
  homeinner.style.borderBottom = height / 2 + "px solid blue";
  homeinner.style.borderLeft = width / 2 + "px solid red";
  homeinner.style.borderRight = width / 2 + "px solid yellow";
}
