-- ======================
-- Seed Categories
-- ======================
INSERT INTO categories ("name", "slug", "parentId") VALUES ('All', 'all', NULL);

INSERT INTO categories ("name", "slug", "parentId") VALUES
('Development Boards', 'development-boards', (SELECT "id" FROM categories WHERE "slug" = 'all' LIMIT 1)),
('Power', 'power', (SELECT "id" FROM categories WHERE "slug" = 'all' LIMIT 1)),
('Solar', 'solar', (SELECT "id" FROM categories WHERE "slug" = 'all' LIMIT 1)),
('Battery Cells', 'battery-cells', (SELECT "id" FROM categories WHERE "slug" = 'all' LIMIT 1)),
('Sensors', 'sensors', (SELECT "id" FROM categories WHERE "slug" = 'all' LIMIT 1)),
('Modules', 'modules', (SELECT "id" FROM categories WHERE "slug" = 'all' LIMIT 1)),
('Components', 'components', (SELECT "id" FROM categories WHERE "slug" = 'all' LIMIT 1)),
('SMD', 'smd', (SELECT "id" FROM categories WHERE "slug" = 'all' LIMIT 1)),
('Robotics', 'robotics', (SELECT "id" FROM categories WHERE "slug" = 'all' LIMIT 1)),
('Projects', 'projects', (SELECT "id" FROM categories WHERE "slug" = 'all' LIMIT 1)),
('Audio & Video', 'audio-video', (SELECT "id" FROM categories WHERE "slug" = 'all' LIMIT 1));

-- ======================
-- Seed Products
-- ======================
INSERT INTO products ("name", "description", "price", "stock", "images", "categoryId") VALUES
-- Development Boards
('Arduino Uno R3 ATmega328P Development Board with USB Cable', 'Original Arduino Uno R3 with ATmega328P microcontroller. Perfect for beginners and professionals. Comes with USB cable and documentation.', 850, 45, ARRAY['https://via.placeholder.com/600x600/2563eb/ffffff?text=Arduino+Uno+R3', 'https://via.placeholder.com/600x600/2563eb/ffffff?text=Arduino+Back', 'https://via.placeholder.com/600x600/2563eb/ffffff?text=Arduino+Cable'],
 (SELECT "id" FROM categories WHERE "slug"='development-boards' LIMIT 1)),
('ESP32 DevKit V1 WiFi Bluetooth Development Board', 'Dual-core ESP32 with built-in WiFi 802.11b/g/n and Bluetooth 4.2 capabilities. Ideal for IoT projects with ultra-low power consumption.', 650, 32, ARRAY['https://via.placeholder.com/600x600/10b981/ffffff?text=ESP32+DevKit', 'https://via.placeholder.com/600x600/10b981/ffffff?text=ESP32+Pins', 'https://via.placeholder.com/600x600/10b981/ffffff?text=ESP32+Board'],
 (SELECT "id" FROM categories WHERE "slug"='development-boards' LIMIT 1)),
('Raspberry Pi 4 Model B 4GB RAM Single Board Computer', 'Latest Raspberry Pi 4 with 4GB RAM, dual 4K display support, Gigabit Ethernet, and USB 3.0. Perfect for desktop replacement and advanced projects.', 7500, 23, ARRAY['https://via.placeholder.com/600x600/ef4444/ffffff?text=Raspberry+Pi+4', 'https://via.placeholder.com/600x600/ef4444/ffffff?text=RPi4+Ports', 'https://via.placeholder.com/600x600/ef4444/ffffff?text=RPi4+Board'],
 (SELECT "id" FROM categories WHERE "slug"='development-boards' LIMIT 1)),
('NodeMCU ESP8266 WiFi Development Board CH340', 'Compact ESP8266 based development board with WiFi capability. Arduino IDE compatible with built-in USB to serial converter.', 380, 78, ARRAY['https://via.placeholder.com/600x600/f59e0b/ffffff?text=NodeMCU+ESP8266', 'https://via.placeholder.com/600x600/f59e0b/ffffff?text=NodeMCU+Pins', 'https://via.placeholder.com/600x600/f59e0b/ffffff?text=NodeMCU+Size'],
 (SELECT "id" FROM categories WHERE "slug"='development-boards' LIMIT 1)),
('Arduino Nano V3 ATmega328P Mini Development Board', 'Compact Arduino board with ATmega328P chip. Same functionality as Arduino Uno but in smaller form factor. Perfect for space-constrained projects.', 420, 156, ARRAY['https://via.placeholder.com/600x600/8b5cf6/ffffff?text=Arduino+Nano', 'https://via.placeholder.com/600x600/8b5cf6/ffffff?text=Nano+Pins', 'https://via.placeholder.com/600x600/8b5cf6/ffffff?text=Nano+Size'],
 (SELECT "id" FROM categories WHERE "slug"='development-boards' LIMIT 1)),
('STM32F103C8T6 ARM Cortex-M3 Blue Pill Development Board', 'Powerful ARM Cortex-M3 based development board. 72MHz clock, 64KB flash, 20KB RAM. Great for advanced embedded projects.', 520, 67, ARRAY['https://via.placeholder.com/600x600/06b6d4/ffffff?text=STM32+Blue+Pill', 'https://via.placeholder.com/600x600/06b6d4/ffffff?text=STM32+Pins', 'https://via.placeholder.com/600x600/06b6d4/ffffff?text=STM32+Board'],
 (SELECT "id" FROM categories WHERE "slug"='development-boards' LIMIT 1)),
('Arduino Mega 2560 R3 ATmega2560 Development Board', 'Arduino Mega with 54 digital I/O pins and 16 analog inputs. Ideal for projects requiring many I/O pins. 4 UARTs for multiple serial communication.', 1450, 34, ARRAY['https://via.placeholder.com/600x600/ec4899/ffffff?text=Arduino+Mega', 'https://via.placeholder.com/600x600/ec4899/ffffff?text=Mega+Pins', 'https://via.placeholder.com/600x600/ec4899/ffffff?text=Mega+Board'],
 (SELECT "id" FROM categories WHERE "slug"='development-boards' LIMIT 1)),
('ESP32-CAM WiFi Bluetooth Camera Module OV2640', 'ESP32 with integrated camera (OV2640 2MP), WiFi, and Bluetooth. Perfect for IoT camera projects, surveillance, and image recognition.', 780, 45, ARRAY['https://via.placeholder.com/600x600/14b8a6/ffffff?text=ESP32+CAM', 'https://via.placeholder.com/600x600/14b8a6/ffffff?text=ESP32+Camera', 'https://via.placeholder.com/600x600/14b8a6/ffffff?text=ESP32+Module'],
 (SELECT "id" FROM categories WHERE "slug"='development-boards' LIMIT 1)),
-- Other Categories
('Solar Panel Kit', 'Small solar panel for projects', 49.99, 50, ARRAY['https://example.com/solar.jpg'],
 (SELECT "id" FROM categories WHERE "slug"='solar' LIMIT 1)),
('Li-ion Battery', 'Rechargeable battery cell', 12.99, 200, ARRAY['https://example.com/battery.jpg'],
 (SELECT "id" FROM categories WHERE "slug"='battery-cells' LIMIT 1)),
('Temperature Sensor', 'DHT22 sensor module', 5.99, 150, ARRAY['https://example.com/sensor.jpg'],
 (SELECT "id" FROM categories WHERE "slug"='sensors' LIMIT 1)),
-- Audio & Video Products
('Bluetooth Speaker', 'Portable wireless Bluetooth speaker with high-quality sound and long battery life. Perfect for music lovers on the go.', 1500, 30, ARRAY['https://picsum.photos/seed/speaker1/600/600', 'https://picsum.photos/seed/speaker2/600/600', 'https://picsum.photos/seed/speaker3/600/600'],
 (SELECT "id" FROM categories WHERE "slug"='audio-video' LIMIT 1)),
('Mechanical Keyboard', 'RGB backlit mechanical keyboard with tactile switches. Ideal for gaming and typing enthusiasts.', 2500, 20, ARRAY['https://picsum.photos/seed/keyboard1/600/600', 'https://picsum.photos/seed/keyboard2/600/600', 'https://picsum.photos/seed/keyboard3/600/600'],
 (SELECT "id" FROM categories WHERE "slug"='audio-video' LIMIT 1)),
('Wireless Headphones', 'Noise-cancelling wireless headphones with premium sound quality and comfortable fit for all-day use.', 1800, 25, ARRAY['https://picsum.photos/seed/headphones1/600/600', 'https://picsum.photos/seed/headphones2/600/600', 'https://picsum.photos/seed/headphones3/600/600'],
 (SELECT "id" FROM categories WHERE "slug"='audio-video' LIMIT 1));

-- ======================
-- Seed Users
-- ======================
INSERT INTO users ("firstName", "lastName", "email", "phone", "password", "role") VALUES
('Admin', 'User', 'admin@techhaven.com', '+919999999999', '$2b$10$tSZkfX8UbuPDmRupAlXTyOfBPPgmD.lZMkc/oXtWanIPqWhRYksZK', 'admin'),
('Test', 'User', 'test3@example.com', '+919876543210', '$2b$10$tSZkfX8UbuPDmRupAlXTyOfBPPgmD.lZMkc/oXtWanIPqWhRYksZK', 'user');

-- ======================
-- Seed Orders
-- ======================
INSERT INTO orders ("userId", "totalAmount", "status") VALUES
((SELECT "id" FROM users WHERE "email"='test3@example.com' LIMIT 1),
 1700, 'pending');

-- Seed Order Items
INSERT INTO order_items ("orderId", "productId", "quantity", "price") VALUES
((SELECT "id" FROM orders LIMIT 1),
 (SELECT "id" FROM products WHERE "name"='Arduino Uno R3 ATmega328P Development Board with USB Cable' LIMIT 1),
 2, 850);

-- ======================
-- Seed Wishlist
-- ======================
INSERT INTO wishlist ("userId", "productId", "createdAt") VALUES
((SELECT "id" FROM users WHERE "email"='test3@example.com' LIMIT 1),
 (SELECT "id" FROM products WHERE "name"='Arduino Uno' LIMIT 1),
 NOW());

-- ======================
-- Seed B2B Requests
-- ======================
INSERT INTO b2b_requests ("userId", "company", "email", "phone", "details") VALUES
((SELECT "id" FROM users WHERE "email"='test3@example.com' LIMIT 1),
 'TestCompany', 'company@example.com', '+911234567890', 'Request details');

-- ======================
-- Done Seeding
-- ======================
