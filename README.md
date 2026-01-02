# 🌍 Civora

**Civora** is an AI-powered civic engagement platform designed to bridge the gap between citizens and their governments. It transforms how people interact with democracy by making civic participation accessible, informed, and impactful.

## 🎯 Vision

To create a world where every citizen has equal access to civic information and the tools to make their voice heard effectively in their democracy.

## ✨ Key Features

### 📋 Smart Legislation Tracking
- Real-time monitoring of bills and legislation at federal, state, and local levels
- AI-powered plain-language summaries of complex legal documents
- Personalized alerts based on your interests and location

### 🗣️ Civic Voice Tools
- Find and contact your elected representatives
- Generate personalized, effective messages to officials
- Track your civic engagement history and impact

### 📊 Transparency Dashboard
- Government spending visualization
- Voting records of elected officials
- Campaign finance tracking

### 🤖 AI Civic Assistant
- Ask questions about laws, rights, and civic processes
- Get guidance on how to engage with local government
- Receive personalized civic action recommendations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Prisma ORM
- **AI/ML**: OpenAI GPT-4, Custom NLP models
- **APIs**: Congress.gov, OpenStates, Google Civic Information
- **Infrastructure**: Vercel, AWS

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/subammmm/civora.git
cd civora

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

## 📁 Project Structure

```
civora/
├── app/                    # Next.js app router pages
├── components/             # Reusable UI components
├── lib/                    # Utility functions and API clients
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
├── services/               # Business logic and external APIs
└── types/                  # TypeScript type definitions
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Congress.gov API](https://api.congress.gov/) for federal legislation data
- [OpenStates](https://openstates.org/) for state-level legislative data
- [Google Civic Information API](https://developers.google.com/civic-information) for representative data

## 📬 Contact

- **Website**: [civora.io](https://civora.io)
- **Email**: hello@civora.io
- **Twitter**: [@CivoraApp](https://twitter.com/CivoraApp)

---

<p align="center">Made with ❤️ for democracy</p>
