import React, {useState, useEffect} from "react"
import getCurrencyData from "../js/getCurrencyData";
import ConverterInput from "./converterInput.js"

export default function Converter() {

	useEffect(() => {getPrise()}, [])
	let data = getCurrencyData();
	const RUB = {
		CharCode: "RUB",
		ID: "R00000",
		Name: "Рубль",
		Nominal: 1,
		NumCode: "000",
		Previous: 1,
		Value: 1
	};
	data.unshift(RUB);

	console.log(data)

	const [baseCurrensy, setBaseCurrency] = useState("RUB");
	const [totalCurrency, setTotalCurrency] = useState("USD");
	const [inputValue, setInputValue] = useState(1000);
	const [totalValue, setTotalValue] = useState();
	const [inputPrice, setInputPrice] = useState();
	const [totalPrise, setTotalPrice] = useState();


	function inputValid(e) {

		const reg = /^\d{0,}(?:[\.\,]\d+)?$/;

		if (reg.test(e.target.value)) {

			setInputValue(e.target.value)
		}
	}

	function getPrise() {

		// let data = getCurrencyData();
		// const RUB = {
		// 	CharCode: "RUB",
		// 	ID: "R00000",
		// 	Name: "Рубль",
		// 	Nominal: 1,
		// 	NumCode: "000",
		// 	Previous: 1,
		// 	Value: 1
		// };
		// data.unshift({RUB});
		//
		// console.log(data)
		{data.map((item) => {


			let {CharCode, Value, Nominal} = {...item};

			console.log(CharCode)
			if (CharCode === baseCurrensy) {

				setInputPrice((Value / Nominal).toFixed(4));
			} else if (CharCode === totalCurrency) {

				setTotalPrice((Value / Nominal).toFixed(4));
			}

		})}

		setTotalValue(inputPrice / totalPrise * inputValue);
	}



	console.log(inputPrice, totalPrise, totalCurrency);

	return (
		<div className="container__converter converter">
			<ConverterInput val={inputValue} text="Уменя есть:" charCode={baseCurrensy} onInputChange={(e) => inputValid(e)} onCharChange={(val) => setBaseCurrency(val)} onChange={getPrise}/>
			<div className="converter__arrow">
				<svg enableBackground="new 0 0 32 32" id="Layer_4" version="1.1" viewBox="0 0 32 32" space="preserve" xmlns="http://www.w3.org/2000/svg">
					<g>
						<polyline fill="none" points="5,9 13,1 13,32" stroke="#000000" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
						<polyline fill="none" points="25,23 17,31    17,0  " stroke="#000000" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
					</g>
				</svg>
			</div>
			<ConverterInput val={totalValue} text="Хочу купить:" charCode={totalCurrency} onCharChange={(val) => setTotalCurrency(val)}/>
		</div>
	)
}