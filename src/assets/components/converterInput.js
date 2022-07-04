import React, {useState, forwardRef, useEffect} from "react"
import getCurrencyData from "../js/getCurrencyData";
import BlockButton from "./blockButton"

const ConverterInput = forwardRef((props, ref) => {

	// let data = getCurrencyData();
	const [data, setData] = useState(props.data);
	const [active, setActive] = useState(false);
	const [charCode, setCharCode] = useState()

	useEffect(() => {setActive(!active);}, [props.charCode]);

	function listActivate() {
		setActive(!active);
	}
	console.log(active)
	function itemHandler(e, val) {
		e.stopPropagation()

		// setActive(!active);
		setCharCode(val);
	}

	return (
		<div className="converter__input">
			<label className="converter__choice choice">
				<span className="choice__title">{props.text}</span>
				<BlockButton className="choice__exchange" onClick={listActivate} val={props.charCode}/>
				{!active && <ul className="choice__list">
					{data.map((item, index) => {

						const {CharCode, Name} = {...item};

						if (CharCode !== props.charCode){
							return(
								<li className="choice__item" key={index} onClick={(e) => {itemHandler(e, CharCode); props.onCharChange(CharCode)}}>
									<span className="choice__item-code">{CharCode}</span>
									<span className="choice__item-name">{Name}</span>
								</li>
							)
						}
					})}
				</ul>}
			</label>
			<label className="converter__input-block">
				<input type="text" className="converter__nominal" ref={ref} value={props.val} onChange={(e) => {props.onInputChange(e)}} inputMode="numeric" onFocus={props.onFocus} onBlur={props.onBlur}/>
				<div className="converter__price">{props.plaseText}</div>
			</label>

		</div>
	)
});

export default ConverterInput;