import { ActiveAppointment } from "../../shared/interfaces/appointment.interface";
import "./appointmentItem.scss";

function AppointmentItem({
	id,
	date,
	name,
	phone,
	service,
}: ActiveAppointment) {
	return (
		<div className="appointment">
			<div className="appointment__info">
				<span className="appointment__date">
					{/* Date: DD/MM/YYYY HH:mm */}
					Date: {date}
				</span>
				<span className="appointment__name">Name: {name}</span>
				<span className="appointment__service">Service: {service}</span>
				<span className="appointment__phone">Phone: {phone}</span>
			</div>
			<div className="appointment__time">
				<span>Time left:</span>
				<span className="appointment__timer">HH:mm</span>
			</div>
			<button className="appointment__cancel">Cancel</button>
			{/* <div className="appointment__canceled">Canceled</div> */}
		</div>
	);
}

export default AppointmentItem;
