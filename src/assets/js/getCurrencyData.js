import {useState, useEffect} from "react";

export default function getCurrencyData() {

	const RUB = {
		CharCode: "RUB",
		ID: "R00000",
		Name: "Рубль",
		Nominal: 1,
		NumCode: "000",
		Previous: 1,
		Value: 1
	};

	const localKey = new Date().toISOString().slice(0, 10);
	let data = getData();
	const currencyData = {...data};
	const {USD, EUR, GBP} = {...currencyData.Valute};
	const arr = [{...RUB}, {...USD}, {...EUR}, {...GBP}];

	function getData() {

		if (!localStorage.hasOwnProperty(localKey)) {

			fetch("https://www.cbr-xml-daily.ru/daily_json.js")
				.then((response) => {return response.json()})
				.then((json) => { return json; localStorage.setItem(localKey, JSON.stringify(json))})
		} else {

			return JSON.parse(localStorage.getItem(localKey));
		}
	}

	for (let key in currencyData.Valute) {

		if (key !== "USD" && key !=="EUR" && key !== "GBP") {

			arr.push(currencyData.Valute[key])
		}
	}

	return arr;
}