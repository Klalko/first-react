
# 🏥 VersaLife — Medical ID System

A modern and secure medical identification platform built with **React** and **HTML**, designed to simplify how patients, doctors, and admins access and manage medical information.

---

## 🧠 Overview

**VersaLife** is a web-based **Medical ID System** that enables patients to securely manage their personal medical data, while allowing doctors and administrators to access relevant information based on their roles.

Developed as a university graduation project, VersaLife showcases a clean front-end implementation with dynamic pages, role-based access, and real-time data presentation.  
It focuses on **simplicity**, **clarity**, and **accessibility** — ensuring that both patients and healthcare professionals can interact with data efficiently.

---

## 🚀 Features

### 👤 Patient Portal
- View and manage personal medical records  
- Access test results and health history  
- Secure login for privacy protection  

### 🩺 Doctor Dashboard
- Search and access patient profiles  
- View patients’ medical IDs and related data  
- Add or update medical notes and details  

### 🧑‍💼 Admin Interface
- Manage users (Admins, Doctors, Patients)  
- Add or remove doctors and patients  
- Display usage statistics (e.g. total users, countries, devices)  
- Interactive charts for activity and demographics  

### 📊 Dashboard & Analytics
- Charts showing:
  - Number of doctors, patients, and admins  
  - Most used devices & countries  
  - Average user session time  

### 💡 Extra Functionalities
- Collapsible and searchable dynamic tables  
- Editable table rows with instant updates  
- Modular HTML/JS design for non-React pages  
- Gradient background and consistent UI theme across all pages  

---

## 🧰 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | React, HTML, CSS, JavaScript |
| **Styling** | Custom CSS, Gradient themes, Bootstrap elements |
| **Data Visualization** | Chart.js / Recharts |
| **Role Management** | React Routing & Conditional Access |
| **Authentication** | Local JS logic (backend handled separately) |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/versalife.git
cd versalife
````

### 2️⃣ Install dependencies (for React version)

```bash
npm install
```

### 3️⃣ Run the React app

```bash
npm start
```

> The project includes both static HTML pages (for admin dashboard and management)
> and dynamic React components (for patient and doctor sections).

---

## 🔒 Access Control Logic

| Role        | Accessible Pages                                          |
| ----------- | --------------------------------------------------------- |
| **Patient** | Own profile and test results                              |
| **Doctor**  | Patient search and profile pages                          |
| **Admin**   | All sections: user management, statistics, and dashboards |

---

## 📂 Project Structure

```
versalife/
│
├── public/
│   ├── admin2.html
│   ├── dashboard.html
│   ├── doctor.html
│   ├── patient.html
│   └── assets/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.js
│
├── package.json
├── README.md
└── .env (not included)
```

---

## 🧩 Future Improvements

* Integrate backend for authentication and database connectivity
* Add real-time updates for patient data
* Implement Google Sign-In and session persistence
* Deploy live version on **Render** or **Vercel**

---

## 👩‍💻 Author

**Omar Mog**
Front-End Developer | React Enthusiast | AI Student

🎓 Built as part of my **graduation project** to demonstrate modern front-end architecture, React UI design, and structured HTML/JS systems.

📫 *GitHub:* [https://github.com/<your-username>](https://github.com/<your-username>)

---

## 🏁 License

This project is open-source and available under the **MIT License**.
Feel free to use, modify, and build upon it for learning or development purposes.

screen shots:
<img width="1869" height="882" alt="image" src="https://github.com/user-attachments/assets/412cc9b6-e245-4ac7-bd3a-0bd4d4bb0b4a" />

<img width="1794" height="887" alt="image" src="https://github.com/user-attachments/assets/d538b7e1-cf42-476f-8d57-46378d0d0123" />




- Keep it clean text-only for now?  

If you want screenshots, just upload a few, and I’ll add them in the proper Markdown format.
```
