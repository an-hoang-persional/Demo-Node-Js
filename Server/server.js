const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

const Responses = require('./common/responses');

const AuthRoutes = require('./routes/auth');
const CarRoutes = require('./routes/cars');
const CarModelRoutes = require('./routes/cars_model');
const ColorRoutes = require('./routes/colors');
const CompanyRoutes = require('./routes/companies');
const CountryRoutes = require('./routes/countries');
const GenreRoutes = require('./routes/genres');
const JobTitleRoutes = require('./routes/job_titles');
const MovieRoutes = require('./routes/movies');
const UniversityRoutes = require('./routes/universities');
const UserRoutes = require('./routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.get('*', (req, res) => {
    return res.send(Responses.error('Not Found !', 404));
});
app.use('/api/auth', AuthRoutes);
app.use('/api/cars', CarRoutes);
app.use('/api/cars-model', CarModelRoutes);
app.use('/api/colors', ColorRoutes);
app.use('/api/companies', CompanyRoutes);
app.use('/api/countries', CountryRoutes);
app.use('/api/genres', GenreRoutes);
app.use('/api/job-titles', JobTitleRoutes);
app.use('/api/movies', MovieRoutes);
app.use('/api/universities', UniversityRoutes);
app.use('/api/users', UserRoutes);

// If the specified request is not found.
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// If all other requests are not implemented.
app.use(Responses.errorHandler);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
