require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cors = require('cors')

const projects = [
        {
            id: 1,
            title: 'Ladynmous',
            image: '/images/ladynmous2.jpg.png',
            tags: ['Node.js', 'MongoDb', 'Data Protection', 'Media Sharing'],
            description: 'Ladynmous is a modern anonymous messaging platform designed to let users receive honest opinions, confessions, and feedback without revealing the sender’s identity. It generates a unique shareable link for every user, allowing friends, followers, or customers to send messages privately and securely.',
            liveUrl: 'https://ladynmous.onrender.com/',
            caseStudyUrl: '/case-study/1',
            caseStudyExplanation:'Ladynmous is a privacy-focused anonymous messaging platform built to give people a simple and secure way to receive honest feedback, confessions, thoughts, and opinions without exposing the identity of the sender. The idea came from noticing how difficult it is for people to share real feelings on mainstream social platforms where identity is always tied to every interaction, so the goal was to create something minimal, fast, clean, and genuinely anonymous. When a user signs up, Ladynmous automatically generates a unique link tied to their account, which can be shared anywhere such as Instagram stories, WhatsApp statuses, tweets, Snapchat, or direct messages. Anyone with the link can send a message anonymously without needing an account or providing any information. The sender’s identity isn’t tracked, logged, or stored; only the message content is saved. Users can view all received messages on their dashboard, copy them, or share them back out easily, keeping the experience smooth and distraction-free. The interface is intentionally simple and modern, built with TailwindCSS for a clean, responsive design. On the backend, Ladynmous uses Node.js and Express, with MongoDB Atlas handling data storage. Each user gets a UUID-based link for security and uniqueness. Deployment was done on Render, and part of the development involved fixing production route issues, MongoDB cluster pauses, and ensuring link routing worked consistently outside the local environment. Overall, Ladynmous is a demonstration of simplicity combined with thoughtful backend architecture. It is fast, lightweight, and focused on creating a safe space for honest communication. Beyond its functionality, it stands as a strong portfolio project showcasing backend development, authentication logic, cloud database integration, clean UI design, routing, and full deployment workflows.'
        },
        {
            id: 2,
            title: 'E-Commerce Analytics Dashboard',
            image: '/images/project2.jpg',
            tags: ['Data Visualization', 'React', 'Node.js'],
            description: 'Real-time analytics dashboard for e-commerce businesses with predictive sales forecasting and customer behavior insights.',
            liveUrl: '#',
            caseStudyUrl: '#',
            caseStudyExplanation: ''
        },
        {
            id: 3,
            title: 'Health & Fitness Mobile App',
            image: '/images/project3.jpg',
            tags: ['Mobile Development', 'Health Tech', 'UI/UX'],
            description: 'Comprehensive fitness tracking app with AI-powered workout recommendations and nutrition planning.',
            liveUrl: '#',
            caseStudyUrl: '#',
            caseStudyExplanation: ''
        },
        {
            id: 4,
            title: 'Smart Home IoT System',
            image: '/images/project4.jpg',
            tags: ['IoT', 'Embedded Systems', 'Cloud'],
            description: 'Integrated smart home system with energy optimization and remote control capabilities.',
            liveUrl: '#',
            caseStudyUrl: '#',
            caseStudyExplanation: ''
        }
    ]
const app = express();
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('home');
});

app.get('/portfolio', (req, res) => {
    
    res.render('portfolio',)
});

app.get('/pricing', function(req, res){
    res.render('pricing');
});

app.get('/ai', function(req, res){
    res.render('ai');
});

app.get('/contact', function(req, res){
    res.render('contact');
});

app.post('/contact', async (req, res) => {
    try {
        // 1. Get data from the frontend form
        const { name, email, subject, message } = req.body;

        // 2. Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields'
            });
        }

        // 3. Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // 4. Set up email transporter (Gmail example)
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // From .env file
                pass: process.env.EMAIL_PASS  // From .env file
            }
        });

        // 5. Create email to send to yourself
        const mailOptions = {
            from: email, // Person who filled the form
            to: process.env.CONTACT_EMAIL, // Your business email
            subject: `New Contact: ${subject || 'No Subject'}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Email:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        // 6. Send the email
        await transporter.sendMail(mailOptions);

        // 7. Send success response to frontend
        res.status(200).json({
            success: true,
            message: 'Message sent successfully! We\'ll get back to you soon.'
        });

    } catch (error) {
        // 8. Handle errors
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.'
        });
    }
});


app.get('/quote', function(req, res){
    res.render('quote');
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/pricing/project-based', function(req, res){
    res.render('projectbased');
});

app.post('/pricing/project-based', function(req, res){
    res.render('projectbased');
});

app.get('/case-study/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        return res.status(404).render('404', { 
            message: 'Project not found' 
        });
    }
    
    res.render('eachproject', { 
        title: `${project.title} - Case Study`,
        project: project
    });
});

app.use((req, res, next) => {
    res.status(404).render('404',)
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('404')
});

app.listen(process.env.PORT || 3000, function(req, res) {
    console.log("app running on port 3000")
})