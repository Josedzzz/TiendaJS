import Node from "./Node.js";

export default class LinkedList {
    constructor() {
        this.head = null;
    }

    // Metodo para insertar un nodo en orden cronologico
    insertInOrder(data) {
        const newNode = new Node(data);
        if (!this.head || data.fecha < this.head.data.fecha) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next && data.fecha > current.next.data.fecha) {
                current = current.next;
            }
            newNode.next = current.next;
            current.next = newNode;
        }
    }

    // Metodo para eliminar una venta de la linkedList
    deleteVenta(codigoVenta) {
        let current = this.head;
        let prev = null;

        while (current !== null) {
            if (current.data.codigo === codigoVenta) {
                if (prev === null) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                if (current === this.tail) {
                    this.tail = prev;
                }
                this.length--;
                return true; // Venta eliminada con éxito
            }
            prev = current;
            current = current.next;
        }
        return false; // Venta no encontrada
    }

    // Metodo para obtener el historial completo de ventas
    getSalesHistory() {
        const history = [];
        let current = this.head;
        while (current) {
            history.push(current.data);
            current = current.next;
        }
        return history;
    }
}