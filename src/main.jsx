import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UIStateProvider } from "./components/Context.jsx";

createRoot(document.getElementById("root")).render(
	<UIStateProvider>
		<App />
	</UIStateProvider>
);
