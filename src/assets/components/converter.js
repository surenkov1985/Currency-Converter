import React, {useState, useEffect, useRef} from "react"
import getCurrencyData from "../js/getCurrencyData";
import ConverterInput from "./converterInput.js"

export default function Converter(props) {

	const inputRef = useRef();
	const totalRef = useRef();

	const [data, setData] = useState(props.data);
	const [baseCurrency, setBaseCurrency] = useState("RUB");
	const [totalCurrency, setTotalCurrency] = useState("USD");
	const [inputValue, setInputValue] = useState(1000);
	const [totalValue, setTotalValue] = useState(getTotalPrice);
	const [reverse, setReverse] = useState(true);

	useEffect(() => {inputRef.current.focus()}, []);
	useEffect(() => {setTotalValue(getTotalPrice)}, [totalCurrency, baseCurrency]);
	// useEffect(() => {setInputValue(getInputPrice)}, [baseCurrensy]);
	useEffect(() => {

		if (document.activeElement === inputRef.current) {

			setTotalValue(getTotalPrice)
		}
	}, [inputValue]);

	function arrowHandler() {
		let charInput = baseCurrency;
		let charTotal = totalCurrency;

		setTotalCurrency(charInput);
		setBaseCurrency(charTotal);
	}

	useEffect(()=> {

		if (document.activeElement === totalRef.current){

			setInputValue(getInputPrice)
		}
	}, [totalValue]);


	function inputValid(e) {

		const reg = /\d*\.?\d*/;

		if (reg.test(e.target.value)) {

			setInputValue(e.target.value)
		}

	}

	function totalValid(e) {

		const reg = /\d*\.?\d*/;

		if (reg.test(e.target.value)) {

			setTotalValue(e.target.value)
		}
	}

	function getInputPrice() {

		let basePrice;
		let totalPrice;
		let result;

		{data.map((item) => {

			let {CharCode, Value, Nominal} = {...item};

			if (CharCode === baseCurrency) {

				basePrice = (Value / Nominal).toFixed(2);
			} else if (CharCode === totalCurrency) {

				totalPrice = (Value / Nominal).toFixed(2);
			}

		})}

		if (baseCurrency === totalCurrency) {

			result = inputValue;
		} else {

			result = (totalPrice / basePrice * totalValue).toFixed(2)
		}

		return result;
	}

	function getTotalPrice() {

		let basePrice;
		let totalPrice;
		let result;

		{data.map((item) => {

			let {CharCode, Value, Nominal} = {...item};

			if (CharCode === baseCurrency) {

				basePrice = (Value / Nominal).toFixed(2);
			} else if (CharCode === totalCurrency) {

				totalPrice = (Value / Nominal).toFixed(2);
			}

		})}

		if (baseCurrency === totalCurrency) {

			result = inputValue;
		} else {

			result = (basePrice / totalPrice * inputValue).toFixed(2)
		}

		return result;
	}

	return (
		<div className="container__converter converter">
			<ConverterInput ref={inputRef} val={inputValue} text="Уменя есть:" charCode={baseCurrency} onInputChange={inputValid} onCharChange={(val) => onBaseChar(val)} />
			<div className="converter__arrow" onClick={arrowHandler}>
				<svg enableBackground="new 0 0 32 32" id="Layer_4" version="1.1" viewBox="0 0 32 32" space="preserve" xmlns="http://www.w3.org/2000/svg">
					<g>
						<polyline fill="none" points="5,9 13,1 13,32" stroke="#000000" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
						<polyline fill="none" points="25,23 17,31    17,0  " stroke="#000000" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
					</g>
				</svg>
			</div>
			<ConverterInput ref={totalRef} val={totalValue} text="Хочу купить:" charCode={totalCurrency} onInputChange={totalValid} onCharChange={(val) => onTotalChar(val)}/>
		</div>
	)
}