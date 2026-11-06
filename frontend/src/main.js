import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/main.scss";
import { SiteConfig } from "./config/SiteConfig.js";
import { AppController } from "./app/AppController.js";

const app = new AppController({
	root: document.getElementById("app"),
	config: SiteConfig
});

app.start();
