const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const connectDB = require('./db/conn');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const User = require('./model/user');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, "..", 'templates', 'layouts'),
    partialsDir: path.join(__dirname, "..", 'templates', 'partial')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '..', 'templates', 'views'));

app.use('/', userRoutes);

const softwareJobs = [
    { id: 1, title: 'Frontend Developer', description: 'Job details for Frontend Developer...' },
    { id: 2, title: 'Backend Developer', description: 'Job details for Backend Developer...' },
    { id: 3, title: 'We Will Update Soon.... ', description: 'We Will Update Soon....' }
];

const hardwareJobs = [
    { id: 4, title: 'Microelectronics Engineer', description: 'Job details for Microelectronics Engineer...' },
    { id: 5, title: 'Robotics Engineer', description: 'Job details for Robotics Engineer...' },
    { id: 6, title: 'We Will Update Soon.... ', description: 'We Will Update Soon....' }
];

function findJobById(id) {
    return [...softwareJobs, ...hardwareJobs].find(job => job.id === parseInt(id));
}

app.get('/software', (req, res) => {
    res.render('software', { title: 'Software Specialization', jobs: softwareJobs });
});

app.get('/hardware', (req, res) => {
    res.render('hardware', { title: 'Hardware Specialization', jobs: hardwareJobs });
});

app.get('/job/:id', (req, res) => {
    const jobId = req.params.id;
    const job = findJobById(jobId);
    if (job) {
        res.render('job_detail', { title: job.title, job });
    } else {
        res.status(404).send('Job not found');
    }
});

app.get('/register', (req, res) => {
    res.render('registration', { message: '' });
});

app.post('/register', async (req, res) => {
    const { name, username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.render('registration', { message: 'Passwords do not match' });
    }

    const user = new User({ name, username, email, password });
    await user.save();

    res.render('registration', { message: 'Registration successful!' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

app.get('/jobs_internship', (req, res) => {
    res.render('jobs_internship', { title: 'Jobs & Internships' });
});

app.get('/mentoring', (req, res) => {
    res.render('mentoring', { title: 'Mentoring' });
});

app.get('/', (req, res) => {
    res.render('index', { title: 'CareerCraft' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
