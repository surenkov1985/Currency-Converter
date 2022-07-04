import React from "react"

export default function BlockButton(props) {

	return (
		<button className={props.className} onClick={props.onClick}>{props.val}</button>
	)
}