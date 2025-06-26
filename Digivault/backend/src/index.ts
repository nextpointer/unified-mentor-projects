import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { getCookie, setCookie } from 'hono/cookie'
import { serveStatic } from 'hono/bun'
import { hash, verify } from 'argon2';
import db from './db';

const app = new Hono()

app.use(logger())

const cookieName = 'session_id';
const hostName = 'http://localhost:5173/';

// Middleware to check authentication
const authMiddleware = async (c: any, next: any) => {
    const cookie = getCookie(c, cookieName);
    if (cookie === undefined) {
        return c.text('Unauthorized', 401);
    }
    const userId = cookie
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    if (!user) {
        return c.text('Unauthorized', 401);
    }
    c.user = user;
    await next();
};

// Register route
app.post('/register', async (c) => {
    const { username, password } = await c.req.json();
    const hashedPassword = await hash(password);
    try {
        db.query('INSERT INTO users (username, password) VALUES (?, ?)').run(username, hashedPassword);
        return c.text('User registered successfully');
    } catch (error) {
        return c.text('User already exists', 400);
    }
});

// Login route
app.post('/login', async (c) => {
    const { username, password } = await c.req.json();
    const user: any = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (user && await verify(user.password, password)) {
        const sessionId = user.id;
        setCookie(c, cookieName, sessionId)
        return c.text('Login successful');
    }
    return c.text('Invalid credentials', 401);
});

// Logout route
app.post('/logout', (c) => {
    setCookie(c, cookieName, "", {
        httpOnly: true,
        path: '/',
        maxAge: 0
    });
    return c.text('Logout successful');
});


// Protected document route
app.post('/documents', authMiddleware, async (c: any) => {
    try {
        const userId = c.user.id;
        const formData = await c.req.formData();
        const title = formData.get("title");
        const file = formData.get("document");

        if (!file || !title) {
            return c.text('File and title are required', 400);
        }

        const fileHash = Bun.hash(title, userId);
        const filePath = './uploads/' + fileHash + file.name;

        await Bun.write(filePath, file);

        db.query(
            'INSERT INTO user_documents (user_id, title, file_path) VALUES (?, ?, ?)'
        ).run(userId, title, filePath);

        return c.text("Document save successful");
    } catch (error) {
        console.error(error)
        return c.text('Error saving document', 500);
    }
});

app.delete('/documents/:id', authMiddleware, async (c: any) => {
    try {
        const userId = c.user.id;
        const id = c.req.param('id');

        if (!id) {
            return c.text('File id is required', 400);
        }

        const { file_path }: any = db.query(
            'SELECT file_path FROM user_documents WHERE id = ? and user_id = ?'
        ).get(id, userId)

        await Bun.file(file_path).delete();
        
        db.query(
            'DELETE FROM user_documents WHERE id = ? and user_id = ?'
        ).run(id, userId)

        return c.text("Document delete successful");
    } catch (error) {
        console.error(error)
        return c.text('Error deleting document', 500);
    }
});

app.use('/uploads/*', serveStatic({ root: './' }))

app.get('/documents', authMiddleware, (c: any) => {
    const userId = c.user.id;

    const queryResult = db.query(`SELECT * FROM user_documents WHERE user_id = ?`).all(userId);

    const result = queryResult.map((r: any) => {
        return { id: r.id, title: r.title, url: hostName + 'api/' + r.file_path }
    })

    return c.json(result);
})


export default app
