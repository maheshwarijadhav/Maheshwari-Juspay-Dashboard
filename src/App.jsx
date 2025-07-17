// App.jsx - Main application entry point
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import SidebarNavigation from "./components/Sidebar";
import NotificationPanel from "./components/RightBar";
import TopHeader from "./components/Header";

// Lazy load main pages for performance
const DashboardPage = lazy(() => import("./components/Dashboard"));
const OrdersTablePage = lazy(() => import("./components/Table"));

/**
 * Loading spinner for lazy-loaded components
 */
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen w-full" role="status" aria-label="Loading">
    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
  </div>
);

/**
 * Root App component
 */
const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar navigation */}
        <SidebarNavigation />

        {/* Main content area */}
        <div className="flex flex-col w-full">
          <TopHeader className="static" />
          <main className="border-x-2 border-zinc-200 flex flex-col overflow-y-scroll" tabIndex={-1}>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/orders" element={<OrdersTablePage />} />
              </Routes>
            </Suspense>
          </main>
        </div>

        {/* Notification/Right panel */}
        <NotificationPanel />
      </div>
    </Router>
  );
};

export default App;
