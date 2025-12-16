const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/output', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/output.html'));
});

app.post('/bmi-calculator', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height)/100;

    if (Number.isNaN(weight) || Number.isNaN(height) || weight <= 0 || height <= 0) {
        return res.redirect("/output?error=" + encodeURIComponent("Please enter positive numbers for weight and height."));
    }

    const bmi = weight / (height * height);
    let category = '';
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }
    res.redirect(`/output?bmi=${encodeURIComponent(bmi.toFixed(2))}&category=${encodeURIComponent(category)}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});