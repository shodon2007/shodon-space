import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./app/styles/index.scss";
import {StoreProvider} from "./app/providers/storeProvider";
import {BrowserRouter} from "react-router-dom";
import "src/shared/config/i18n/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StoreProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StoreProvider>,
);
