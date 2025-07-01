const canvas = document.querySelector("canvas"); //elemento canvas
let ctx = canvas.getContext('2d'); 
let colorPicker = document.getElementById("colorPicker"); //selecionar cor
let espessura = document.getElementById("espessura"); //input que mede a espessura do lápis
let botaoLimpar = document.getElementById("limpar"); //botão apagar tudo

let mouse_down = false;

// Desenhar ao clicar
canvas.addEventListener("mousedown", (e) => {
    mouse_down = true;
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
});

// Desenha enquanto move o mouse
canvas.addEventListener("mousemove", (e) => {
    if (mouse_down) {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath(); 
        ctx.moveTo(x, y);
    }
});

// Termina o desenho ao soltar
canvas.addEventListener("mouseup", () => {
    mouse_down = false;
    ctx.closePath();
});

// Garante que pare de desenhar se o mouse sair do canvas
canvas.addEventListener("mouseleave", () => {
    mouse_down = false;
    ctx.closePath();
});


// Seletor de cor personalizada
colorPicker.addEventListener("input", () => {
    ctx.strokeStyle = colorPicker.value;
});

// Espessura da linha
espessura.addEventListener("input", () => {
    ctx.lineWidth = espessura.value;
});

// Limpa o canvas
botaoLimpar.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function ajustarCanvas() {
    // Salva o conteúdo atual
    const tempImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Ajusta para novo tamanho
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Redefine propriedades (se necessário)
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = espessura.value;

    // Redesenha o conteúdo antigo (dentro do novo tamanho)
    ctx.putImageData(tempImage, 0, 0);
}

// Chamada inicial + escuta do resize
window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();

playPauseButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseButton.textContent = "❚❚";
  } else {
    audio.pause();
    playPauseButton.textContent = "▶";
  }
});