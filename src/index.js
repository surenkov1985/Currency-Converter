import "/assets/scss/main.scss";
import React, {useEffect, useState} from "react";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
import BlockContainer from "./assets/components/blockContainer"


root.render(
	<div className="container">
		<BlockContainer/>
		{/*<div className="container__title">*/}
			{/*<button className="container__button-currency active" onClick={exchangeHandler}>Курсы валют ЦБ РФ</button>*/}
			{/*<button className="container__button-converter" onClick={converterHandler}>Курсы валют ЦБ</button>*/}
		{/*</div>*/}
		{/*/!*<ExchangeList/>*!/*/}
		{/*<Converter/>*/}
	</div>
)