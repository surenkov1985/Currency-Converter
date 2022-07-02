import React, {useState} from "react";
import BlockButton from "./blockButton"
import ExchangeList from "./ExchangeList"
import Converter from "./converter"

export default function BlockContainer() {

	const [converterActive, setConverterActive] = useState(false);
	let activeBlock;

	function converterHandler() {
		setConverterActive(!converterActive);

		document.querySelector(".container__button-currency").classList.toggle("active");
		document.querySelector(".container__button-converter").classList.toggle("active");
	}

	if (converterActive) {
		activeBlock = <ExchangeList/>
	} else {
		activeBlock = <Converter/>
	}

	return (
		<>
			<div className="container__title">
				<BlockButton className="container__button-currency" onClick={converterHandler} val="Курсы валют ЦБ РФ"/>
				<BlockButton className="container__button-converter active" onClick={converterHandler} val="Конвертер валют"/>
			</div>
			{activeBlock}
		</>
	)
}