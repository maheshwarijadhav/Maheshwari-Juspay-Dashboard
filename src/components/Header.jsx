import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";
import { IoStarOutline } from "react-icons/io5";
import { GoSun } from "react-icons/go";
import { FaRegBell, FaSearch, FaBars } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useUIState } from "./Context";
import { useState } from "react";

/**
 * TopHeader - Main header bar for navigation and actions
 */
export default function TopHeader() {
  // UI state from context
  const {
    setIsLeftSidebarClosed,
    setRightSidebarClosed,
    isLeftSidebarClosed,
    isRightSidebarClosed,
    darkModeEnabled,
    setDarkModeEnabled,
  } = useUIState();
  // Local UI state
  const [fadeTransition, setFadeTransition] = useState(false);
  const [starFilled, setStarFilled] = useState(false);
  const [bellAnimated, setBellAnimated] = useState(false);
  const [clockRotating, setClockRotating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handlers
  const handleClockClick = () => {
    setClockRotating(true);
    setTimeout(() => setClockRotating(false), 700);
  };

  const handleBellClick = () => {
    setBellAnimated(true);
    setTimeout(() => setBellAnimated(false), 700);
  };

  const toggleDarkMode = () => {
    setFadeTransition(true);
    setTimeout(() => {
      setDarkModeEnabled(!darkModeEnabled);
      setFadeTransition(false);
    }, 300);
  };

  const handleStarClick = () => {
    setStarFilled(!starFilled);
  };

  // Accessibility: ARIA roles and keyboard navigation for menu
  return (
    <header>
      <div
        className={`w-full h-8 px-6 text-lg border-b-2 p-8 flex justify-between items-center
          ${darkModeEnabled ? "bg-zinc-900 border-zinc-700 text-white fade-in" : "bg-white border-zinc-300 text-black fade-out"}
          ${fadeTransition ? "fade-out" : ""}`}
        role="banner"
      >
        {/* Left: Sidebar toggle and breadcrumbs */}
        <div className="flex items-center gap-x-5">
          <div>
            {isLeftSidebarClosed ? (
              <LuPanelRightClose
                className="hover:text-gray-400 fade-in"
                onClick={() => setIsLeftSidebarClosed(false)}
                aria-label="Open sidebar"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setIsLeftSidebarClosed(false)}
              />
            ) : (
              <LuPanelLeftClose
                className="hover:text-gray-400 fade-in"
                onClick={() => setIsLeftSidebarClosed(true)}
                aria-label="Close sidebar"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setIsLeftSidebarClosed(true)}
              />
            )}
          </div>
          <nav className="hidden md:flex items-center gap-x-5" aria-label="Breadcrumb">
            <IoStarOutline
              onClick={handleStarClick}
              className={`cursor-pointer hover:text-gray-400 duration-300 ${darkModeEnabled ? (starFilled ? "text-yellow-500 fade-in" : "text-white fade-in") : (starFilled ? "text-yellow-500 fade-out" : "text-zinc-900 fade-out")}`}
              style={{ fontSize: "18px" }}
              aria-label={starFilled ? "Unmark as favorite" : "Mark as favorite"}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleStarClick()}
            />
            <span>
              <Link
                to="/"
                className={`${darkModeEnabled ? "text-white fade-in hover:text-gray-400" : "text-black fade-out hover:text-gray-400"}`}
              >
                Dashboards
              </Link>
            </span>
            <span>/</span>
            <span className="hover:text-gray-400 duration-300 cursor-pointer">Default</span>
          </nav>
        </div>

        {/* Right: Search, theme, notifications, and right sidebar toggle */}
        <div className="flex ">
          <div className="lg:hidden flex items-center">
            <FaBars
              className="cursor-pointer hover:text-gray-400 duration-300 mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open mobile menu"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setMobileMenuOpen(!mobileMenuOpen)}
            />
            {isRightSidebarClosed ? (
              <LuPanelRightClose
                className="hover:text-gray-400 fade-in"
                onClick={() => setRightSidebarClosed(false)}
                aria-label="Open notifications panel"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setRightSidebarClosed(false)}
              />
            ) : (
              <LuPanelLeftClose
                className="hover:text-gray-400 fade-in"
                onClick={() => setRightSidebarClosed(true)}
                aria-label="Close notifications panel"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setRightSidebarClosed(true)}
              />
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-x-5">
          <div className="relative">
            <FaSearch
              className={`absolute top-3.5 left-2 hover:text-gray-900 duration-300 ${darkModeEnabled ? "text-zinc-300 fade-in" : "text-zinc-400 fade-out"}`}
              aria-label="Search icon"
            />
            <input
              type="text"
              placeholder="Search"
              className={`pl-8 py-2 border rounded-lg w-15
                ${darkModeEnabled ? "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-600 fade-in duration-100" : "bg-[#f8f9fb] hover:bg-zinc-200 text-black border-zinc-300 fade-out duration-100"}`}
              aria-label="Search"
            />
          </div>
          <GoSun
            onClick={toggleDarkMode}
            className="hidden md:block cursor-pointer hover:text-gray-400 duration-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-400"
            aria-label={darkModeEnabled ? "Switch to light mode" : "Switch to dark mode"}
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && toggleDarkMode()}
          />
          <FaClockRotateLeft
            onClick={handleClockClick}
            className={`hidden md:block cursor-pointer hover:text-gray-400 duration-300 ${clockRotating ? "rotate-animation" : ""}`}
            style={{ fontSize: "16px" }}
            aria-label="Refresh"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && handleClockClick()}
          />
          <FaRegBell
            onClick={handleBellClick}
            className={`hidden md:block cursor-pointer hover:text-gray-400 duration-300 ${bellAnimated ? "animate-bell" : ""}`}
            style={{ fontSize: "16px" }}
            aria-label="Notifications"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && handleBellClick()}
          />
          <div>
            {isRightSidebarClosed ? (
              <LuPanelLeftClose
                className="hover:text-gray-400 fade-in"
                onClick={() => setRightSidebarClosed(false)}
                aria-label="Open notifications panel"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setRightSidebarClosed(false)}
              />
            ) : (
              <LuPanelRightClose
                className="hover:text-gray-400 fade-in"
                onClick={() => setRightSidebarClosed(true)}
                aria-label="Close notifications panel"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setRightSidebarClosed(true)}
              />
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu (if open) */}
      {mobileMenuOpen && (
        <nav
          className={`lg:hidden flex flex-col p-4 bg-opacity-90 ${darkModeEnabled ? "bg-zinc-900 text-white" : "bg-white text-black"}`}
          aria-label="Mobile menu"
        >
          <IoStarOutline
            onClick={handleStarClick}
            className={`cursor-pointer hover:text-gray-400 duration-300 ${darkModeEnabled ? (starFilled ? "text-yellow-500 fade-in" : "text-white fade-in") : (starFilled ? "text-yellow-500 fade-out" : "text-zinc-900 fade-out")}`}
            style={{ fontSize: "18px" }}
            aria-label={starFilled ? "Unmark as favorite" : "Mark as favorite"}
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && handleStarClick()}
          />
          <div className="flex items-center">
            <span>
              <Link
                to="/"
                className={`${darkModeEnabled ? "text-white fade-in hover:text-gray-400" : "text-black fade-out hover:text-gray-400"}`}
              >
                Dashboards
              </Link>
            </span>
            <span> / </span>
            <span className="hover:text-gray-400 duration-300">Default</span>
          </div>
          <div className="relative mt-2">
            <FaSearch
              className={`absolute top-3.5 left-2 hover:text-gray-900 duration-300 ${darkModeEnabled ? "text-zinc-300 fade-in" : "text-zinc-400 fade-out"}`}
              aria-label="Search icon"
            />
            <input
              type="text"
              placeholder="Search"
              className={`pl-8 py-2 border rounded-lg w-full 
                ${darkModeEnabled ? "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-600 fade-in duration-100" : "bg-[#f8f9fb] hover:bg-zinc-200 text-black border-zinc-300 fade-out duration-100"}`}
              aria-label="Search"
            />
          </div>
        </nav>
      )}
    </header>
  );
}
