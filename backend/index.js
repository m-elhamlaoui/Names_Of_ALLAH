const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 5000;
const mongoURI = 'mongodb+srv://choulliimane6:GgUACcTsQ2ZVdww2@cluster0.jfe5sgq.mongodb.net/dev?retryWrites=true&w=majority&appName=Cluster0'; 
const jwtSecret = 'AsZ9NU5OwhW2MWeq';

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"]
}));

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// defining schemas
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 },
    resolvedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question', default:[] }]
});

const User = mongoose.model('User', userSchema);

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers: [
        {
            text: { type: String, required: true },
            correct: { type: Boolean, required: true }
        }
    ]
});

const Question = mongoose.model('Question', questionSchema);

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword, resolvedQuestions:[] });
        await newUser.save();
        const allQuestions = await Question.find();
        const token = jwt.sign({ id: newUser._id, username: newUser.username, score:newUser.score }, jwtSecret, { expiresIn: '1h' });

        res.status(201).json({ token, questions:allQuestions });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username }).populate('resolvedQuestions');
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, username: user.username, score:user.score }, jwtSecret, { expiresIn: '1h' });

        const resolvedQuestionIds = user.resolvedQuestions ? user.resolvedQuestions.map(q => q._id.toString()) : [];
        const allQuestions = await Question.find({_id:{$nin:resolvedQuestionIds}});

        res.json({ token, questions: allQuestions });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' });
    }
});

// Middleware to verify JWT
const auth = (req, res, next) => {
    // Get the authorization header
    const authHeader = req.headers['authorization'];
    
    // Check if the header is present
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Split the header to extract the token
        const token = authHeader.split(' ')[1];
        
        // Verify the token
        const decoded = jwt.verify(token, jwtSecret);
        
        // Attach the decoded user information to the request object
        req.user = decoded;
        
        // Call the next middleware
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};



app.post('/update-user', auth, async (req, res) => {
    const { questionId, isCorrect, id } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user?.resolvedQuestions?.includes(questionId)) {
            user.resolvedQuestions.push(questionId);

            if (isCorrect) {
                user.score += 1;
            }

            await user.save();
        }

        res.json({ message: 'User updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/reset-user', auth, async (req, res) => {
    const { id } = req.body;

    try {
        // Reset the user's resolved questions and score
        await User.findByIdAndUpdate(id, { resolvedQuestions: [], score: 0 });

        // Retrieve new questions
        const allQuestions = await Question.find({});
        res.json({ questions: allQuestions });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


app.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
