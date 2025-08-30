import {SDK} from "ysdk";

declare global {
	interface Window {
		ysdk: SDK;
	}

	module "*.module.css";
	module "*.svg";
	module "*.json";
}
