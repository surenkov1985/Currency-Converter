import React, {useState} from "react"
import getCurrencyData from "../js/getCurrencyData";
import BlockButton from "./blockButton"

export default function ConverterInput(props) {

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

	const [input,  setInput] = useState(props.val);
	const [active, setActive] = useState(false);
	const [charCode, setCharCode] = useState(props.charCode)

	function listActivate() {
		setActive(!active);
	}

	function itemHandler(val) {
		setCharCode(val);
		setActive(!active);
	}

	return (
		<div className="converter__input">
			<label htmlFor="" className="converter__choice choice">
				<span className="choice__title">{props.text}</span>
				<BlockButton className="choice__exchange" onClick={listActivate} val={charCode}/>
				{active && <ul className="choice__list">
					{data.map((item, index) => {

						const {CharCode, Name} = {...item};

						if (CharCode !== props.charCode){
							return(
								<li className="choice__item" key={index} onClick={() => {itemHandler(CharCode); props.onCharChange(CharCode)}}>
									<span className="choice__item-code">{CharCode}</span>
									<span className="choice__item-name">{Name}</span>
								</li>
							)
						}
					})}
				</ul>}
			</label>
			<input type="text" className="converter__nominal" value={props.val} onChange={(e) => {props.onInputChange(e); props.onChange()}} inputMode="numeric"/>
		</div>
	)
}