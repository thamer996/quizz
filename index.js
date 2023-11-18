const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 5000||process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

const adminRoutes = require('./routes/adminRoutes');
const badgeRoutes = require('./routes/badgeRoutes');
const clientRoutes = require('./routes/clientRoutes');
const quizRoutes = require('./routes/quizzesRoutes');
const questionRoutes = require('./routes/questionsRoutes');
const quizResultsRoutes = require('./routes/quizResultsRoutes');
const clientBadgesRoutes = require('./routes/clientbdgRoutes');
const categorieRoutes = require('./routes/categorieRoutes');

app.use('/api/Questions', questionRoutes);
app.use('/api/Badges', badgeRoutes);
app.use('/api/Quizzes', quizRoutes);
app.use('/api/Admins', adminRoutes);
app.use('/api/Clients', clientRoutes);
app.use('/api/QuizzResults', quizResultsRoutes);
app.use('/api/ClientBadges', clientBadgesRoutes);
app.use('/api/Categories', categorieRoutes);

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
