import {createRoot} from "react-dom/client";
import {App} from "./app/App";
import './index.css'

const rootNode = document.getElementById('root')

if (rootNode) {
    const app = createRoot(rootNode)
    app.render(<App/>)
}
