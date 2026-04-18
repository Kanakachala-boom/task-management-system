const db = require('../config/db');

exports.loginUser = (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: "Username and email required" });
    }

    // 🔹 Check if email already exists
    db.get(`SELECT * FROM Users WHERE email = ?`, [email], (err, existingUser) => {
        if (err) return res.status(500).json({ error: err.message });

        if (existingUser) {
            // ✅ Login existing user
            return res.json(existingUser);
        }

        // 🔹 Create new user
        db.run(
            `INSERT INTO Users (username, email) VALUES (?, ?)`,
            [username, email],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });

                // 🔹 Fetch newly created user
                db.get(
                    `SELECT * FROM Users WHERE user_id = ?`,
                    [this.lastID],
                    (err, newUser) => {
                        if (err) return res.status(500).json({ error: err.message });
                        res.json(newUser);
                    }
                );
            }
        );
    });
};