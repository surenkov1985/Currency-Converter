import React, {useState, useEffect} from "react"
import getCurrencyData from "../js/getCurrencyData";

export default function ExchangeList(props) {

	let data = getCurrencyData();
	let date = new Date();
	const today = date.toLocaleDateString();
	console.log(data)

	return (
		<div className="container__exchange exchange">
			<ul className="exchange__list">
				<li className="exchange__item_head">
					<div className="exchange__code">Код</div>
					<div className="exchange__currency">Валюта</div>
					<div className="exchange__price">
						<span className="exchange__price_text">Курс на </span>
						<span className="exchange__price_date">{today}</span>
					</div>
					<div className="exchange__price_old">

					</div>
				</li>
				{data.map((item, index) => {

					const {CharCode, Name, Nominal, Previous, Value} = {...item};
					const price = (Value / Nominal).toFixed(4);
					const diff = ((Value - Previous) / Nominal).toFixed(4);

					if (CharCode !== "RUB") {
						return(
							<li className="exchange__item"  key={index}>
								<div className="exchange__code" >{CharCode}</div>
								<div className="exchange__currency">{Name}</div>
								<div className="exchange__price">{price}  ₽</div>
								<div className="exchange__diff" style={{color: (diff >0) ? "green" : "red"}}> {(diff > 0) ? "+" : "-"} {diff} ₽</div>
							</li>
						)
					}
				})}
			</ul>
		</div>
	);
}