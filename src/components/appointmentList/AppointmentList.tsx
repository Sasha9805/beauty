import { useContext, useEffect } from "react";
import AppointmentItem from "../appointmentItem/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
	const {
		appointmentLoadingStatus,
		activeAppointments,
		getActiveAppointments,
	} = useContext(AppointmentContext);

	useEffect(() => {
		getActiveAppointments();
	}, []);

	if (appointmentLoadingStatus === "loading") {
		return <Spinner />;
	} else if (appointmentLoadingStatus === "error") {
		return (
			<>
				<Error />
				<button
					className="schedule__reload"
					onClick={getActiveAppointments}
				>
					Try it again
				</button>
			</>
		);
	}

	const appointmentItems = activeAppointments.map((item) => {
		return <AppointmentItem key={item.id} {...item} />;
	});

	return <>{appointmentItems}</>;
}

export default AppointmentList;
