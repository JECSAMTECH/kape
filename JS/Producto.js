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
    const tueste = document.querySelector('#input-tueste').value;
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
    
    const createdAt = new Date();

    // Add the task to the task manager
    itemsController.addItem(name, description, createdAt);

    // Clear the form
    newItemNameInput.value = '';
    newItemDescription.value = '';
});


function addItemCard(item) {
    const itemHTML = '<div class="card" style="width: 18rem;">\n' +
        '    <img src="' + item.img + '" class="card-img-top" alt="image">\n' +
        '    <div class="card-body">\n' +
        '        <h5 class="card-title">' + item.name + '</h5>\n' +
        '        <p class="card-text">' + item.description + '</p>\n' +
        '        <a href="#" class="btn btn-primary">Add</a>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<br/>';
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML += itemHTML;
}

addItemCard({
    'name': 'juice',
    'img': 'https://www.gs1india.org/media/Juice_pack.jpg',
    'description': 'Orange and Apple juice fresh and delicious'
});

addItemCard({
    'name': 'Tayto',
    'img': 'https://www.irishtimes.com/polopoly_fs/1.4078148!/image/image.jpg',
    'description': 'Cheese & Onion Chips'
})