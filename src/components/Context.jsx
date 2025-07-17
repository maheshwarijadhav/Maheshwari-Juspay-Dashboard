// Context.jsx - Application-wide UI state context
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// Context for UI state (sidebar, theme, etc.)
export const UIStateContext = createContext();

/**
 * UIStateProvider manages global UI state (sidebars, dark mode)
 */
export const UIStateProvider = ({ children }) => {
  // Sidebar and theme state
  const [isRightSidebarClosed, setRightSidebarClosed] = useState(false);
  const [isLeftSidebarClosed, setLeftSidebarClosed] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <UIStateContext.Provider
      value={{
        isRightSidebarClosed,
        setRightSidebarClosed,
        isLeftSidebarClosed,
        setLeftSidebarClosed,
        darkModeEnabled,
        setDarkModeEnabled,
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
};

UIStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook to access UI state context
 */
export const useUIState = () => {
  const context = useContext(UIStateContext);
  if (!context) {
    throw new Error("useUIState must be used within a UIStateProvider");
  }
  return context;
};
