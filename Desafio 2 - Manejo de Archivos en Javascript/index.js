const fs = require("fs");

class Contenedor {
  constructor(fileName) {
    this.name = fileName;
  }
  save(obj) {
    fs.readFile(this.name, "utf-8", (err, data) => {
      if (err) throw "Error leyendo el archivo!";
      const info = eval(data);
      let maxId = 1;
      if (info !== undefined) {
        info.forEach((item) => {
          if (item.id >= maxId) {
            maxId = item.id;
          }
        });
        maxId++;
      }
      obj.id = maxId;
      info.push(obj);

      fs.unlink(this.name, (err) => {
        if (err) throw "Error borrando el archivo";
      });
      fs.writeFile(this.name, "", "utf-8", (err) => {
        if (err) throw "Error creando el archivo";
      });
      fs.appendFile(this.name, JSON.stringify(info), "utf-8", (err) => {
        if (err) throw "Error leyendo el archivo!";

        console.log("Archivo añadido!");
      });
    });
  }

  getById(id) {
    fs.readFile(this.name, "utf-8", (err, data) => {
      if (err) throw "Error leyendo el archivo!";
      const info = eval(data);
      const match = info.find((item) => item.id === id);
      if (match) {
        console.log(match);
      } else {
        console.log("Item no encontrado!");
      }
    });
  }
  getAll() {
    fs.readFile(this.name, "utf-8", (err, data) => {
      if (err) throw "Error leyendo el archivo!";
      console.log(data);
    });
  }
  deleteById(id) {
    fs.readFile(this.name, "utf-8", (err, data) => {
      if (err) throw "Error leyendo el archivo!";
      const info = eval(data);
      const match = info.filter((item) => item.id !== id);

      fs.writeFile(this.name, JSON.stringify(match), "utf-8", (err) => {
        if (err) throw "Error en la escritura";

        console.log("borrado exitoso");
      });
    });
  }
  deleteAll() {
    fs.unlink(this.name, (err) => {
      if (err) throw "Error borrando el archivo";
      console.log("Archivo borrado");
    });
    fs.writeFile(this.name, "", "utf-8", (err) => {
      if (err) throw "Error creando el archivo";

      console.log("Ahora esta vacio.");
    });
  }
}

const myContenedor = new Contenedor("productos.txt");
const myObj = {
  title: "Lapiz",
  price: 100,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  id: "",
};

myContenedor.getAll();
// myContenedor.getById(2);
// myContenedor.deleteById(1);
// myContenedor.deleteAll();
// myContenedor.save(myObj);
