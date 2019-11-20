import React, { useState } from 'react';
import moment from "moment-timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DateComponent = props => {
	console.log(props)
	const [date, setDate] = useState(moment(props.date, "YYYYMMDD").toDate());

	function onDateChange(d) {
		setDate(d)
		props.onDateChange(d)
	}

	return(
		<div className="dateWrapper">
			<DatePicker
				selected={date}
				onChange={date => onDateChange(date)}
			/>
		</div>
	)
}

export default DateComponent;