import cors from 'cors'
import bcrypt from 'bcrypt';
import pg from 'pg'
import express, { NextFunction } from 'express'
import jwt from 'jsonwebtoken';
const JWT_TOKEN = "ABCDEFGHIJKLMN122"
import { authenticateAdmin, authenticateGuest } from './middleware/middlewares';
import { BACKEND_URL } from './config'
const app = express();
app.use(express.json());
app.use(cors())

const pgClient = new pg.Client(BACKEND_URL)
pgClient.connect()


//guest login through it
app.post('/app/v1/signup', async (req, res) => {
    const { name, phone, room_number, password } = req.body;
    const roomRes = await pgClient.query(
        'SELECT room_id FROM rooms WHERE room_number = $1',
        [room_number]
    );
    const room_id = roomRes.rows[0].room_id;
    const password_hash = await bcrypt.hash(password, 5)
    const insertGuest = `INSERT INTO guests (name, phone, room_id, password) VALUES ($1, $2, $3, $4) RETURNING guest_id`;
    const response = await pgClient.query(insertGuest, [name, phone, room_id, password_hash])

    res.json({
        message: "Logged in successfully",

    })
})

app.post('/app/v1/signin', async (req, res) => {
    const { phone, room_number, password } = req.body;

    const roomCheck = await pgClient.query(`SELECT room_id FROM rooms WHERE room_number = $1`, [room_number])
    const room_id = roomCheck.rows[0].room_id;
    const selectQuery = `SELECT * FROM guests WHERE room_id = $1 AND phone = $2`
    const response = await pgClient.query(selectQuery, [room_id, phone]);

    const guest_id = response.rows[0].guest_id
    const guest = response.rows[0];
    const isMatch = await bcrypt.compare(password, guest.password);

    if (!isMatch) {
        res.json({
            message: "Invalid Password"
        })
    }
    const token = jwt.sign({ guest_id }, JWT_TOKEN, {
        expiresIn: '7d'
    })

    res.json({
        message: 'you are logged in',
        token
    })
})


//Guest order food or a room services
app.post('/app/v1/orders', authenticateGuest, async (req, res) => {
    //@ts-ignore
    const guest_id = req.guest_id;
    const { items } = req.body;

    const orderQuery = `INSERT INTO orders (guest_id, status) VALUES ($1, $2) RETURNING order_id`;
    const orderRes = await pgClient.query(orderQuery, [guest_id, 'pending'])
    const order_id = orderRes.rows[0].order_id;

    //@ts-ignore
    for (const item of items) {
        await pgClient.query(`INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1,$2,$3)`,
            [order_id, item.menu_item_id, item.quantity]
        )
    }

    res.status(201).json({
        message: "Order placed successfully",
        order_id
    })
})

app.get('/app/v1/orders', authenticateGuest, async (req, res) => {
    //@ts-ignore
    const guest_id = req.guest_id;

    const selectQuery = `SELECT 
                         o.order_id, o.created_at, o.status,
                         oi.menu_item_id, oi.quantity,
                         mi.name AS item_name, mi.price
                         FROM orders o 
                         JOIN order_items oi ON o.order_id = oi.order_id
                         JOIN menu_items mi ON oi.menu_item_id = mi.item_id
                         WHERE o.guest_id = $1
                         ORDER BY o.created_at DESC    
    `

    const result = await pgClient.query(selectQuery, [guest_id])

    res.json({
        response: result.rows
    })

})

//Guest check specific order OR admin can check the order 
app.get('/app/v1/orders/:order_id', authenticateGuest, async (req, res) => {
    //@ts-ignore
    const guest_id = req.guest_id;
    const { order_id } = req.params;

    try {
        const orderQuery = `SELECT o.order_id, o.created_at, o.status, oi.menu_item_id, oi.quantity, mi.name, mi.price
                            FROM orders o                       
                            JOIN order_items oi ON o.order_id = oi.order_id
                            JOIN menu_items mi ON oi.menu_item_id = mi.item_id
                            WHERE o.order_id = $1 AND o.guest_id = $2
                            `
        const result = await pgClient.query(orderQuery, [order_id, guest_id]);

        if (result.rowCount === 0) {
            res.status(404).json({
                message: "Order not found or You do not have access to it."
            })
        }

        const orderDetails = result.rows.map(row => ({
            order_id: row.order_id,
            created_at: row.created_at,
            status: row.status,
            items: [{
                name: row.name,
                quantity: row.quantity,
                price: row.price
            }]
        }));

        res.status(200).json({
            order: orderDetails
        })
    } catch (err) {
        console.log('Error fetching order', err);
        res.status(500).json({
            message: "Failed to fetch order details"
        })
    }
})

// fetch menu card on fe
app.get('/app/v1/allmenu', async (req, res) => {

    const menuQuery = await pgClient.query(`SELECT * FROM menu_items`)

    res.json({
        allmenu: menuQuery.rows
    })

})

//get total bill
app.get('/app/v1/bill', authenticateGuest, async (req, res) => {
    //@ts-ignore
    const guest_id = req.guest_id;

    const billQuery = `SELECT 
            SUM(oi.quantity * mi.price) AS grand_total
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN menu_items mi ON oi.menu_item_id = mi.item_id
        WHERE o.guest_id = $1`
    const response = await pgClient.query(billQuery, [guest_id])

    res.json({
        response: response.rows[0].grand_total || 0
    })
})



app.post('/app/v1/admin/signup', async (req, res) => {

    const { username, password, role } = req.body;
    const insertQuery = `INSERT INTO admin_users (username, password_hash, role) VALUES($1, $2, $3);`
    const response = await pgClient.query(insertQuery, [username, password, role]);
    res.json({
        message: "signup",
        response: response.rows
    })
})

app.get('/app/v1/userInfo', authenticateAdmin, async (req, res) => {
    const detailsQuery = `SELECT * FROM guests`
    const response = await pgClient.query(detailsQuery);
    res.json({
        response: response.rows
    })
})

app.post('/app/v1/admin/signin', async (req, res) => {
    const { username, password } = req.body;
    const selectQuery = `SELECT * FROM admin_users WHERE username = $1 AND password_hash = $2`
    const response = pgClient.query(selectQuery, [username, password]);

    const admin_id = (await response).rows[0].admin_id
    const token = jwt.sign({ admin_id }, JWT_TOKEN, {
        expiresIn: '7d'
    })

    res.json({
        message: 'you are logged in',
        token
    })
})

app.post('/app/admin/insertMenu', authenticateAdmin, async (req, res) => {

    const { name, description, price, available } = req.body;
    const insertQuery = `INSERT INTO menu_items (name, description, price, available) VALUES ($1,$2,$3,$4)`
    const response = await pgClient.query(insertQuery, [name, description, price, available]);

    res.json({
        message: "NEW ITEM ADD TO THE MENU",
        response: response.rows[0]
    })

})

app.put('/app/admin/updateMenu', authenticateAdmin, async (req, res) => {

    const item_id = req.body.item_id;
    const { name, description, price, available } = req.body;
    const updateQuery = `UPDATE menu_items SET  name = $2, description = $3, price = $4, available = $5
                        WHERE item_id = $1 RETURNING *;`
    const response = await pgClient.query(updateQuery, [item_id, name, description, price, available])

    res.json({
        message: "UPDATE THE MENU",
        response: response.rows[0]
    })
})

app.get('/app/admin/allRoom', authenticateAdmin, async (req, res) => {
    const detailsQuery = `SELECT * FROM rooms`
    const response = await pgClient.query(detailsQuery);

    res.json({
        message: response.rows
    })
})

app.get('/app/admin/allMenu', authenticateAdmin, async (req, res) => {
    const detailsQuery = `SELECT * FROM menu_items`
    const response = await pgClient.query(detailsQuery)

    res.json({
        message: response.rows
    })
})

app.post('/app/admin/insertRoom', authenticateAdmin, async (req, res) => {

    const { room_number, room_type, status } = req.body;
    const insertQuery = `INSERT INTO rooms (room_number, room_type, status) VALUES ($1,$2, $3)`
    const response = await pgClient.query(insertQuery, [room_number, room_type, status])

    res.json({
        message: "ROOM ADDED",
        response: response.rows[0]
    })

})

app.put('/app/admin/updateRoom', authenticateAdmin, async (req, res) => {

    const { room_id, room_number, room_type, status } = req.body;
    const updateQuery = `UPDATE rooms SET room_number = $2, room_type = $3, status = $4 WHERE room_id = $1 RETURNING *;`;
    const response = await pgClient.query(updateQuery, [room_id, room_number, room_type, status]);

    res.json({
        message: "Room is Updated",
        response: response.rows[0]
    })
})

app.get('/app/admin/bill/:guest_id', authenticateAdmin, async (req, res) => {

    //@ts-ignore
    const guest_id = req.params.guest_id;
    const billQuery = `SELECT 
            SUM(oi.quantity * mi.price) AS grand_total
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN menu_items mi ON oi.menu_item_id = mi.item_id
        WHERE o.guest_id = $1`
    const response = await pgClient.query(billQuery, [guest_id])

    res.json({
        response: response.rows[0].grand_total || 0
    })
})

app.listen(3000)
