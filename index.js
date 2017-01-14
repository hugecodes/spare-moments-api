const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const faker = require('faker');

const utils = require('./app/lib/utilities');

const User = require('./app/models/user');
const Moment = require('./app/models/moment');

mongoose.connect('mongodb://spare-moments:loweredexpectations@ds163698.mlab.com:63698/spare-moments');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT || 8080;

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Intercepted!`);
  next();
});

router.get('/', (req, res) => res.json({ message: 'Nailed it' }));

router.route('/users')
  // api/users/ POST
  .post((req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.profilePic = req.body.profilePic;
    user.skills = req.body.skills;

    user.save((err, user) => {
      if (err) {
        res.send(err)
      }
      res.json({ message: 'User Created', id: user._id });
    });
  })
  // api/users/ GET
  .get((req, res) => {
    User.find((err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users)
    });
  })

router.route('/users/:user_id')
  .get((req, res) => {
    User.findById(req.params.user_id, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  })

// Update active event
router.route('/users/:user_id/active_event')
    .put((req, res) => {
      User.findById(req.params.user_id, (err, user) => {
        if (err) {
          res.send(err);
        }

        user.activeEvent = req.body.active_event;

        user.save((err) => {
          if (err) {
            res.send(err);
          }

          res.json({ message: 'User updated!' });
        });
      });
    });

router.route('/moments')
  .get((req, res) => {
    Moment.find((err, moments) => {
      if (err) {
        res.send(err);
      }
      res.json(moments)
    });
  })
  .post((req, res) => {
    let moment = new Moment();
    let skillValue = utils.getRandomSkill()
    moment.name =faker.name.findName()
    moment.name = faker.name.findName();
    moment.address = `${faker.address.streetAddress()}, ${faker.address.city()} ${faker.address.country()}`;
    moment.skill = skillValue;
    moment.dateTime = utils.getADate();
    moment.length = utils.randomTime();
    moment.description = faker.lorem.paragraph();
    moment.image = faker.internet.avatar();
    moment.title = `${skillValue} stuff`;

    moment.save((err) => {
      if (err) {
        res.send(err)
      }

      res.json({ message: 'Moment Created' });
    });
  })

app.use('/api', router);
app.listen(port);

console.log('Magic happens on port ' + port);
