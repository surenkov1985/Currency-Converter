import React, {useState, useEffect, useRef} from "react"
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
	const [inputText, setInputText] = useState("1 " + baseCurrency + " = " + (totalValue / inputValue).toFixed(4) + " " + totalCurrency);
	const [totalText, setTotalText] = useState("1 " + totalCurrency + " = " + (inputValue / totalValue).toFixed(4) + " " + baseCurrency);

	useEffect(() => {inputRef.current.focus()}, []);
	useEffect(() => {
		setTotalValue(getTotalPrice);
		setInputText("1 " + baseCurrency + " = " + (totalValue / inputValue).toFixed(4) + " " + totalCurrency);
		setTotalText("1 " + totalCurrency + " = " + (inputValue / totalValue).toFixed(4) + " " + baseCurrency)
		}, [totalCurrency, baseCurrency]);
	useEffect(() => {

		if (document.activeElement === inputRef.current) {

			setTotalValue(getTotalPrice)
		}

		setInputText("1 " + baseCurrency + " = " + (totalValue / inputValue).toFixed(4) + " " + totalCurrency);
		setTotalText("1 " + totalCurrency + " = " + (inputValue / totalValue).toFixed(4) + " " + baseCurrency)
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

		setInputText("1 " + baseCurrency + " = " + (totalValue / inputValue).toFixed(4) + " " + totalCurrency);
		setTotalText("1 " + totalCurrency + " = " + (inputValue / totalValue).toFixed(4) + " " + baseCurrency)
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
			<ConverterInput plaseText={inputText} data={props.data} ref={inputRef} val={inputValue} text="Уменя есть:" charCode={baseCurrency} onInputChange={inputValid} onCharChange={(val) => setBaseCurrency(val)} />
			<div className="converter__arrow" onClick={arrowHandler}>
				<svg enableBackground="new 0 0 32 32" id="Layer_4" version="1.1" viewBox="0 0 32 32" space="preserve" xmlns="http://www.w3.org/2000/svg">
					<g>
						<polyline fill="none" points="5,9 13,1 13,32" stroke="#000000" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
						<polyline fill="none" points="25,23 17,31    17,0  " stroke="#000000" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
					</g>
				</svg>
			</div>
			<ConverterInput data={props.data} ref={totalRef} val={totalValue} text="Хочу купить:" plaseText={totalText} charCode={totalCurrency} onInputChange={totalValid} onCharChange={(val) => setTotalCurrency(val)}/>
		</div>
	)
}