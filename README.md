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

- **React 19.x.x** + TypeScript
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

This project uses a comprehensive testing setup with **Vitest** and **React Testing Library**.

### Test Categories

- **Unit Tests** - Individual components and functions
- **Integration Tests** - Component interactions and data flow
- **API Tests** - Service layer and network requests
- **Hook Tests** - Custom React hooks
- **E2E Scenarios** - Complete user workflows

### Running Tests

```bash
# Run tests in watch mode
npm run test

# Run all tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui

# Debug tests
npm run test:debug
```

### Test Coverage

Current coverage thresholds:
- **Statements**: >90%
- **Branches**: >85% 
- **Functions**: >90%
- **Lines**: >90%

### Writing Tests

Tests are located in `src/test/__tests__/` and follow the pattern:
- `ComponentName.test.tsx` for component tests
- `hookName.test.tsx` for hook tests
- `serviceName.test.ts` for service tests

Example test:
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../test/utils';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

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