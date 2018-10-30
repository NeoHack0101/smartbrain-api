const Clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: '3ec8ae8c060f41ea9c1b3f3fd997ff69'
})

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.DEMOGRAPHICS_MODEL, req.body.input)
    .then(response => res.json(response))
    .catch(err => res.status(400).json('error unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('unable to get entries'))
}

const handleAge = (req, res, db) => {
  const { id, age } = req.body
  db('users')
    .where('id', '=', id)
    .update({ previous_age: age })
    .then(res.json('all gucci'))
    .catch(err => res.status(400).json('ERROR in the server call'))
}

module.exports = { handleImage, handleApiCall, handleAge }
