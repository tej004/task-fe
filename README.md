A simple React + Vite frontend for managing todos.

## Features
- Add, edit, delete todos
- Mark todos as completed/incomplete
- Responsive UI
- Toast notifications
- Dialog-based editing

## Tech Stack
- React
- Vite
- TypeScript
- Tailwind CSS (utility classes)
- Sonner (toast notifications)
- Tanstack router
- Tanstack Query
- Axios

## Getting Started

### Install dependencies
```bash
npm install
```

### Run the development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

## Project Structure
```
public/           # Static assets
src/
  components/
    todo/         # Todo feature components
    ui/           # Reusable UI components
  lib/            # Utility functions
  routes/         # App routes
  services/       # API/service logic
  styles.css      # Global styles
main.tsx          # App entry point
```

## Customization
- Update UI styles in `src/styles.css` or via Tailwind classes.
- Modify todo logic in `src/components/todo/` and `src/services/todo.service.ts`.

## License
MIT

---
