const shell = require ('node-powershell');
const _ = require ('lodash');
const path = require ('path');
const uuid = require ('uuid/v4');
const jsonfile = require ('jsonfile');
let ps = new shell ();
let ObjectID = require ('mongodb').ObjectID;

module.exports = (app, db) => {
  app.get ('/ereviews/playground', (req, res) => {
    res.sendFile (path.join (__dirname + '/public/playground.html'));
  });
  app.get ('/ereviews/reports', (req, res) => {
    res.sendFile (path.join (__dirname + '/public/reports.html'));
  });
  app.get ('/ereviews', (req, res) => {
    res.sendFile (path.join (__dirname + '/public/index.html'));
  });

  app.get ('/uniweb', (req, res) => {
    res.sendFile (path.join (__dirname + '/public/uniweb.html'));
  });

  app.get ('/', (req, res) => {
    res.sendFile (path.join (__dirname + '/public/menu.html'));
  });

  app.post ('/ereviews', (req, res) => {
    const testId = req.body.testId;
    ps
      .addCommand (`npm run ${testId}`)
      .then (result => {
        ps.invoke ().then (output => {
          console.log (output);
          res.send (output);
        });
      })
      .catch (err => {
        res.send ({error: err});
      });
  });

  app.post ('/uniweb', (req, res) => {
    const testId = req.body.testId;
    ps
      .addCommand (`cd ..\\; npm run UNIWEB_${testId}; cd UI`)
      .then (result => {
        ps.invoke ().then (output => {
          console.log (output);
          res.send (output);
        });
      })
      .catch (err => {
        res.send ({error: err});
      });
  });

  // Write credentials to credentials.json
  app.post ('/ereviews/credentials', (req, res) => {
    const data = req.body;
    const filename = './tests/credentials.json';

    jsonfile.writeFile (filename, data, err => {
      console.log (err);
    });
  });

  app.get ('/ereviews/credentials', (req, res) => {
    const filename = '../tests/credentials.json';

    jsonfile.readFile (filename, (err, data) => {
      if (err) {
        res.send ({error: 'Resources not found'});
      } else {
        res.send (JSON.stringify (data));
      }
    });
  });

  // <<<<  Reports  >>>>
  app.post ('/ereviews/report/create', (req, res) => {
    // console.log (req.body);
    let payload = req.body;
    payload.report.updatedAt = new Date ().toLocaleString ('en-GB', {
      h24: true,
    });
    payload.report.id = uuid ();

    let query = {username: payload.name};
    let newValues = {$push: {reports: payload.report}};

    db.collection ('users').updateOne (query, newValues, (err, results) => {
      if (err) {
        res.status (500).send ({error: 'An error has occurred'});
        console.log (err);
      } else {
        db.collection ('users').findOne (query, (err, updatedUser) => {
          // console.log (results);
          res.send (updatedUser);
        });
      }
    });
  });

  app.post ('/ereviews/report/delete', (req, res) => {
    let payload = req.body;

    let query = {_id: ObjectID (payload.userId)};
    let newValues = {$pull: {reports: {id: payload.reportId}}};

    db.collection ('users').updateOne (query, newValues, (err, results) => {
      if (err) {
        res.status (500).send ({error: 'An error has occurred'});
        console.log (err);
      } else {
        db.collection ('users').findOne (query, (err, updateUser) => {
          console.log (results);
          res.send (updateUser);
        });
      }
    });
  });

  app.post ('/ereviews/report/update', (req, res) => {
    let payload = req.body.payload;

    let query = {'reports.id': payload.reportId};
    let newValues = {
      $set: {
        'reports.$.number': payload.reportData.number,
        'reports.$.title': payload.reportData.title,
        'reports.$.error': payload.reportData.error,
        'reports.$.updatedAt': new Date ().toLocaleString (),
      },
    };

    db.collection ('users').updateOne (query, newValues, (err, results) => {
      if (err) {
        res.status (500).send ({error: 'An error has occurred'});
        console.log (err);
      } else {
        db.collection ('users').findOne (query, (err, updateUser) => {
          console.log (updateUser);
          res.send (updateUser);
        });
      }
    });
  });

  app.get ('/ereviews/reports/list', (req, res) => {
    const name = req.query.username;

    db.collection ('users').findOne ({username: name}, (err, user) => {
      if (err) {
        res.send ({error: 'An error has occured'});
        console.log (err);
      } else {
        res.setHeader ('Content-Type', 'application/json');

        if (user.reports.length <= 0) {
          res.send ({error: 'Error: The asked resource is empty'});
        } else {
          res.send (JSON.stringify (user));
        }
      }
    });
  });

  // <<< Users >>>
  app.post ('/ereviews/user/create', (req, res) => {
    // console.log (req.body);
    const user = {
      username: req.body.username,
      reports: {},
    };
    db.collection ('users').insert (user, (err, results) => {
      if (err) {
        res.send ({error: 'An error has occurred'});
        console.log (err);
      } else {
        res.send (results.ops[0]);
      }
    });
  });

  // <<<<  Testcases  >>>>
  app.post ('/ereviews/testcase/create', (req, res) => {
    const test = {
      id: req.body.id,
      title: req.body.title,
      desc: req.body.desc,
      prerequisite: req.body.prerequisite,
      email_involved: req.body.email_involved,
    };
    db.collection ('testcases').insert (test, (err, results) => {
      if (err) {
        res.send ({error: 'An error has occurred'});
        console.log (err);
      } else {
        res.send (results.ops[0]);
      }
    });
  });

  app.get ('/ereviews/testcases/list', (req, res) => {
    db.collection ('testcases').find ({}).toArray ((err, results) => {
      if (err) {
        res.send ({error: 'An error has occured'});
        console.log (err);
      } else {
        res.setHeader ('Content-Type', 'application/json');
        res.send (JSON.stringify (results));
      }
    });
  });
  // -----------------------------------------------
};
