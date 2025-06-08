const Evento = require('../models/eventsModels');

exports.crearEvento = (req, res) => {
    const { nombre_evento, fecha_inicio, fecha_termino, descripcion, ubicacion, url } = req.body;
    
    if (!nombre_evento || !fecha_inicio || !fecha_termino || !descripcion || !ubicacion || !url) {
        return res.status(400).json({ mensaje: "Datos incompletos" });
    }
    
   Evento.crear(req.body, (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ mensaje: "Error al crear el evento" });
        }

        res.status(201).json({ mensaje: "Evento creado exitosamente", eventoId: result.insertId });
    });
}

exports.obtenerEventos = (req, res) => {
    Evento.obtenerTodos((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: "Error al obtener eventos" });
        }
        res.status(200).json(results);
    });
}
exports.eliminarEvento = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ mensaje: "ID de evento requerido" });
    }

    Evento.eliminar(id, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: "Error al eliminar el evento" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Evento no encontrado" });
        }
        res.status(200).json({ mensaje: "Evento eliminado exitosamente" });
    });
}

exports.actualizarEvento = (req, res) => {
    const { id } = req.params;
    const { nombre_evento, fecha_inicio, fecha_termino, descripcion, ubicacion, url } = req.body;

    if (!id || !nombre_evento || !fecha_inicio || !fecha_termino || !descripcion || !ubicacion || !url) {
        return res.status(400).json({ mensaje: "Datos incompletos" });
    }

    Evento.actualizar(id, req.body, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: "Error al actualizar el evento" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Evento no encontrado" });
        }
        res.status(200).json({ mensaje: "Evento actualizado exitosamente" });
    });
}