import { useEffect, useContext } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import AppointmentItem from "../appointmentItem/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function HistoryList() {
	const {
		getAppointments,
		appointmentLoadingStatus,
		allAppointments,
		calendarDate,
	} = useContext(AppointmentContext);

	useEffect(() => {
		getAppointments();
	}, [calendarDate]);

	if (appointmentLoadingStatus === "loading") {
		return <Spinner />;
	} else if (appointmentLoadingStatus === "error") {
		return (
			<>
				<Error />
				<button className="schedule__reload" onClick={getAppointments}>
					Try it again
				</button>
			</>
		);
	}

	const sortedAppointments = [...allAppointments].sort((item1, item2) =>
		new Date(item1.date).getTime() > new Date(item2.date).getTime() ? 1 : -1
	);

	return (
		<>
			{sortedAppointments.length === 0 ? (
				<h2 className="no-data">No data to display</h2>
			) : null}
			{sortedAppointments.map((item) => (
				<AppointmentItem key={item.id} {...item} />
			))}
		</>
	);
}

export default HistoryList;
