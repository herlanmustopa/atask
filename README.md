# 🚀 GitHub Repositories Explorer

A modern React TypeScript application for searching GitHub users and exploring their repositories.

## 🌐 Live Demo

**[View Live Demo](https://atask-herlan-mustopas-projects.vercel.app/)**

## ✨ Features

- 🔍 Search GitHub users (up to 5 results)
- 👤 View user profiles with stats
- 📦 Browse all user repositories
- ⭐ Repository details (stars, forks, language, topics)
- 📱 Fully responsive design
- ⚡ Real-time search with debouncing

## 🛠️ Tech Stack

- **React 18** + TypeScript
- **Vite** (build tool)
- **GitHub API v3**
- Custom CSS (responsive)
- Lucide React (icons)

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/herlanmustopa/atask.git
cd atask

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 How to Use

1. **Search**: Enter GitHub username (try: `facebook`, `microsoft`, `google`)
2. **Select**: Click on any user from results
3. **Explore**: Browse their repositories with full details

## 🏗️ Project Structure

```
src/
├── components/     # UI components
├── hooks/          # Custom hooks
├── services/       # API services
├── types/          # TypeScript types
├── utils/          # Helper functions
└── styles/         # CSS styles
```

## 🔧 Key Components

- **SearchForm** - User search interface
- **UserList** - Search results display
- **RepositoryList** - Repository browser
- **useGitHubSearch** - API integration hook
- **GitHubApiService** - API client

## 📋 Requirements Fulfilled

✅ React + TypeScript  
✅ GitHub API integration  
✅ Search up to 5 users  
✅ Display all repositories  
✅ Public GitHub repository  
✅ Live deployment  
✅ Proper README  
✅ Error handling  
✅ Good UX practices  
✅ Mobile responsive  

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

## 🎯 Performance

- Debounced search (300ms)
- Efficient state management
- Responsive design
- Error boundaries
- Loading states

## 🔗 API Integration

- **Users**: `GET /search/users?q={query}`
- **Repos**: `GET /users/{username}/repos`
- Rate limit: 60 requests/hour (unauthenticated)

## 🧪 Testing

Try these usernames:
- `facebook` - Meta repositories
- `microsoft` - Microsoft projects
- `google` - Google open source
- `vercel` - Vercel projects
- `netflix` - Netflix tools

## 👨‍💻 Development

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
```

## 🤝 Contributing

1. Fork the project
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file

## 👤 Author

**Herlan Mustopa**
- GitHub: [@herlanmustopa](https://github.com/herlanmustopa)
- LinkedIn: [Herlan Mustopa](https://linkedin.com/in/herlanmustopa)

---

⭐ Star this repo if you found it helpful!