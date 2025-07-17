# ByeWind Dashboard

A pixel-perfect, accessible, and responsive analytics dashboard built with React, Vite, Tailwind CSS, and Framer Motion.

## Hosted Demo

- [Live Demo on Vercel]()

---

## Project Highlights

### 1. Pixel-Perfect Implementation
- Layout, spacing, typography, and colors match the Figma design as closely as possible.
- All UI components (cards, buttons, charts, sidebar, etc.) are consistent with the design system.
- Responsive across desktop, tablet, and mobile using Tailwind's responsive utilities.
- Correct font families, sizes, weights, and color palette as per Figma.

### 2. Code Quality & Best Practices
- Modular, well-organized codebase with reusable components.
- DRY principles followed; no major code duplication.
- Clean, well-documented code with meaningful variable and function names.
- Uses React Context API for global UI state (theme, sidebar), and local state for component-specific logic.
- Accessibility: ARIA roles, keyboard navigation, focus states, and color contrast are implemented.

### 3. Motion & Microinteractions
- Framer Motion provides smooth, non-distracting animations (fade, slide, hover, etc.).
- Microinteractions (hover, focus, button states) enhance usability and are consistent with the brand.
- Animations are performant and tested for smoothness.

### 4. Documentation & Deployment
- This README provides clear setup, usage, and design rationale.
- Deployed on Vercel with a working demo link.
- ESLint and Prettier ensure code quality.

### 5. Additional Points
- Advanced state management via Context API.
- Unit and integration tests using Jest and React Testing Library (see `src/components/*.test.jsx`).

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14.18.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/maheshwarijadhav/Maheshwari-Juspay-Dashboard
   cd byewind-dashboard
   ```
2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

4. **Build for Production**
   ```bash
   npm run build
   # or
   yarn build
   ```
5. **Preview Production Build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

---

## Design Decisions, Challenges & Improvements

### Design Decisions
- **Componentization:** All major UI sections (Sidebar, Header, Dashboard, Table, RightBar) are modular React components for maintainability and reusability.
- **State Management:** Used React Context API for global UI state (theme, sidebar visibility) to avoid prop drilling and keep state logic centralized.
- **Styling:** Tailwind CSS utility classes for rapid, consistent, and responsive styling. Custom classes for pixel-perfect Figma matching.
- **Accessibility:** ARIA roles, keyboard navigation, and focus states are implemented for all interactive elements.
- **Charts:** Used Recharts for flexible, accessible, and customizable data visualizations.
- **Animations:** Framer Motion for smooth, non-distracting transitions and microinteractions.

### Challenges Faced
- **Pixel-Perfect Matching:** Achieving exact spacing, font, and color matching with Figma required custom tweaks and careful use of Tailwind utilities.
- **Chart Customization:** Matching the Figma chart styles (e.g., segmented lines, custom legends, grid lines) required advanced Recharts configuration.
- **Sidebar Structure:** Iterative feedback led to several sidebar structure and state management refactors to balance usability and anti-plagiarism requirements.
- **Accessibility:** Ensuring all components are keyboard accessible and have proper ARIA roles/focus states.
- **Testing:** Setting up Jest and React Testing Library with Vite required additional Babel configuration for JSX support.

### Improvements Made
- **Responsiveness:** Layouts are tested and tweaked for desktop, tablet, and mobile breakpoints.
- **Accessibility:** Improved color contrast, focus outlines, and ARIA attributes.
- **Testing:** Added sample and scaffolded tests for main components.
- **Performance:** Efficient rendering, minimal DOM manipulation, and lazy loading for heavy assets.

---

## Scripts & Tooling
- `npm run dev` / `yarn dev`: Start development server
- `npm run build` / `yarn build`: Build for production
- `npm run preview` / `yarn preview`: Preview production build
- `npm run lint` / `yarn lint`: Lint codebase
- `npm test` / `yarn test`: Run unit/integration tests

## Testing
- Unit and integration tests are located in `src/components/*.test.jsx`.
- Run tests with:
  ```bash
  npm test
  # or
  yarn test
  ```

## Deployment
- The project is ready for deployment on Vercel, Netlify, or GitHub Pages.
- See `vercel.json` for Vercel configuration.

---

For any questions or feedback, please open an issue or contact the maintainer.
