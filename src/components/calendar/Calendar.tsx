import { useContext, useEffect } from "react";
import LibCalendar from "react-calendar";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

import "react-calendar/dist/Calendar.css";
import "./calendar.scss";

function Calendar() {
	const { calendarDate, setCalendar } = useContext(AppointmentContext);

	useEffect(() => {
		setCalendar(null);
	}, []);

	return (
		<div className="calendar">
			<LibCalendar
				value={calendarDate}
				onChange={setCalendar}
				selectRange
			/>
			<button
				className="calendar__reset"
				disabled={
					Array.isArray(calendarDate) &&
					calendarDate[0] &&
					calendarDate[1]
						? false
						: true
				}
				onClick={() => setCalendar(null)}
			>
				Reset
			</button>
		</div>
	);
}

export default Calendar;
