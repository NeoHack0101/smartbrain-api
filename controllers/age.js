const handlePreviousAge = (req, res, db) => {
  const { id, previous_age } = req.body
  console.log(req.body)
  db('users')
    .where('id', '=', id)
    .update({ previous_age: previous_age })
    .returning('previous_age')
    .then(age => res.json(age[0]))
    .catch(err => res.status(400).json('unable to get previous_age'))
}

module.exports = { handlePreviousAge }

//
