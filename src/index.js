import "/assets/scss/main.scss";
import React from "react";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
import BlockContainer from "./assets/components/blockContainer"


root.render(
	<div className="container">
		<BlockContainer/>
	</div>
);