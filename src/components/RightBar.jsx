import React from "react";
import { motion } from "framer-motion";
import { PiBugBeetle, PiUser, PiBroadcast } from "react-icons/pi";
import { useUIState } from "./Context";
import PropTypes from "prop-types";

/**
 * IconWrapper - Utility for icon backgrounds
 */
const IconWrapper = ({ children, bgColor }) => (
	<div className={`p-1 rounded-full mr-2 ${bgColor}`}>{children}</div>
);
IconWrapper.propTypes = {
	children: PropTypes.node.isRequired,
	bgColor: PropTypes.string.isRequired,
};

/**
 * NotificationItem - Single notification row
 */
const NotificationItem = React.memo(({ notif }) => {
	const icons = {
		bug: <PiBugBeetle className="text-blue-600" style={{ fontSize: "18px" }} />,
		user: <PiUser className="text-blue-600" style={{ fontSize: "18px" }} />,
		subscribe: <PiBroadcast className="text-blue-600" style={{ fontSize: "18px" }} />,
	};
	const bgColors = {
		bug: "bg-blue-100",
		user: "bg-blue-100",
		subscribe: "bg-blue-100",
	};
	return (
		<li className="flex items-center mb-4" role="listitem">
			<IconWrapper bgColor={bgColors[notif.type]}>{icons[notif.type]}</IconWrapper>
			<div>
				<p className="text-xs">{notif.message}</p>
				<p className="text-xs text-zinc-500">{notif.time}</p>
			</div>
		</li>
	);
});
NotificationItem.displayName = "NotificationItem";
NotificationItem.propTypes = {
	notif: PropTypes.shape({
		type: PropTypes.oneOf(["bug", "user", "subscribe"]).isRequired,
		message: PropTypes.string.isRequired,
		time: PropTypes.string.isRequired,
	}).isRequired,
	isDarkMode: PropTypes.bool.isRequired,
};

/**
 * ActivityItem - Single activity row
 */
const ActivityItem = ({ activity, isDarkMode }) => (
	<li className="flex items-center mb-4" role="listitem">
		<IconWrapper bgColor={isDarkMode ? "bg-blue-600/20" : "bg-blue-200/50"}>
			<img src={activity.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
		</IconWrapper>
		<div>
			<p className="text-xs">{activity.action}</p>
			<p className={`text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>{activity.time}</p>
		</div>
	</li>
);
ActivityItem.propTypes = {
	activity: PropTypes.shape({
		avatar: PropTypes.string.isRequired,
		action: PropTypes.string.isRequired,
		time: PropTypes.string.isRequired,
	}).isRequired,
	isDarkMode: PropTypes.bool.isRequired,
};

/**
 * ContactItem - Single contact row
 */
const ContactItem = ({ contact, index, isDarkMode }) => (
	<li className="flex items-center mb-3" role="listitem">
		<IconWrapper bgColor={isDarkMode ? "bg-purple-600/20" : "bg-purple-200/50"}>
			<img src={`https://i.pravatar.cc/30?img=${index + 20}`} alt="avatar" className="w-6 h-6 rounded-full" />
		</IconWrapper>
		<div>
			<p className="text-sm">{contact.user}</p>
		</div>
	</li>
);
ContactItem.propTypes = {
	contact: PropTypes.shape({
		user: PropTypes.string.isRequired,
	}).isRequired,
	index: PropTypes.number.isRequired,
	isDarkMode: PropTypes.bool.isRequired,
};

/**
 * Section - Reusable section for notifications, activities, contacts
 */
const Section = ({ title, children, isDarkMode }) => (
	<div>
		<h2 className={`font-bold text-md mb-2 ${isDarkMode ? "text-zinc-100" : "text-zinc-900"}`}>{title}</h2>
		<ul className="max-h-[270px] overflow-hidden overflow-y-auto mb-6" role="list">
			{children}
		</ul>
	</div>
);
Section.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	isDarkMode: PropTypes.bool.isRequired,
};

// Notification, contact, and activity data
const notifications = [
	{ type: "bug", message: "You have a bug that needs ...", time: "Just now" },
	{ type: "user", message: "New user registered", time: "59 minutes ago" },
	{ type: "bug", message: "You have a bug that needs ...", time: "12 hours ago" },
	{ type: "subscribe", message: "Andi Lane subscribed to you", time: "Today, 11:59 AM" },
];
const contactsData = [
	{ user: "Natali Craig" },
	{ user: "Drew Cano" },
	{ user: "Orlando Diggs" },
	{ user: "Andi Lane" },
	{ user: "Kate Morrison" },
	{ user: "Koray Occumos" },
];
const activityData = [
	{ avatar: "https://i.pravatar.cc/30?img=20", action: "You have a bug that needs...", time: "Just now" },
	{ avatar: "https://i.pravatar.cc/30?img=21", action: "Released a new version", time: "59 minutes ago" },
	{ avatar: "https://i.pravatar.cc/30?img=22", action: "Submitted a bug", time: "12 hours ago" },
	{ avatar: "https://i.pravatar.cc/30?img=23", action: "Modified A data in Page X", time: "Today, 11:59 AM" },
	{ avatar: "https://i.pravatar.cc/30?img=24", action: "Deleted a page in Project X", time: "Feb 2, 2023" },
];

/**
 * NotificationPanel - Right sidebar for notifications, activities, contacts
 */
export default function NotificationPanel() {
	const { isRightSidebarClosed, darkModeEnabled } = useUIState();
	const sidebarVariants = {
		open: { width: "20rem", opacity: 1, transition: { duration: 0.3, ease: "easeIn" } },
		closed: { width: "0rem", opacity: 0, transition: { duration: 0.3, ease: "easeOut" } },
	};
	return (
		<motion.div
			variants={sidebarVariants}
			initial="closed"
			animate={isRightSidebarClosed ? "closed" : "open"}
			className={`max-h-screen font-inter overflow-scroll ${darkModeEnabled ? "bg-zinc-900 text-zinc-300" : "bg-white text-zinc-700"}`}
			role="complementary"
			aria-label="Notifications and contacts sidebar"
		>
			<div className="p-4">
				<Section title="Notifications" isDarkMode={darkModeEnabled}>
					{notifications.map((notif, index) => (
						<NotificationItem key={index} notif={notif} isDarkMode={darkModeEnabled} />
					))}
				</Section>
				<Section title="Activities" isDarkMode={darkModeEnabled}>
					{activityData.map((activity, index) => (
						<ActivityItem key={index} activity={activity} isDarkMode={darkModeEnabled} />
					))}
				</Section>
				<Section title="Contacts" isDarkMode={darkModeEnabled}>
					{contactsData.map((contact, index) => (
						<ContactItem key={index} contact={contact} index={index} isDarkMode={darkModeEnabled} />
					))}
				</Section>
			</div>
		</motion.div>
	);
}
