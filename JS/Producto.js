
// Initialize a new TaskManager with currentId set to 0
const itemsController = new ItemsController(0);

// Select the New Task Form
const newItemForm = document.querySelector('#nuevoProducto');

// Add an 'onsubmit' event listener
newItemForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();

    // Select the inputs
    const tag = document.querySelector('#input-tag').value;
    const imagen = document.querySelector('#img-producto').value;
    const nombre = document.querySelector('#input-nombre').value;
    const descripcion = document.querySelector('#input-descripcion').value;
    const tueste = document.querySelector('#select-tueste').value;
    const origen = document.querySelector('#input-origen').value;
    const precio = document.querySelector('#input-precio').value;
    const notas = document.querySelector('#input-notas').value;
    const intensidad = document.querySelector('#input-intensidad').value;

    console.log(tag)
    console.log(imagen)
    console.log(nombre)
    console.log(descripcion)
    console.log(tueste)
    console.log(origen)
    console.log(precio)
    console.log(notas)
    console.log(intensidad)
    /*
        Validation code here ???
    */

    // Get the values of the inputs
    const createdAt = new Date().toISOString();

    // Add the task to the task manager
    itemsController.addItem(tag,
                            imagen,
                            nombre,
                            descripcion,
                            tueste,
                            origen,
                            precio,
                            createdAt);

    // Clear the form
    /*newItemNameInput.value = '';
    newItemDescription.value = '';*/
});


function addItemCard(item) {
    const itemHTML = '<div class="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch"> + \n'
                    '   <div class="card card-producto border-0 shadow-sm w-100 position-relative"> \n' +
                    '       <img src="../assets/images/catalogo/01.png" class="card-img-top" alt="Montaña de Oro"> \n' +
                    '       <span class="position-absolute top-0 start-0 m-3 px-2 py-1 rounded text-uppercase font-monospace" \n' +
                    '           style="background-color: #8C4327; color: #F5EBE6; font-size: 0.65rem; letter-spacing: 1px; font-weight: bold;"> \n' +
                    '           COLOMBIA HUILA \n' +
                    '       </span> \n' +
                    '       <div class="card-body d-flex flex-column justify-content-between text-start"> \n' +
                    '           <div> \n' +
                    '               <h5 class="card-title fw-bold text-center mb-2">Montaña de Oro</h5> \n' +
                    '               <p class="card-text text-muted text-center small mb-3"> \n' +
                    '                   Caramelo denso, chocolate amargo y un toque de frutos rojos \n' +
                    '               </p> \n' +
                    '           </div> \n' +
                    '           <div class="d-flex justify-content-around text-muted small mb-3 py-2"> \n' +
                    '               <span><i class="bi bi-fire me-1 "></i>MEDIO</span> \n' +
                    '               <span><i class="bi bi-globe-americas me-1"></i>VERACRUZ</span> \n' +
                    '           </div> \n' +
                    '           <div class="d-flex justify-content-between align-items-center mt-auto"> \n' +
                    '               <span class="fs-5 fw-bold text-dark">$250</span> \n' +
                    '               <a href="#" class="btn btn-agregar">Agregar</a> \n' +
                    '           </div> \n' +
                    '       </div> \n' +
                    '    </div> \n' +
                    '</div> \n';
    const catalogoContainer = document.getElementById("catalogo-container");
    catalogoContainer.innerHTML += itemHTML;
}


addItemCard({
    'tag' : 'Colombia Huila',
    'imagen' : '../assets/images/catalogo/01.png',
    'nombre' : 'Montaña de Oro',
    'descripcion' : 'Caramelo denso, chocolate amargo y un toque de frutos rojos.',
    'tueste' : 'Medio',
    'origen' : 'Veracruz',
    'precio' : '250.00',
    'createdA' : '2026-07-30T22:24:45.123Z'
})

addItemCard({
    'tag' : 'Decaf Process',
    'imagen' : '../assets/images/catalogo/02.png',
    'nombre' : 'Noche Serena',
    'descripcion' : 'Descafeinado con agua, conserva todo el sabor a melaza y nueces.',
    'tueste' : 'Medio',
    'origen' : 'Veracruz',
    'precio' : '300.00',
    'createdA' : '2026-07-30T22:24:45.123Z'
})

addItemCard({
    'tag' : 'Limited Release',
    'imagen' : '../assets/images/catalogo/03.png',
    'nombre' : 'Geisha Ancestral',
    'descripcion' : 'Una experiencia sensorial única. Notas de bergamota y flores…',
    'tueste' : 'Ligero',
    'origen' : 'Veracruz',
    'precio' : '450.00',
    'createdA' : '2026-07-30T22:24:45.123Z'
})

addItemCard({
    'tag' : 'Signature Blend',
    'imagen' : '../assets/images/catalogo/04.png',
    'nombre' : 'Jardín de Coatepec',
    'descripcion' : 'Esta mezcla representa la diversidad de los cafetales de Coatepec, de baja acidez.',
    'tueste' : 'Ligero',
    'origen' : 'Veracruz',
    'precio' : '250',
    'createdA' : '2026-07-30T22:24:45.123Z'
})

addItemCard({
    'tag' : 'Brazil Cerrado',
    'imagen' : '../assets/images/catalogo/05.png',
    'nombre' : 'Nuez de Brasil',
    'descripcion' : 'Baja acidez, cuerpo cremoso y potentes notas de avellana tostada.',
    'tueste' : 'Oscuro',
    'origen' : 'Veracruz',
    'precio' : '190',
    'createdA' : '2026-07-30T22:24:45.123Z'
})

addItemCard({
    'tag' : 'Signature Blend',
    'imagen' : '../assets/images/catalogo/06.png',
    'nombre' : 'Mezcla Amanecer',
    'descripcion' : 'Nuestra mezcla insignia diseñada para un espresso vibrante y dulce.',
    'tueste' : 'Ligero',
    'origen' : 'Veracruz',
    'precio' : '310',
    'createdA' : '2026-07-30T22:24:45.123Z'
})


