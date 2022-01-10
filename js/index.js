/* validar login */

let intentos = 1;

function ingresar() {
    let usuario = $('#usuario').val();
    let contraseña = $('#contraseña').val();

    /* validar intentos */
    /* if (intentos<=3) {
        if (usuario=='pepe'&& contraseña=='1234') {
            Swal.fire('Validacion','Bienvenido','success');
            intentos=1;
            setTimeout(function(){ window.location.replace('index_.html'); }, 2000);
            
        }
        else{
            Swal.fire('Validacion','Usuario y/o contraseña invalidos','error');
            intentos++;
        }
    }
    else{
        Swal.fire('validacion', 'usuario bloqueado por exceso de intentos','error')
    } */
    
    if (intentos <= 3) {
        $.get('js/datos.json', (respuesta, estado) => {
            let misDatos = respuesta;
            for (const dato of misDatos) {
                if (usuario == dato.id && contraseña == dato.password) {
                    Swal.fire('Validacion', 'Bienvenido', 'success');
                    intentos = 1;
                    setTimeout(function () {
                        window.location.replace('index_.html');
                    }, 2000);
                    
                } else {
                    Swal.fire('Validacion', 'Usuario y/o contraseña invalidos', 'error');
                    intentos++;
                }
            }
        })
    }
    
    
}



/* PROMPT PARA OBTENER DATOS Y ARRAY PRODUCTOS PARA ALMACENARLOS */
let arrayProductos = [];


class Producto {
    constructor(id, nombre, cantidad, color) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.color = color;
    }
}


/* aparecer con jquery */
/* $(document).ready(function(){
    $(".tarjeta").ready(function(){
        $(".tarjeta").hide();
    });
}); */

$(document).ready(function () {
    $(".tarjeta").hide();
    $(".tarjeta").fadeIn(500);
    
});



function cargarProductos() {
    let lanaID = $('#id').html();
    let lanaNombre = $('#nombre').html();
    let lanaCantidad = $('#cantidad').val();
    let lanaColor = $('input:radio[name=color]:checked').val();
    arrayProductos.push(new Producto(parseFloat(lanaID), lanaNombre, parseFloat(lanaCantidad), lanaColor));
    
    
}



/* pedido enviado "BOTON DE CARRITO" */
function enviarPedido() {
    Swal.fire('Enviado', 'Pedido enviado Correctamente', 'success');
}

/* ANIMACION DE CARGA DE PRODUCTO */
/* function guardar() {
    Swal.fire('Enviado', 'cargado al carrito', 'success');
} */
/*  function imprimir() {
    for (let i = 1; i < sessionStorage.length; i++) {
        console.log(sessionStorage.getItem([i]));
        
    }
}

imprimir();
*/


/* carrito */

window.onload = function () {
    total = 0;

    // CARRITO
    const cajaCarrito = document.querySelector('.cajaCarrito');

    // abrir carrito 
    $('.iconCarrito').on('click', function () {
        cajaCarrito.classList.add('active');
    });

    // cerrar carrito 
    $('.fa-close').on('click', function () {
        cajaCarrito.classList.remove('active');
    });

    // agregar mensaje de principio 
    $(".servicios").prepend("<h2> Seleccione los servicios que desea comprar: </h2>");

    // LOCAL STORAGE 
    const agrCarritoBtn = document.getElementsByClassName('agrCarrito');
    let items = [];

    for (let i = 0; i < agrCarritoBtn.length; i++) {

        agrCarritoBtn[i].addEventListener("click", function (e) {
            
            if (typeof (Storage) !== 'undefined') {
                let item = {
                    id: i + 1,
                    nombre: e.target.parentElement.children[0].textContent,
                    precio: e.target.parentElement.children[1].children[0].textContent,
                    num: 1,
                    precioTotal: total
                };
                if (JSON.parse(localStorage.getItem('items')) === null) {
                    items.push(item);
                    localStorage.setItem("items", JSON.stringify(items));
                    window.location.reload();
                } else {
                    const localItems = JSON.parse(localStorage.getItem("items"));
                    localItems.map(data => {
                        if (item.id == data.id) {
                            item.num = data.num + 1;
                        } else {
                            items.push(data);
                        }
                    });
                    items.push(item);
                    localStorage.setItem('items', JSON.stringify(items));
                    Swal.fire('Enviado', 'cargado al carrito', 'success');
                    setTimeout(() => {
    
                        window.location.reload();
                    }, 2000);
                }
            } else {
                console.log('NO FUNCIONA');
            }
        });
    }

    // agregar al carrito 
    const iconCarritoP = document.querySelector('.iconCarrito p');
    let num = 0;
    JSON.parse(localStorage.getItem('items')).map(data => {
        num = num + data.num;
    });

    iconCarritoP.innerHTML = num;

    // agregar al carrito (tabla) 
    const cajaCarritoTabla = cajaCarrito.querySelector('table');
    let datosTabla = '';
    datosTabla += '<tr><th class="tituloTabla">Id</th><th class="tituloTabla">Nombre</th><th class="tituloTabla">Cantidad</th><th class="tituloTabla">Precio</th><th class="tituloTabla"></th></tr>';
    if (JSON.parse(localStorage.getItem('items'))[0] == null) {
        datosTabla += `<p> No agregó ningún item </p>`;
    } else {
        JSON.parse(localStorage.getItem('items')).map(data => {
            datosTabla += `<tr><th>` + data.id + `</th><th>` + data.nombre + `</th><th>` + data.num + `</th><th>$` + (data.precio * data.num) + `</th><th class="btnEliminar"><a href="#" onclick=eliminar(this);>Eliminar</a></th></tr>`;
            // mostrar 
            precio = parseInt(data.precio) * parseInt(data.num);
            total = total + precio;
            console.log(total);
        });
    }
    let cajaMostrarTotal = document.getElementById("total");

    // mostrar tabla y total carrito  
    cajaMostrarTotal.textContent = "$" + total;
    cajaCarritoTabla.innerHTML = datosTabla;
}

// eliminar items del carrito 
function eliminar(e) {
    let items = [];
    JSON.parse(localStorage.getItem('items')).map(data => {
        if (data.id != e.parentElement.parentElement.children[0].textContent) {
            items.push(data);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
    window.location.reload();
};



