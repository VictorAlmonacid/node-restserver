const express = require("express");

const { verificarToken } = require("../middlewares/autenticacion");
const producto = require("../models/producto");

let app = express();
let Producto = require("../models/producto");

/* OBTENER PRODUCTOS*/

app.get("/productos", verificarToken, (req, res) => {
  //trae todos los productos
  //populate: usuario categoria
  //paginado

  let desde = req.query.desde || 0;
  desde = Number(desde);

  Producto.find({ disponible: true })
    .skip(desde)
    .limit(5)
    .populate("usuario", "nombre email")
    .exec((err, productos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        productos,
      });
    });
});

/* OBTENER PRODUCTO por id*/
app.get("/productos/:id", verificarToken, (req, res) => {
  //populate: usuario categoria
  //paginado

  let id = req.params.id;

  Producto.findById(id)
    .populate("usuario", "nombre email")
    .populate("categorias", "nombre")
    .exec((err, productoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      if (err) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "ID no existe",
          },
        });
      }
      res.json({
        ok: true,
        producto: productoDB,
      });
    });
});

/* buscar productos*/
app.get('/productos/buscar/:termino', verificarToken, (req, res)=>{

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

Producto.find({nombre: regex})
        .populate('categorias', 'nombre')
        .exec((err, productos)=>{
            if (err) {
                return res.status(500).json({
                  ok: false,
                  err,
                });
              }
              res.json({
                ok: true,
                productos
              });
        });

});

/* CREAR UN PRODUCTO*/
app.post("/productos", verificarToken, (req, res) => {
  //grabar el usuario
  //grabar una categoria del listado

  let body = req.body;
  let producto = new Producto({
    usuario: req.usuario._id,
    nombre: body.nombre,
    precioUni: body.precioUni,
    descripcion: body.descripcion,
    disponible: body.disponible,
    categoria: body.categoria,
  });

  producto.save((err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    res.status(201).json({
      ok: true,
      producto: productoDB,
    });
  });
});

/* ACTUALIZAR UN PRODUCTO*/
app.put("/productos/:id", verificarToken, (req, res) => {
  //grabar el usuario
  //grabar una categoria del listado

  let id = req.params.id;
  let body = req.body;

  Producto.findById(id, (err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID no existe",
        },
      });
    }

    productoDB.nombre = body.nombre;
    productoDB.precioUni = body.precioUni;
    productoDB.categoria = body.categoria;
    productoDB.disponible = body.disponible;
    productoDB.descripcion = body.descripcion;

    productoDB.save((err, productoGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        producto: productoGuardado,
      });
    });
  });
});

/* BORRAR UN PRODUCTO*/
app.delete("/productos/:id", verificarToken, (req, res) => {
  //grabar el usuario
  //grabar una categoria del listado

  let id = req.params.id;

  Producto.findById(id, (err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (err) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Producto no existe",
        },
      });
    }
    productoDB.disponible = false;

    productoDB.save((err, productoBorrado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        producto: productoBorrado,
        mensaje: "Producto borrado",
      });
    });
  });
});
module.exports = app;
