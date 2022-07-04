import React, {useState, useEffect} from "react"
import BlockButton from "./blockButton"

export default function ExchangeList(props) {

	const [data, setData] = useState(props.data);
	const [charCode, setCharCode] = useState("RUB");
	const [active, setActive] = useState(false);
	const [basePrice, setBasePrice] = useState(getBasePrice);

	let date = new Date();
	const today = date.toLocaleDateString();

	useEffect(() => {setBasePrice(getBasePrice)}, [charCode])

	function listActivate() {
		setActive(!active);
	}

	function itemHandler(val) {
		setCharCode(val);
		setActive(!active);
	}

	function getBasePrice() {

		let price;

		{data.map((item) => {

			let {CharCode, Value, Nominal} = {...item};

			if (CharCode === charCode) {

				price = (Value / Nominal).toFixed(4);
			}

		})}

		return price;
	}

	return (
		<div className="container__scroll">
			<div className="container__exchange exchange">
				<ul className="exchange__list">
					<li className="exchange__item_head">
						<div className="exchange__code">Код</div>
						<div className="exchange__currency">Валюта</div>
						<div className="exchange__price">
							<span className="exchange__price_text">Курс на </span>
							<span className="exchange__price_date">{today}</span>
						</div>
						<div className="exchange__base">
							<label htmlFor="" className="converter__choice choice">
								<span className="choice__title">Базовая валюта:</span>
								<BlockButton className="choice__exchange" onClick={listActivate} val={charCode}/>
								{active && <ul className="choice__list">
									{data.map((item, index) => {

										const {CharCode, Name} = {...item};

										if (CharCode !== charCode){
											return(
												<li className="choice__item" key={index} onClick={() => {itemHandler(CharCode)}}>
													<span className="choice__item-code">{CharCode}</span>
													<span className="choice__item-name">{Name}</span>
												</li>
											)
										}
									})}
								</ul>}
							</label>
						</div>
					</li>
					{data.map((item, index) => {

						const {CharCode, Name, Nominal, Previous, Value} = {...item};
						const price = (Value / Nominal / basePrice).toFixed(4);
						const diff = ((Value - Previous) / Nominal).toFixed(4);

						if (CharCode !== charCode) {
							return(
								<li className="exchange__item"  key={index}>
									<div className="exchange__code" >{CharCode}</div>
									<div className="exchange__currency">{Name}</div>
									<div className="exchange__price">{price} {charCode}</div>
									<div className="exchange__diff" style={{color: (diff >0) ? "green" : "red"}}> {(diff > 0) ? "+" : "-"} {diff}</div>
								</li>
							)
						}
					})}
				</ul>
			</div>
		</div>
	);
}