## 🍴 Foodify – MERN Food Delivery App

### 🌐 Live Demo

🚀 **User Frontend:** https://foodify-mern.onrender.com
🛠️ **Admin Panel:** https://foodify-mern-admin.onrender.com
⚙️ **Backend API:** https://foodify-mern-backend.onrender.com

---

### 🧾 Project Description

**Foodify** is a full-stack **MERN food delivery web application** that allows users to explore dishes, **search for specific food items by food name**, manage their cart, and **make online payments securely using Stripe**.
The platform delivers a smooth and responsive ordering experience, combining intuitive navigation with a fast, modern interface.

An integrated **Admin Panel** enables restaurant owners to easily manage menus, update order statuses, and monitor overall performance — ensuring efficient and organized operations from one place.

---

### 🧠 Features

#### 🧍 User Side

- 🏠 **Home Page:**
  Engaging header featuring a parcel boy with pizza, symbolizing quick and tasty deliveries.
  Tagline: _“Order your favourite food here.”_

- 🍽️ **Menu Items:**
  Users can explore a diverse range of food categories:

  - **Sandwiches:** Chicken Sandwich, Vegan Sandwich, Grilled Sandwich, Bread Sandwich
  - **Cakes & Desserts:** Cup Cake, Vegan Cake, Butterscotch Cake, Sliced Cake
  - **Ice Creams:** Fruit Ice Cream, Jar Ice Cream, Vanilla Ice Cream
  - **Starters:** Garlic Mushroom, Fried Cauliflower
  - **Rice & Pulao:** Mix Veg Pulao, Rice Zucchini
  - **Pasta & Noodles:** Cheese Pasta, Tomato Pasta, Creamy Pasta, Chicken Pasta, Butter Noodles, Veg Noodles, Somen Noodles, Cooked Noodles

- 🔍 **Search Functionality:**
  Users can **search for specific food items by name** directly from the navbar.

- 🛒 **Cart System:**
  Add, remove, and manage food items with real-time cart total updates.

- 🔐 **Login Check:**
  When users click **“Proceed to Checkout”** without logging in, a message appears:

  > “Please login first to place your order!”

- 💳 **Online Payment (Stripe):**
  Secure online payments are handled via **Stripe**, ensuring a trusted and seamless checkout experience.

- 💬 **Promo Code Option:**
  Built-in section ready for future promo code and discount integration.

---

### 🧑‍💼 Admin Side

- 📦 **Manage Orders:**
  View, update, and process all customer orders efficiently.

- 🍲 **Menu Management:**
  Add, edit, or remove food items and update categories dynamically.

- 📊 **Dashboard Overview:**
  Track key metrics like total sales, orders, and menu performance.

- 🔐 **Secure Login:**
  Admin authentication ensures data safety and restricted access.

---

### ⚙️ Tech Stack

| Layer              | Technology Used                             |
| ------------------ | ------------------------------------------- |
| **Frontend**       | React.js, Vite, Context API, CSS            |
| **Backend**        | Node.js, Express.js                         |
| **Database**       | MongoDB                                     |
| **Authentication** | JWT (JSON Web Token)                        |
| **Payments**       | Stripe                                      |
| **Deployment**     | Vercel (Frontend & Admin), Render (Backend) |

---

🖼️ Screenshots

👨‍🍳 User Side

🏠 Home Page<img width="1918" height="930" alt="Screenshot 2025-10-31 135005" src="https://github.com/user-attachments/assets/a6ea62a8-7056-414c-9679-d2440e783e2b" />

🍽️ Menu Section((This screenshot is taken at 80% zoom level for better visibility.)<img width="1919" height="929" alt="Screenshot 2025-10-31 142556" src="https://github.com/user-attachments/assets/877920f4-714b-4393-a8cc-eab6b9d21814" />

🛒 Cart Page<img width="1919" height="932" alt="Screenshot 2025-10-31 135731" src="https://github.com/user-attachments/assets/24a6d0d9-df9c-46bc-b5d3-be92eeb1f059" />

📦 Place Order Page<img width="1915" height="930" alt="Screenshot 2025-10-31 135753" src="https://github.com/user-attachments/assets/2f4a45a3-7ddf-4745-9542-1f3af9181afe" />

💳 Payment (Stripe Checkout)<img width="1919" height="926" alt="Screenshot 2025-10-31 135828" src="https://github.com/user-attachments/assets/26ea6dc5-0f03-4d36-b1e9-eac4014f82d5" />

🛠️ Admin Side

➕ Add Menu Item<img width="1914" height="930" alt="Screenshot 2025-10-31 140632" src="https://github.com/user-attachments/assets/332a96c3-e042-4884-866d-81d42227b315" />

📋 List Menu Items<img width="1912" height="926" alt="Screenshot 2025-10-31 140650" src="https://github.com/user-attachments/assets/1f180ca7-9b46-40d5-8061-1d9b7fcac6bb" />

🚚 Track Orders<img width="1919" height="932" alt="Screenshot 2025-10-31 143112" src="https://github.com/user-attachments/assets/cd98618c-db26-4e8d-bab9-682e7a39f4a0" />

### 💡 Future Enhancements

- 💬 **User Feedback & Rating System** – After receiving an order, users can fill out a single feedback form to share their experience and rate menu items as well as the overall order.
- 🔔 **Push Notifications** – Notify users about new offers, menu additions, or order updates.
- 🌙 **Dark Mode Support** – Add a dark theme option for better accessibility and user customization.

---

### 🧾 Project Highlights

| Feature                        | Description                                           |
| ------------------------------ | ----------------------------------------------------- |
| **Stripe Payment Integration** | Secure and seamless online payments.                  |
| **Search Functionality**       | Find food instantly by typing the name.               |
| **Login Alert**                | Prevents checkout for unauthenticated users.          |
| **Dynamic Menu**               | Menu and food items fetched dynamically from backend. |
| **Responsive Design**          | Works smoothly across mobile and desktop devices.     |
| **Admin Dashboard**            | Full control over menu and orders.                    |

---

### ▶️ Run Locally Setup

#### 🧱 Backend Setup

cd backend  
npm install  
cp .env.example .env # Copy env template → .env (edit with your credentials)  
npm run server # Runs backend → http://localhost:5000

#### 🌐 User Frontend Setup

cd frontend  
npm install  
cp .env.example .env # Copy env template → .env (set backend URL)  
npm run dev # Runs frontend → http://localhost:5173

#### 🛠️ Admin Panel Setup

cd admin  
npm install  
cp .env.example .env # Copy env template → .env (set backend URL)  
npm run dev # Runs admin → http://localhost:5174

---

### 👨‍💻 Author

**Ritesh Harge**
MERN Stack Developer | Focused on building responsive, scalable web applications
🌐 GitHub: [https://github.com/Ritesh-Harge1](https://github.com/Ritesh-Harge1)

---
