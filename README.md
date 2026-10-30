# JobTrack – Job Application Management API

A RESTful Job Application Management API built using **Node.js and Express.js**. This project helps manage job applications through CRUD operations, custom ID handling, filtering, sorting, pagination, and application statistics.

## 🚀 Features

- Create new job applications.
- Get all job applications.
- Get a specific application using its ID.
- Update existing applications.
- Delete applications.
- Custom application ID support.
- Automatic ID generation when ID is not provided.
- Duplicate ID validation.
- Filter applications by status.
- Sort applications by company name.
- Pagination using page and limit.
- Get application statistics.
- JSON file-based data storage.
- Centralized success and error responses.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** JavaScript
- **Storage:** JSON File
- **Modules:** FS, Path

## 📂 Project Structure

```text
JobTrack-Job-Application-Management-API/
│
├── controllers/
│   └── applications.controller.js
│
├── routes/
│   └── applications.routes.js
│
├── data.json
│
├── src/
│   ├── app.js
│   └── server.js
│
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation & Setup

**1. Clone the repository**

```bash
git clone https://github.com/Nagesh-Soni/JobTrack-Job-Application-Management-API.git
```

**2. Navigate to the project directory**

```bash
cd JobTrack-Job-Application-Management-API
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/applications` | Get all applications |
| GET | `/applications/:id` | Get application by ID |
| GET | `/applications/stats` | Get application statistics |
| POST | `/applications` | Create a new application |
| PUT | `/applications/:id` | Update an application |
| DELETE | `/applications/:id` | Delete an application |

## 📌 API Usage

### 1. Create Application

**POST** `/applications`

Request Body:

```json
{
  "company": "Google",
  "role": "Backend Developer",
  "status": "Applied"
}
```

You can also provide a custom ID:

```json
{
  "id": 10,
  "company": "Microsoft",
  "role": "Software Engineer",
  "status": "Applied"
}
```

If the ID is not provided, it will be generated automatically. Duplicate IDs are rejected.

### 2. Get All Applications

**GET** `/applications`

### 3. Filter by Status

**GET** `/applications?status=Applied`

### 4. Sort by Company

**GET** `/applications?sort=company`

### 5. Pagination

**GET** `/applications?page=1&limit=5`

### 6. Get Application Statistics

**GET** `/applications/stats`

### 7. Update Application

**PUT** `/applications/1`

Request Body:

```json
{
  "status": "Interview"
}
```

### 8. Delete Application

**DELETE** `/applications/1`

## 📊 Sample Data

```json
{
  "id": 1,
  "company": "Google",
  "role": "Backend Developer",
  "status": "Applied",
  "applicationDate": "2026-10-30"
}
```

## 📚 Concepts Practiced

- REST API development
- Express.js routing and controllers
- HTTP methods and status codes
- CRUD operations
- Request and response handling
- Middleware and error handling
- Query parameters and route parameters
- Array methods (`map`, `filter`, `find`, `findIndex`, `reduce`)
- JavaScript spread operator
- File handling using Node.js FS module
- JSON parsing and stringification
- Input validation
- Filtering, sorting, and pagination

## 🔮 Future Improvements

- MongoDB database integration.
- User authentication and authorization.
- Search applications by company or role.
- Application deadline tracking.
- React-based frontend dashboard.

## 👨‍💻 Author

**Nagesh Soni**

GitHub: [@Nagesh-Soni](https://github.com/Nagesh-Soni)

Project Repository: [JobTrack – Job Application Management API](https://github.com/Nagesh-Soni/JobTrack-Job-Application-Management-API)

---

If you find this project useful, don't forget to give it a ⭐ on GitHub!
