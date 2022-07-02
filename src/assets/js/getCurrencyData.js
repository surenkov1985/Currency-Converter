import {useState, useEffect} from "react";

export default function getCurrencyData() {

	const localKey = new Date().toISOString().slice(0, 10);
	const [data, setData] = useState({});
	const currencyData = {...data};
	const currensyArr = [];
	const arr = [];


	let {USD, EUR, GBP} = {...currencyData.Valute};

	arr.push(USD, EUR, GBP);

	function getData() {

		if (!localStorage.hasOwnProperty(localKey)) {

			fetch("https://www.cbr-xml-daily.ru/daily_json.js")
				.then((response) => {return response.json()})
				.then((json) => { setData(json); localStorage.setItem(localKey, JSON.stringify(json))})
		} else {

			setData(JSON.parse(localStorage.getItem(localKey)));
		}
	}

	useEffect(() => {
		getData()
	}, []);

	for (let key in currencyData.Valute) {

		if (key !== "USD" && key !=="EUR" && key !== "GBP") {

			arr.push(currencyData.Valute[key])
		}
	}

	return arr;
}