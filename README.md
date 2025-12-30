# 🧑‍💼 Workora — Job Board Platform

Workora is a lightweight, modern job board web application built with **Next.js** and **shadcn/ui**.
It allows employers to post jobs and candidates to browse and apply — without unnecessary complexity.The platform is designed to be easy to use and extendable, with a focus on simplicity and performance.

---

## 🚀 Features

### 🔍 Job Discovery

* Browse job listings with pagination
* View job details including:

  * Company
  * Location
  * Job type
  * Posted date
  * Job status (Open / Filled / Expired)

### 🗂 Job Status Handling

* **Open** → accepting applications
* **Filled** → position closed manually
* **Expired** → auto-expired after 30 days

### 🧾 Search & Filter

* Search jobs by title or keywords
* Filter by:

  * Job type
  * Location
  * Status

### 📄 Pagination

* URL-based pagination using query parameters
* SEO-friendly and refresh-safe
* Reusable pagination component

### 🎨 Modern UI

* Built with **shadcn/ui**
* Responsive design
* Clean, professional layout
* Minimalist branding (Workora)

---

## 🛠 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **UI:** shadcn/ui + Tailwind CSS
* **Icons:** Lucide Icons
* **Date Handling:** date-fns
* **State:** URL Search Params (no overengineering)

---

## 📁 Project Structure

```
app/
 ├── page.tsx              # Home page (job listings)
 ├── jobs/[id]/page.tsx    # Job details page
components/
 ├── JobCard.tsx
 ├── JobList.tsx
 ├── Pagination.tsx
 ├── Header.tsx
 ├── Footer.tsx
lib/
 ├── mock-jobs.ts          # Mock job data
types/
 ├── job.ts
```

---

## 🧪 Mock Data

Workora currently uses mock job data to simulate real-world job listings, including:

* Multiple job roles
* Different locations
* Various job statuses
* Realistic posting dates

This setup allows easy migration to a database later.

---

## 🧑‍💻 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/workora.git
cd workora
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

## 🙌 Author

**Tabish Shamsi**
Frontend / Full-Stack Developer

---

### ⭐ Why This Project Matters

Workora demonstrates:

* Real-world UI patterns
* Scalable component architecture
* Thoughtful feature design
* Clean, maintainable code