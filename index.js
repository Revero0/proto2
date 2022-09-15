var express = require('express');
var app = express();

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const Comments = sequelize.define('Comments', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
});

(async () => {
await Comments.sync();
})();
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', async function(req, res) {
    const { content } = req.body
    await Comments.create({ content: content });
    res.render('index', {comments:comments});
});

app.post('/create', async function(req, res) {
  const { content } = req.body
  await Comments.create({ content: content });
  res.redirect('/')
  });



app.listen(300);
