<div align="center">

# 🚀 Workora

### *The Modern Job Board Platform That Actually Works*

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

*A full-stack job board platform built for the modern web. Connect talent with opportunity seamlessly.*

[🎯 **Live Demo**](https://workora.vercel.app) • [📖 **Documentation**](#-getting-started) • [🐛 **Report Bug**](https://github.com/your-username/workora/issues)

</div>

---

## ✨ What Makes Workora Special?

Workora isn't just another job board. It's a **complete ecosystem** that bridges the gap between talented professionals and forward-thinking companies. Built with modern web technologies and a focus on user experience.

### 🎯 **For Job Seekers**
- **Smart Job Discovery** with advanced search and filtering
- **One-Click Applications** with resume management
- **Real-time Application Tracking** and status updates
- **Personalized Dashboard** to manage your job hunt

### 🏢 **For Employers**
- **Effortless Job Posting** with rich text descriptions
- **Application Management** with candidate screening tools
- **Company Branding** with custom profiles
- **Analytics Dashboard** to track job performance

---

## � Faeatures That Wow

<table>
<tr>
<td width="50%">

### 🔐 **Authentication & Security**
- **NextAuth.js** integration with multiple providers
- **Email verification** system
- **JWT-based** secure sessions
- **Role-based access** (Candidate/Employer)
- **Password encryption** with bcrypt

</td>
<td width="50%">

### 💼 **Job Management**
- **Rich job posting** with markdown support
- **Smart search** with full-text indexing
- **Advanced filtering** (location, type, salary)
- **Auto-expiration** after 30 days
- **Status management** (Open/Filled/Expired)

</td>
</tr>
<tr>
<td width="50%">

### 📄 **Application System**
- **Resume upload** with ImageKit integration
- **Cover letter** support
- **Application tracking** for candidates
- **Bulk application management** for employers
- **Email notifications** for status updates

</td>
<td width="50%">

### 🎨 **Modern UI/UX**
- **Responsive design** that works everywhere
- **Dark/Light mode** support
- **Loading skeletons** for smooth UX
- **Accessible components** with Radix UI
- **Beautiful animations** with Tailwind

</td>
</tr>
</table>

---

## 🛠 Tech Stack

<div align="center">

### **Frontend**
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

### **Backend & Database**
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth-000000?style=flat-square&logo=next.js&logoColor=white)

### **UI & Components**
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=flat-square&logo=radix-ui&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide-F56565?style=flat-square&logo=lucide&logoColor=white)

### **Tools & Services**
![ImageKit](https://img.shields.io/badge/ImageKit-FF6B6B?style=flat-square&logo=imagekit&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-339933?style=flat-square&logo=nodemailer&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)

</div>

---

## 📁 Project Architecture

```
workora/
├── 🎨 app/                    # Next.js App Router
│   ├── (auth)/               # Authentication pages
│   ├── api/                  # API routes
│   ├── dashboard/            # User dashboards
│   ├── employer/             # Employer features
│   └── jobs/                 # Job-related pages
├── 🧩 components/            # Reusable UI components
│   ├── ui/                   # shadcn/ui components
│   └── skeletons/            # Loading states
├── 📊 models/                # MongoDB schemas
├── 🔧 lib/                   # Utility functions
├── 📝 schemas/               # Zod validation schemas
├── 🎯 types/                 # TypeScript definitions
└── 📧 emails/                # Email templates
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:
- **Node.js** 18+ 
- **npm** or **yarn**
- **MongoDB** (local or Atlas)

### Quick Setup

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/workora.git
cd workora

# 2️⃣ Install dependencies
npm install

# 3️⃣ Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# 4️⃣ Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Email (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# ImageKit (for file uploads)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url

# App URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 🎯 Key Features Deep Dive

### 🔍 **Smart Job Search**
- **Full-text search** across job titles, companies, and descriptions
- **Real-time filtering** by location, job type, and salary range
- **URL-based pagination** for SEO and bookmarking
- **Advanced MongoDB indexing** for lightning-fast queries

### 👤 **User Management**
- **Dual account types**: Candidates and Employers
- **Email verification** with custom templates
- **Secure password handling** with bcrypt
- **Profile management** with company information

### 📄 **Application Workflow**
- **Resume upload** with ImageKit CDN integration
- **Application status tracking**: Pending → Accepted/Rejected
- **Email notifications** for all status changes
- **Bulk application management** for employers

### 🎨 **Modern UI Components**
- **Responsive design** that works on all devices
- **Loading skeletons** for better perceived performance
- **Accessible components** following WCAG guidelines
- **Consistent design system** with shadcn/ui

---

## 📊 Database Schema

<details>
<summary><strong>🔽 Click to view database models</strong></summary>

### User Model
```typescript
{
  name: string
  email: string (unique)
  password: string (hashed)
  accountType: "candidate" | "employer"
  company?: string
  isVerified: boolean
  verificationToken?: string
}
```

### Job Model
```typescript
{
  employer: ObjectId (ref: User)
  title: string
  company: string
  location: string
  jobType: "full-time" | "part-time" | "contract" | "internship"
  description: string
  salary: string
  status: "open" | "filled" | "expired"
  lastDate: Date
  applications: ObjectId[] (ref: Application)
}
```

### Application Model
```typescript
{
  candidate: ObjectId (ref: User)
  job: ObjectId (ref: Job)
  name: string
  email: string
  resume: ObjectId (ref: Resume)
  coverLetter?: string
  status: "pending" | "accepted" | "rejected"
}
```

</details>

---

## 🚦 API Routes

<details>
<summary><strong>🔽 View all API endpoints</strong></summary>

### Authentication
- `POST /api/register` - User registration
- `POST /api/verify-email` - Email verification
- `POST /api/send-verify-email` - Resend verification

### Jobs
- `GET /api/jobs` - List jobs with search/filter
- `POST /api/jobs/post` - Create new job (employers only)
- `GET /api/jobs/[id]` - Get job details
- `PUT /api/jobs/[id]` - Update job (employer only)
- `DELETE /api/jobs/[id]` - Delete job (employer only)

### Applications
- `POST /api/jobs/[id]/apply` - Apply to job
- `GET /api/applications/[id]` - Get application details
- `PUT /api/applications/[id]` - Update application status

### Resume
- `POST /api/resume/upload` - Upload resume file
- `GET /api/resume` - Get user resumes

</details>

---

## 🎨 UI Components

Workora uses a carefully crafted design system built on top of **shadcn/ui**:

- **🎯 Consistent**: Every component follows the same design principles
- **♿ Accessible**: Built with Radix UI primitives for maximum accessibility
- **📱 Responsive**: Mobile-first design that scales beautifully
- **🎨 Customizable**: Easy to theme and extend

### Component Highlights
- **JobCard**: Beautiful job listing cards with all essential info
- **SearchCard**: Advanced search interface with real-time filtering
- **ApplicationCard**: Clean application management interface
- **Pagination**: SEO-friendly pagination with URL state
- **Loading Skeletons**: Smooth loading states for better UX

---

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Quality

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Zod** for runtime validation
- **Consistent naming** conventions

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variables
4. Deploy! 🎉

### Other Platforms

Workora can be deployed on any platform that supports Next.js:
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

---

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **💾 Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **📤 Push** to the branch (`git push origin feature/amazing-feature`)
5. **🔄 Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙌 Author

<div align="center">

**Tabish Shamsi**  
*Full-Stack Developer & UI/UX Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tabish-shamsi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/tabish-shamsi)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://tabish-shamsi.dev)

</div>

---

## ⭐ Why Workora?

> *"In a world full of complex job boards, Workora stands out with its simplicity, performance, and developer-first approach. It's not just a project—it's a statement about how modern web applications should be built."*

### 🎯 **Perfect For**
- **Learning** modern web development patterns
- **Portfolio** projects that showcase real-world skills
- **Startups** needing a quick job board solution
- **Developers** who appreciate clean, maintainable code

### 🚀 **What You'll Learn**
- Next.js App Router best practices
- MongoDB schema design
- Authentication flows with NextAuth
- File upload handling
- Email system integration
- Modern UI component architecture

---

<div align="center"></div> 🌟 **Star this repo if you found it helpful!** 🌟

*Built with ❤️ by developers, for developers*

</div>