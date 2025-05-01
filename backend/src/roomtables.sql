CREATE TABLE guests (
    guest_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    room_id INT NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    FOREIGN KEY (room_id) REFERENCES rooms(room_id),
    UNIQUE (phone, room_id) -- ensures no duplicate guest for same phone in same room
);

CREATE TABLE rooms (
    room_id SERIAL PRIMARY KEY,
    room_number VARCHAR(10) UNIQUE NOT NULL,
    room_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'available' -- e.g. available, occupied, maintenance
);

CREATE TABLE menu_items (
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    UNIQUE (name) -- no duplicate item names (change if multi-language)
);

CREATE TABLE admin_users (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'manager', -- manager, billing, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(item_id),
    UNIQUE (order_id, menu_item_id) -- one menu item only once per order
);

CREATE TABLE bills (
    bill_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL UNIQUE, -- one bill per order
    total_amount NUMERIC(10,2) NOT NULL,
    paid_status BOOLEAN DEFAULT FALSE,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    guest_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending', -- pending, preparing, delivered
    handled_by_staff_id INT,
    FOREIGN KEY (guest_id) REFERENCES guests(guest_id),
    FOREIGN KEY (handled_by_staff_id) REFERENCES staff(staff_id)
);
