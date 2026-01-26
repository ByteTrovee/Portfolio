require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); 
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
            title: 'StorxByte Broker',
            image: '/images/WhatsApp Image 2025-12-22 at 3.17.21 AM.jpeg',
            tags: ['Data Visualization', 'React', 'Node.js'],
            description: 'Real-time analytics dashboard for e-commerce businesses with predictive sales forecasting and customer behavior insights.',
            liveUrl: 'https://staupdate-frontend.pages.dev/signup',
            caseStudyUrl: '/case-study/2',
            caseStudyExplanation: 'StorxByte Broker is a full-stack cryptocurrency trading platform designed to provide users with a fast, secure, and intuitive way to trade major digital assets such as Bitcoin and Ethereum. The project was built to solve common issues found in many trading platforms, including performance bottlenecks, rigid backend structures, and complex user interfaces that discourage usability. To address these challenges, the application adopts a microservices architecture, allowing core functionalities such as authentication, trading operations, user management, and transaction handling to operate as independent services. This approach improves scalability, fault isolation, and long-term maintainability while aligning with real-world fintech and blockchain system design practices. The frontend is developed using Next.js and Tailwind CSS to deliver a fast, SEO-optimized, and fully responsive user interface. Next.js enables server-side rendering and efficient routing, improving load times and overall user experience, while Tailwind CSS ensures a consistent, modern design with rapid UI development. On the backend, Node.js provides an event-driven, non-blocking environment capable of handling concurrent trading requests, while MongoDB offers flexible and efficient data storage for users, transactions, and asset information. Secure authentication flows, proper data validation, and structured APIs ensure data integrity and user safety. Performance and reliability were key priorities throughout development, with the system designed to support multiple users simultaneously without degrading responsiveness. Overall, StorxByte Broker demonstrates strong full-stack engineering principles by combining scalable backend architecture, clean API design, and a user-focused frontend, making it a solid example of a production-ready financial application.'
        },
        {
            id: 3,
            title: 'Grademate',
            image: '/images/grademates2.jpg.png',
            tags: ['Flask', 'Next', 'MongoDB', 'Tailwind', 'TypeScript', 'Microservices'],
            description: 'GradeMate is an intelligent exam grading system that automates the evaluation of student responses.It accepts multiple file formats (TXT, PDF, DOCX), parses student details and answers, compares them with an answer key,and generates accurate results instantly. Built with Flask, MongoDB, and modern web technologies (Next.js, TypeScript, Tailwind CSS, Node.js),the system is designed for scalability and seamless integration with microservices.',
            liveUrl: 'https://grademates.netlify.app/',
            caseStudyUrl: '/case-study/3',
            caseStudyExplanation: 'GradeMate is an intelligent exam grading system built to automate and simplify the evaluation of student responses while eliminating the delays and errors associated with manual marking. The system is designed to accept multiple file formats including TXT, PDF, and DOCX, allowing institutions and educators to upload student submissions in commonly used document types. Using tools such as pdfplumber and DOCX parsers, GradeMate accurately extracts student details and answers from uploaded files, processes the content, and compares responses against a predefined answer key to generate instant and reliable results. The backend is powered by Flask and MongoDB, providing a lightweight yet scalable foundation for handling grading logic, data storage, and result management. MongoDB’s flexible schema supports varied exam structures and evolving academic requirements, while Flask enables rapid development and seamless API communication. The frontend is built with Next.js, TypeScript, and Tailwind CSS to deliver a fast, responsive, and user-friendly interface that supports real-time feedback and smooth navigation. Node.js is used to support auxiliary services and integrations, enabling the system to operate within a microservices architecture that promotes modularity, scalability, and easier maintenance. GradeMate is designed with performance, accuracy, and extensibility in mind, making it suitable for schools, training centers, and examination bodies seeking a modern, automated grading solution that improves efficiency, reduces workload, and enhances academic transparency.'
        },
        {
            id: 4,
            title: 'Health Helper',
            image: '/images/healthhelper1.jpg.png',
            tags: ['IoT', 'Embedded Systems', 'Cloud'],
            description: 'Integrated smart home system with energy optimization and remote control capabilities.',
            liveUrl: 'https://health-helper.netlify.app/',
            caseStudyUrl: '/case-study/4',
            caseStudyExplanation: 'Health Assistant is an AI-driven conversational health platform built to help users better understand their physical and mental well-being through accessible, real-time interactions. The system allows users to start health-related conversations that are automatically saved and restored, ensuring continuity and a personalized experience across sessions. Health Assistant provides detailed medication and treatment information, including usage guidance and potential interactions, enabling users to make more informed decisions while emphasizing safety and awareness. Through intelligent symptom analysis, the platform helps users interpret health indicators and understand possible causes of common conditions without replacing professional medical advice. The chatbot also promotes preventive care by offering wellness tips, lifestyle recommendations, and general health education aimed at improving long-term quality of life. In addition to physical health support, Health Assistant includes mental wellness features that offer emotional support, stress management guidance, and encouragement during challenging moments. Designed with a user-friendly conversational interface, the platform makes health information more approachable and less intimidating, particularly for users who may hesitate to seek immediate medical attention. Health Assistant is built to be scalable, privacy-conscious, and adaptable for integration into broader healthcare systems, making it suitable for personal use, telehealth platforms, and digital wellness applications.'
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
    res.render('contact', {
        siteName: 'ByteTrovee',
        supportEmail: 'bytetrovee@gmail.com',
        emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY || '',
        emailjsServiceId: process.env.EMAILJS_SERVICE_ID || '',
        emailjsContactTemplateId: process.env.EMAILJS_CONTACT_TEMPLATE_ID || '',
        pageTitle: 'Contact Us'
    });
});

app.post('/contact', async (req, res) => {
});

app.get('/contact/success', (req, res) => {
    res.render('contactsuccess', {
        title: 'Message Sent Successfully'
    });
});

app.get('/contact/error', (req, res) => {
    const errorMessage = req.query.message || 'An unexpected error occurred.';
    
    res.render('contacterror', {
        title: 'Oops! Something Went Wrong',
        errorMessage: errorMessage,
        errorDetails: req.query.details || null
    });
});

app.get('/quote', function(req, res){
    res.render('quote', {
        siteName: 'ByteTrovee',
        supportEmail: 'bytetrovee@gmail.com',
        emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY,
        emailjsServiceId: process.env.EMAILJS_SERVICE_ID,
        emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID,
    });
});

app.post('/quote', function(req, res){
    const publicKey = process.env.EMAILJS_PUBLIC_KEY || '';
    
    res.render('quote', {
        siteName: 'ByteTrovee',
        supportEmail: 'bytetrovee@GMAIL.com',
        emailjsPublicKey: publicKey,
        emailjsServiceId: process.env.EMAILJS_SERVICE_ID || '',
        emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID || '',
    });
});

app.get('/quote/success', (req, res) => {
    res.render('quote-success', {
        title: 'Quote Request Submitted'
    });
});

app.get('/quote/error', (req, res) => {
    res.render('quote-error', {
        title: 'Error Submitting Quote',
        errorMessage: req.query.message || 'An error occurred.'
    });
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/pricing/project-based', function(req, res){
    res.render('projectbased');
});

app.post('/pricing/project-based', async (req, res) => {
    console.log('📋 Project inquiry submitted:', req.body);
    
    try {
        const { 
            fullName,
            companyName,
            email,
            phone,
            projectType,
            budget,
            timeline,
            projectTitle,
            description
        } = req.body;

    } catch (error) {
        console.error('❌ Project inquiry error:', error.message);
        
        let errorMessage = 'Something went wrong. Please try again later.';
        
        if (error.code === 'EAUTH') {
            errorMessage = 'Email authentication failed.';
        } else if (error.message.includes('Invalid login')) {
            errorMessage = 'Invalid email credentials.';
        }
        
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
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

app.get('/privacy', function(req, res) {
    res.render('privacy')
})

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