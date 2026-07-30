class ItemsController{

    //constructor
    constructor(currentId = 0) {
        this.items = [];
        this.currentId = currentId;
    }

    //Agregar
    addItem(tag,
            imgProducto,
            nombreProducto,
            descripcionProducto,
            tueste,
            origen,
            precio
        ){
            const item = {
                id: this.currentId++,
                imgProducto: imgProducto,
                nombreProducto: nombreProducto,
                descripcionProducto: descripcionProducto,
                tueste: tueste,
                origen: origen,
                precio: precio
            }
            this.items.push(item);
        }

}