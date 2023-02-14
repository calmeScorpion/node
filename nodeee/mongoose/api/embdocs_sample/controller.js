const embdocs = require('../../model/embdocs_schema');

const getDocs = (req, res, next) => {
  embdocs.find((err, data) => {
    res.json(data);
  });
};

const createDocs = (req, res, next) => {
  let schema = req.body;
  const newDoc = new embdocs(schema);
  newDoc.save((err, data) => {
    if (err) console.log(err);
    else res.redirect('/embdoc');
  });
};

const updateOne = (req, res, next) => {
  let schema = req.body;
  embdocs.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      schema.comments.forEach((element) => {
        data.comments.push(element);
      });
      const newDoc = new embdocs(data);
      newDoc.save((erre, data) => {
        if (err) console.log(err);
        else res.redirect('/embdoc');
      });
    }
  });
};



module.exports = { getDocs, createDocs, updateOne };
