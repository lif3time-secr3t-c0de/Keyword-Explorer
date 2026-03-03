# 🔍 Keyword Explorer

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://keyword-explorer-three.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.7-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue)](https://neon.tech)
[![Prisma](https://img.shields.io/badge/Prisma-6.14.0-2D3748)](https://prisma.io)

**Real-time keyword research platform** with live data from Google, YouTube, Bing, Amazon, and DuckDuckGo. Built for SEO professionals, content creators, and growth marketers.

<p align="center">
  <a href="https://keyword-explorer-three.vercel.app">
    <img src="https://img.shields.io/badge/View%20Live%20Demo-4285F4?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo">
  </a>
</p>

---

## ✨ Features

### 🔍 **Multi-Source Keyword Discovery**
- **Google Autocomplete** - Real-time suggestions
- **YouTube Autocomplete** - Video keyword ideas
- **Bing Autosuggest** - Alternative search data
- **Amazon Completion** - Product research
- **DuckDuckGo Suggestions** - Privacy-focused source

### 📊 **Smart Keyword Metrics**
- Search volume estimation
- Keyword difficulty (0-100)
- CPC (Cost Per Click) analysis
- Competition level (HIGH/MEDIUM/LOW)
- Intent detection (Informational/Commercial/Transactional/Navigational)
- 12-month trend forecasting

### 🎯 **Advanced Features**
- **Competitor Gap Analysis** - Compare any two domains
- **Saved Keyword Lists** - Organize and export
- **Search History** - Track your research
- **CSV Export** - Download results
- **Multi-Platform Support** - 10+ platforms including Google, YouTube, Amazon, eBay, app stores, and social media

### 🎨 **Modern UI/UX**
- Responsive design (mobile + desktop)
- Dark/Light mode toggle
- Real-time search results
- Beautiful loading states
- Accessible components

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Database** | PostgreSQL (Neon) + Prisma ORM |
| **State Management** | TanStack Query |
| **Validation** | Zod |
| **Deployment** | Vercel |
| **UI Components** | Headless UI, Heroicons, Lucide React |

---

## 🚀 Live Demo

**Experience the app now:** 👉 [https://keyword-explorer-three.vercel.app](https://keyword-explorer-three.vercel.app)

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (or use [Neon](https://neon.tech) for free)

### Step-by-Step Setup

1. **Clone the repository**
```bash
git clone https://github.com/lif3time-secr3t-c0de/Keyword-Explorer.git
cd Keyword-Explorer
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```
Edit `.env` with your database URL and settings.

4. **Set up database**
```bash
# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio
npx prisma studio
```

5. **Run development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database"

# Keyword Engine Settings
KEYWORD_API_TIMEOUT_MS=4500           # Timeout per request (ms)
KEYWORD_FETCH_CONCURRENCY=8           # Parallel requests
KEYWORD_QUERY_LIMIT=28                 # Query expansions per search

# Cache Configuration
KEYWORD_CACHE_TTL_SECONDS=900          # 15 minutes cache
KEYWORD_PERSIST_CACHE=false            # Enable/disable DB caching
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/keywords?seed=gaming&platform=GOOGLE` | Get keyword suggestions |
| `POST` | `/api/keywords` | Same as GET with JSON body |
| `GET` | `/api/lists` | Get all saved lists |
| `POST` | `/api/lists` | Create new list |
| `DELETE` | `/api/lists?id=123` | Delete a list |
| `GET` | `/api/user/history` | Get search history |

### Keyword Endpoint Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `seed` or `q` | ✅ | - | Seed keyword (min 2 chars) |
| `platform` | ✅ | - | GOOGLE, YOUTUBE, BING, AMAZON, etc. |
| `language` or `lang` | ❌ | `en` | Language code (e.g., 'en', 'es') |
| `country` | ❌ | `US` | ISO country code |
| `limit` | ❌ | `120` | Results limit (10-250) |

---

## 🗄️ Database Schema

```prisma
// Users, Lists, Keywords, Search History, Cache
// See prisma/schema.prisma for full schema
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy!

**Your app will be live at:** `https://keyword-explorer-three.vercel.app`

---

## 📊 Performance

- **Lighthouse Scores:**
  - Performance: 95+
  - SEO: 100
  - Accessibility: 98
  - Best Practices: 100

---

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Copyright © 2026 Wali Raza. All rights reserved.

This project uses a **Custom Commercial License**.

### ✅ **Free Personal & Development Use**
You are free to use, modify, and distribute this software for:
- Personal projects
- Educational purposes
- Non-commercial development
- Learning and experimentation

No permission needed for these uses - just retain the copyright notice.

### 💼 **Commercial Use (Paid License Required)**
A one-time paid license is required if you are:
- A company or organization using this software
- Using this software to generate revenue
- Incorporating into a commercial product
- Using for internal business operations
- Offering commercial services based on this software

### 📧 **To Obtain a Commercial License:**
1. Email: **thisiswaliraza@gmail.com**
2. Include details about your intended use
3. Pay one-time license fee (amount to be agreed)
4. Receive written permission before commercial deployment

**Contact for licensing:** thisiswaliraza@gmail.com

---

*Unauthorized commercial use is prohibited. See the [LICENSE](LICENSE) file for full terms.*

---

## 👨‍💻 Author

**Wali Raza**
- GitHub: [@lif3time-secr3t-c0de](https://github.com/lif3time-secr3t-c0de)
- Email: thisiswaliraza@gmail.com
- Project: [Keyword Explorer](https://github.com/lif3time-secr3t-c0de/Keyword-Explorer)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for seamless deployment
- Neon for free PostgreSQL hosting
- Open source community for inspiration

---

## 📬 Contact

For support or inquiries:
- **Email:** thisiswaliraza@gmail.com
- **GitHub Issues:** [Open an issue](https://github.com/lif3time-secr3t-c0de/Keyword-Explorer/issues)

---

<p align="center">
  <strong>⭐ Star this repo if you find it useful! ⭐</strong>
</p>

<p align="center">
  <a href="https://keyword-explorer-three.vercel.app">
    <img src="https://img.shields.io/badge/Try%20Live%20Demo-4285F4?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo">
  </a>
</p>

---

**Made with ❤️ by Wali Raza**

---

## 🔗 Quick Links

- **Live App:** [https://keyword-explorer-three.vercel.app](https://keyword-explorer-three.vercel.app)
- **GitHub Repo:** [https://github.com/lif3time-secr3t-c0de/Keyword-Explorer](https://github.com/lif3time-secr3t-c0de/Keyword-Explorer)
- **Author Email:** thisiswaliraza@gmail.com

