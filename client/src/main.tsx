import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { I18nextProvider } from "react-i18next"
import i18next from "./i18n"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>
)
