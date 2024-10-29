// Cargar Google Charts
google.charts.load('current', {'packages':['corechart']});

// Array de productos para el inventario
const productos = [
    { id: 1, nombre: "energizantes", cantidad: 10, precioUnitario: 5000 },
    { id: 2, nombre: "gaseosas", cantidad: 20, precioUnitario: 2000 },
    { id: 3, nombre: "crema dental", cantidad: 30, precioUnitario: 7000 },
    { id: 4, nombre: "chicles", cantidad: 5, precioUnitario: 500},
    { id: 5, nombre: "avena", cantidad: 10, precioUnitario: 2500},
];

// Inicialización cuando se carga el documento
document.addEventListener('DOMContentLoaded', function() {
    const btnInventario = document.getElementById('btn-inventario');
    const btnGraficos = document.getElementById('btn-graficos');
    const seccionInventario = document.getElementById('seccion-inventario');
    const seccionGraficos = document.getElementById('seccion-graficos');
    const controlesInventario = document.querySelector('.controles-inventario');

    // Mostrar inventario por defecto
    seccionInventario.classList.add('active');
    controlesInventario.style.display = 'block'; // Mostrar controles de inventario

    // Cargar productos iniciales
    productos.forEach(agregarProducto);

    // Event listeners para los botones de navegación
    btnInventario.addEventListener('click', function() {
        seccionInventario.classList.add('active');
        seccionGraficos.classList.remove('active');
        btnInventario.classList.add('active');
        btnGraficos.classList.remove('active');
        controlesInventario.style.display = 'block'; // Mostrar controles de inventario
    });

    btnGraficos.addEventListener('click', function() {
        seccionInventario.classList.remove('active');
        seccionGraficos.classList.add('active');
        btnInventario.classList.remove('active');
        btnGraficos.classList.add('active');
        controlesInventario.style.display = 'none'; // Ocultar controles de inventario
    });
});

// Funciones del inventario
function agregarProducto(producto) {
    const tableBody = document.getElementById("inventario-tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${producto.cantidad}</td>
        <td>$${producto.precioUnitario.toLocaleString()}</td>
        <td>$${(producto.cantidad * producto.precioUnitario).toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
}

function mostrarFormularioAgregar() {
    document.getElementById('formulario-agregar').style.display = 'block';
}

function cerrarFormulario() {
    document.getElementById('formulario-agregar').style.display = 'none';
    limpiarFormulario();
}

function agregarNuevoProducto() {
    const nombre = document.getElementById('nombre-producto').value;
    const cantidad = parseInt(document.getElementById('cantidad-producto').value);
    const precio = parseInt(document.getElementById('precio-producto').value);

    if (nombre && !isNaN(cantidad) && !isNaN(precio)) {
        const nuevoProducto = {
            id: productos.length + 1,
            nombre: nombre,
            cantidad: cantidad,
            precioUnitario: precio
        };
        productos.push(nuevoProducto);
        agregarProducto(nuevoProducto);
        cerrarFormulario();
    } else {
        alert("Por favor, completa todos los campos correctamente.");
    }
}

function limpiarFormulario() {
    document.getElementById('nombre-producto').value = '';
    document.getElementById('cantidad-producto').value = '';
    document.getElementById('precio-producto').value = '';
}

function quitarProducto() {
    const tableBody = document.getElementById("inventario-tbody");
    if (tableBody.lastElementChild) {
        tableBody.removeChild(tableBody.lastElementChild);
        productos.pop();
    }
}

// Funciones para los gráficos
function cargarGrafico() {
    const tipo = document.getElementById('tipo').value;
    const titulo = document.getElementById('titulo').value || 'Inventario';

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Producto');
    data.addColumn('number', 'Valor Total');

    productos.forEach(producto => {
        data.addRow([
            producto.nombre,
            producto.cantidad * producto.precioUnitario
        ]);
    });

    const options = {
        title: titulo,
        width: '100%',
        height: 500
    };

    const chart = tipo === 'circular' 
        ? new google.visualization.PieChart(document.getElementById('piechart'))
        : new google.visualization.BarChart(document.getElementById('piechart'));

    chart.draw(data, options);
}