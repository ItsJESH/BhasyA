document.getElementById("rgcon").style.display = "none";
const stylesheet = document.getElementById("rgcss");
stylesheet.parentNode.removeChild(stylesheet);


document.getElementById("maincon").addEventListener("click", (event) => {
  if (event.target.id === "sup") {
    const link = document.createElement("link");
    link.id = "rgcss";
    link.rel = "stylesheet";
    link.href = "rgcss.css";
    document.head.appendChild(link);
    document.getElementById("rgcon").style.display = "block";
    document.getElementById("lgcon").style.display = "none";
    const stylesheet = document.getElementById("lgcss");
    stylesheet.parentNode.removeChild(stylesheet);

} else if (event.target.id === "sin") {
  const link = document.createElement("link");
  link.id = "lgcss";
  link.rel = "stylesheet";
  link.href = "lgcss.css";
  document.head.appendChild(link);
  document.getElementById("lgcon").style.display = "block";
  document.getElementById("rgcon").style.display = "none";
  const stylesheet = document.getElementById("rgcss");
  stylesheet.parentNode.removeChild(stylesheet);
  }
});
