import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./index.css";
import { setYSDKLanguage } from "./app/i18n/i18n";

//Инициализация SDK Yandex Games
// YaGames.init().then((ysdk) => {
// 	console.log("Yandex SDK initialized");
// 	window.ysdk = ysdk;
// 	setYSDKLanguage(ysdk)
// 	ysdk.features.LoadingAPI.ready()
// });

const rootNode = document.getElementById("root");

if (rootNode) {
	const app = createRoot(rootNode);
	app.render(<App />);
}
