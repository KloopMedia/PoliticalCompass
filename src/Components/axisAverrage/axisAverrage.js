import React from "react";
import "../../App.css";

export default function AllAxisAverrage(props) {
	const [value, setValue] = React.useState(false)
	const index = props.index

	const handleChange = (event) => {
		setValue(event.target.checked)
		props.returnAxisName(event.target.checked, index)
	}



	return (
		<div className="axisItem">
			<p><b>{parseFloat(props.axisAverrage).toFixed(2)}</b></p>
			<p>{props.axisName}</p>
		</div>
	)
}
