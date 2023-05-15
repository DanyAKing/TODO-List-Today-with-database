const methodOverride = require('method-override');
const express = require('express');
const { engine } = require('express-handlebars');
const { redirect } = require('./src/routers/redirect');
const { routers } = require('./src/routers/routers');
const { handleError } = require('./errors-handling/error-handling');

const app = express();

app.use(express.urlencoded({
  extended: true,
}));
// app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/', redirect);
app.use('/todolist', routers);
app.engine('hbs', engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use((err, req, res, next) => {
  handleError(err, req, res);
});

app.listen(3000, '127.0.0.1', () => {
  console.log('Server started successfully!');
});
