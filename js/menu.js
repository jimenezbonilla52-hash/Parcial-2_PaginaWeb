const gruposMenu = Array.from(document.querySelectorAll('.menu-temas details'));

for (const grupo of gruposMenu) {
    grupo.addEventListener('toggle', () => {
        if (grupo.open) {
            for (const otro of gruposMenu) {
                if (otro !== grupo) otro.open = false;
            }
        }
    });
}

document.addEventListener('click', (evento) => {
    for (const grupo of gruposMenu) {
        if (!grupo.contains(evento.target)) grupo.open = false;
    }
});

document.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Escape') return;

    for (const grupo of gruposMenu) {
        if (!grupo.open) continue;
        const contieneFoco = grupo.contains(document.activeElement);
        grupo.open = false;
        if (contieneFoco) grupo.querySelector('summary').focus();
    }
});

const botonMenu = document.querySelector('.boton-menu');
const menuPrincipal = document.querySelector('#menu-principal');
const iconoMenu = botonMenu.querySelector('span');

function cerrarMenu() {
    botonMenu.setAttribute('aria-expanded', 'false');
    botonMenu.setAttribute('aria-label', 'Abrir menú');
    iconoMenu.textContent = '☰';
    for (const grupo of gruposMenu) grupo.open = false;
}

botonMenu.addEventListener('click', () => {
    if (botonMenu.getAttribute('aria-expanded') === 'true') {
        cerrarMenu();
    } else {
        botonMenu.setAttribute('aria-expanded', 'true');
        botonMenu.setAttribute('aria-label', 'Cerrar menú');
        iconoMenu.textContent = '×';
    }
});

document.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Escape' || botonMenu.getAttribute('aria-expanded') !== 'true') return;
    cerrarMenu();
    if (botonMenu.offsetWidth > 0) botonMenu.focus();
});

document.addEventListener('click', (evento) => {
    if (!menuPrincipal.contains(evento.target) && !botonMenu.contains(evento.target)) cerrarMenu();
});

botonMenu.hidden = false;
