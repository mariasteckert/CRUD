const Cor = require('../models/corModel');

const corController = {

    createCor: (req, res) => {
        const newCor = {
            nome: req.body.nome,
            codigo: req.body.codigo
        };

        Cor.create(newCor, (err, corId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/cores');
        });
    },

    getCorById: (req, res) => {
        const corId = req.params.id;

        Cor.findById(corId, (err, cor) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!cor) {
                return res.status(404).json({ message: 'Cor não encontrada' });
            }
            res.render('cores/show', { cor });  // plural 'cores'
        });
    },

    getAllCores: (req, res) => {
        Cor.getAll((err, cores) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('cores/index', { cores });  // plural 'cores'
        });
    },

    renderCreateForm: (req, res) => {
        res.render('cores/create');  // plural 'cores'
    },

    renderEditForm: (req, res) => {
        const corId = req.params.id;

        Cor.findById(corId, (err, cor) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!cor) {
                return res.status(404).json({ message: 'Cor não encontrada' });
            }
            res.render('cores/edit', { cor });  // plural 'cores'
        });
    },

    updateCor: (req, res) => {
        const corId = req.params.id;

        const updatedCor = {
            nome: req.body.nome,
            codigo: req.body.codigo
        };

        Cor.update(corId, updatedCor, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/cores');
        });
    },

    deleteCor: (req, res) => {
        const corId = req.params.id;

        Cor.delete(corId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/cores');
        });
    }
};

module.exports = corController;
