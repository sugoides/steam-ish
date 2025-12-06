// server.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');

const authRoutes = require('./src/routes/auth');
const profileRoutes = require('./src/routes/profile');
require('./src/auth/passport'); // init strategy

const app = express();

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layout'); // default layout file: views/layout.ejs

// Security & performance
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(compression());
app.use(morgan('dev'));

// Sessions (memory store for dev; use Redis in prod)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Static & views
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// 404
app.use((req, res) => res.status(404).render('index', { user: req.user }));

const port = process.env.PORT || 3000;
const URL = process.env.BASE_URL;;
app.listen(port, () => console.log(`Listening on http://localhost:${port} - BASE_URL: ${URL}`));
