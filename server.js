const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: "Missing credentials" });
    }
    
    if (username === "admin" && password === "password1234") {
        return res.status(200).json({ token: "fake-jwt-token" });
    }
    
    return res.status(401).json({ error: "Invalid credentials" });
});

// Export app for testing purposes
module.exports = app;

if (require.main === module) {
    app.listen(3000, () => console.log('Server running on port 3000'));
}
