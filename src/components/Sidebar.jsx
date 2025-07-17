import { useState } from "react";
import {
	FaChevronUp,
	FaChevronRight,
	FaUserCircle,
	FaRegIdBadge,
} from "react-icons/fa";
import { LuPanelLeftClose } from "react-icons/lu";
import { HiOutlineIdentification } from "react-icons/hi";
import {
	PiChartPieSliceLight,
	PiShoppingBagOpen,
	PiFolder,
	PiBookOpenDuotone,
	PiUsersThreeDuotone,
	PiNotebookDuotone,
	PiChatsTeardropDuotone,
} from "react-icons/pi";
import { useUIState } from "./Context";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegFolderOpen } from "react-icons/fa6";

// Sidebar menu definitions
const dashboardMenus = [
	{ label: "Default", icon: PiChartPieSliceLight },
	{ label: "eCommerce", icon: PiShoppingBagOpen },
	{ label: "Projects", icon: PiFolder },
	{ label: "Online Courses", icon: PiBookOpenDuotone },
];
const menus = {
	ProfileMenu: ["Overview", "User Projects", "Campaigns", "Documents", "Followers"],
	AccountMenu: ["Profile", "Settings", "Billing", "Notifications", "Security"],
	CorporateMenu: ["Company", "Departments", "Corporate Projects", "Tasks", "Calendar"],
	BlogMenu: ["Posts", "Categories", "Tags", "Comments", "Authors"],
	SocialMenu: ["Feed", "Messages", "Friends", "Groups", "Notifications 1"],
};

/**
 * ExpandableMenu - Collapsible sidebar menu section
 */
function ExpandableMenu({ label, Icon, menuItems, activeTab, setActiveTab, isDarkMode }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<li className="cursor-pointer">
			<div
				className={`flex text-md py-2 pl-3 rounded-lg items-center transition-colors duration-300 ${isDarkMode ? "hover:bg-zinc-700 fade-in" : "hover:bg-zinc-200 fade-out"}`}
				onClick={() => setIsOpen(!isOpen)}
				aria-expanded={isOpen}
				tabIndex={0}
				onKeyDown={e => e.key === 'Enter' && setIsOpen(!isOpen)}
			>
				<span className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}>
					{isOpen ? (
						<FaChevronUp className={`text-${isDarkMode ? "zinc-400 fade-in" : "fade-out zinc-500"}`} style={{ fontSize: "12px" }} />
					) : (
						<FaChevronRight className={`text-${isDarkMode ? "zinc-400 fade-in" : "fade-out zinc-500"}`} style={{ fontSize: "12px" }} />
					)}
				</span>
				<Icon className={`mx-2 text-${isDarkMode ? "zinc-300 fade-in" : "fade-out zinc-800"}`} style={{ fontSize: "18px" }} />
				<span className={`text-${isDarkMode ? "zinc-300 fade-in" : "fade-out zinc-800"} text-md font-normal`}>{label}</span>
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.ul
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="text-md pl-6"
					>
						{menuItems.map((item, index) => (
							<motion.li
								key={item}
								className={`py-2 pl-4 cursor-pointer rounded-lg transition-colors duration-300 ${isDarkMode ? "hover:bg-zinc-600 fade-in" : "hover:bg-zinc-300"} ${activeTab === item ? (isDarkMode ? "active-tab-dark" : "active-tab") : ""}`}
								onClick={() => setActiveTab(item)}
								tabIndex={0}
								onKeyDown={e => e.key === 'Enter' && setActiveTab(item)}
								aria-current={activeTab === item ? "page" : undefined}
							>
								{item}
							</motion.li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</li>
	);
}
ExpandableMenu.propTypes = {
	label: PropTypes.string.isRequired,
	Icon: PropTypes.elementType.isRequired,
	menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
	activeTab: PropTypes.string.isRequired,
	setActiveTab: PropTypes.func.isRequired,
	isDarkMode: PropTypes.bool,
};

/**
 * SidebarNavigation - Main sidebar component
 */
export default function SidebarNavigation() {
	const [activeTab, setActiveTab] = useState("Default");
	const { isLeftSidebarClosed, darkModeEnabled, setLeftSidebarClosed } = useUIState();
	const [favoritesTab, setFavoritesTab] = useState("Favorites");
	const [selectedFavorite, setSelectedFavorite] = useState("");
	const favorites = ["Overview", "Projects"];
	const recent = ["Recent Project 1", "Recent Project 2"];
	const location = useLocation();

	// Sidebar open/close animation variants
	const sidebarVariants = {
		open: { width: "15rem", opacity: 1, transition: { duration: 0.3, ease: "easeIn" } },
		closed: { width: "0rem", opacity: 0, transition: { duration: 0.3, ease: "easeOut" } },
	};

	// Accessibility: ARIA roles and keyboard navigation for sidebar
	return (
		<motion.div
			variants={sidebarVariants}
			initial="closed"
			animate={isLeftSidebarClosed ? "closed" : "open"}
			className={`h-screen font-inter ${darkModeEnabled ? "bg-zinc-900 text-zinc-300" : "bg-white text-zinc-700"} md:w-52 top-0 left-0 z-50 shadow-lg transition-all duration-300`}
			role="navigation"
			aria-label="Sidebar navigation"
		>
			<div className={`w-52 ${isLeftSidebarClosed ? "hidden" : "block"} transition-bg ${darkModeEnabled ? "bg-zinc-900 text-zinc-300 hover:text-zinc-400 fade-in" : "bg-white text-zinc-900 hover:text-zinc-800 fade-out"} h-screen p-4 font-inter overflow-scroll transition-transform duration-300 md:translate-x-0 fixed md:static top-0 left-0 z-50 shadow-lg`}>
				{/* Sidebar header */}
				<div className="flex justify-between items-center mb-8">
					<div className="flex items-center">
						<FaUserCircle size={30} className={`mr-2 text-${darkModeEnabled ? "zinc-300" : "zinc-800"}`} />
						<p className={`font-medium text-lg`}>ByeWind</p>
					</div>
					<div className="flex items-start">
						<LuPanelLeftClose
							className="cursor-pointer md:hidden hover:text-gray-400 duration-300"
							onClick={() => setLeftSidebarClosed(true)}
							aria-label="Close sidebar"
							tabIndex={0}
							onKeyDown={e => e.key === 'Enter' && setLeftSidebarClosed(true)}
						/>
					</div>
				</div>
				{/* Favorites/Recent toggle */}
				<div className="mb-4">
					<div className="font-normal text-md">
						<div className="mb-4 ml-2">
							<div className="flex mb-2">
								<button
									className={`mr-4 ${favoritesTab === "Favorites" ? (darkModeEnabled ? "text-zinc-100 hover:text-zinc-200 fade-in" : "fade-out text-zinc-400 hover:text-zinc-300") : "text-zinc-300 hover:text-zinc-500 fade-in"}`}
									onClick={() => setFavoritesTab("Favorites")}
									aria-pressed={favoritesTab === "Favorites"}
								>
									Favorites
								</button>
								<button
									className={`${favoritesTab === "Recent" ? (darkModeEnabled ? "text-zinc-100 hover:text-zinc-200 fade-in" : "fade-out text-zinc-400 hover:text-zinc-300") : "text-zinc-300 hover:text-zinc-500 fade-in"}`}
									onClick={() => setFavoritesTab("Recent")}
									aria-pressed={favoritesTab === "Recent"}
								>
									Recent
								</button>
							</div>
							<ul>
								{(favoritesTab === "Favorites" ? favorites : recent).map(item => (
									<li
										key={item}
										onClick={() => setSelectedFavorite(item)}
										className={`flex items-center text-md py-2 pl-1 cursor-pointer transition-colors duration-200 ease-in-out ${selectedFavorite === item ? (darkModeEnabled ? "bg-zinc-800 text-white fade-in" : "fade-out bg-zinc-100 text-black") : darkModeEnabled ? "hover:bg-zinc-700 text-white fade-in" : "fade-out hover:bg-zinc-200 text-zinc-500"} rounded-lg`}
										tabIndex={0}
										onKeyDown={e => e.key === 'Enter' && setSelectedFavorite(item)}
										aria-current={selectedFavorite === item ? "page" : undefined}
									>
										<span className={`rounded-full h-2 w-2 ${selectedFavorite === item ? (darkModeEnabled ? "bg-zinc-300" : "bg-zinc-700") : "bg-zinc-400"} mr-2`}></span>
										{item}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				{/* Dashboards section */}
				<div className="mb-4">
					<p className={`text-${darkModeEnabled ? "zinc-400" : "zinc-500"} mb-2 ml-2 text-md font-normal`}>Dashboards</p>
					<ul>
						{dashboardMenus.map(({ label, icon: Icon }) => (
							<li
								key={label}
								className={`flex items-center text-md py-2 pl-4 cursor-pointer transition-colors duration-300 ease-in-out ${activeTab === label ? (darkModeEnabled ? "active-tab-dark" : "active-tab") : darkModeEnabled ? "hover:bg-zinc-700" : "hover:bg-zinc-200"} rounded-lg`}
								onClick={() => setActiveTab(label)}
								tabIndex={0}
								onKeyDown={e => e.key === 'Enter' && setActiveTab(label)}
								aria-current={activeTab === label ? "page" : undefined}
							>
								<Icon className={`mr-2 text-${darkModeEnabled ? "zinc-300" : "zinc-800"}`} style={{ fontSize: "18px" }} />
								<span className={`text-${darkModeEnabled ? "zinc-300" : "zinc-800"} text-md font-normal`}>{label}</span>
							</li>
						))}
					</ul>
				</div>
				{/* Pages section */}
				<div>
					<p className={`text-${darkModeEnabled ? "zinc-400" : "zinc-500"} mb-2 ml-2 text-md font-normal`}>Pages</p>
					<ul>
						<ExpandableMenu label="User Profile" Icon={FaRegIdBadge} menuItems={menus.ProfileMenu} activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={darkModeEnabled} />
						<ExpandableMenu label="Account" Icon={HiOutlineIdentification} menuItems={menus.AccountMenu} activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={darkModeEnabled} />
						<ExpandableMenu label="Corporate" Icon={PiUsersThreeDuotone} menuItems={menus.CorporateMenu} activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={darkModeEnabled} />
						<ExpandableMenu label="Blog" Icon={PiNotebookDuotone} menuItems={menus.BlogMenu} activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={darkModeEnabled} />
						<ExpandableMenu label="Social" Icon={PiChatsTeardropDuotone} menuItems={menus.SocialMenu} activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={darkModeEnabled} />
					</ul>
				</div>
			</div>
		</motion.div>
	);
}
