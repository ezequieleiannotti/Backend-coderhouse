const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async save(objeto) {
    try {
      /* busco id en archivo de ids, si existe.*/
      let ids = Array.from(
        JSON.parse(await fs.promises.readFile("./ids.txt", "utf-8"))
      );

      ids.push(ids[ids.length - 1] + 1);
      objeto.id = ids[ids.length - 1];
      fs.promises.writeFile("./ids.txt", JSON.stringify(ids));

      /* si el archivo existe, agrega un objeto al array */
      let arrayObjetos = JSON.parse(
        await fs.promises.readFile(this.archivo, "utf-8")
      );
      arrayObjetos.push(objeto);
      await fs.promises.writeFile(this.archivo, JSON.stringify(arrayObjetos));
      console.log("Objeto guardado correctamente en ", this.archivo);
    } catch (error) {
      if (error.code === "ENOENT") {
        /* si el archivo no existe, agrego el objeto en un archivo vacio */
        objeto.id = 1;
        await fs.promises.writeFile("./ids.txt", JSON.stringify([1]));
        await fs.promises.writeFile(this.archivo, JSON.stringify([objeto]));
        console.log("Objeto guardado correctamente en ", this.archivo);
      } else {
        console.log("Error guardando objeto en el fs. Code: ", error);
      }
    }
  }

  async getById(id) {
    try {
      const data = JSON.parse(
        await fs.promises.readFile(this.archivo, "utf-8")
      );
      const objeto = data.find((objeto) => objeto.id === id);
      return objeto ? objeto : `No se encontro el objeto con id ${id}`;
    } catch (error) {
      console.log("Error buscando objeto en el fs. Code: ", error);
    }
  }

  async getAll() {
    try {
      const data = JSON.parse(
        await fs.promises.readFile(this.archivo, "utf-8")
      );
      return data
        ? console.log(data)
        : "El archivo estÃ¡ vacÃ­o o tiene un problema";
    } catch (error) {
      console.log("Error buscando objetos del archivo. Code: ", error);
    }
  }

  async deleteById(id) {
    try {
      const data = JSON.parse(
        await fs.promises.readFile(this.archivo, "utf-8")
      );
      const nuevoArray = data.filter((objeto) => objeto.id !== id);
      await fs.promises.writeFile(this.archivo, JSON.stringify(nuevoArray));
      console.log(`Objeto de ID ${id} eliminado`);
    } catch (error) {
      console.log("Error eliminando objeto en el fs. Code: ", error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.archivo, "");
      console.log("Objetos eliminados");
    } catch (error) {
      console.log("Error eliminando objetos en el fs. Code: ", error);
    }
  }
}

const productos = [
  {
    title: "productoA",
    price: 100,
    thumbnail: "urlA",
  },
  {
    title: "productoB",
    price: 200,
    thumbnail: "urlB",
  },
  {
    title: "productoC",
    price: 300,
    thumbnail: "urlC",
  },
];

const archivo = new Contenedor("./productos.txt");

archivo.save(productos[0]);
archivo.getById(1).then((o) => console.log(o));
archivo.getAll();
archivo.deleteById(1);
archivo.deleteAll();
