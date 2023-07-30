import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAppointmentService from "../../services/AppointmentService";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

import { IAppointment } from "../../shared/interfaces/appointment.interface";
import "./caform.scss";

interface ICAForm {
	name: string;
	service: string;
	phone: string;
	date: string;
}

const schema = yup.object({
	name: yup.string().required("Name is required"),
	service: yup.string().required("Service is required"),
	phone: yup
		.string()
		.required("Phone is required")
		.matches(
			/^\++[0-9]{1} [0-9]{3} [0-9]{3} [0-9]{3}$/,
			"Format should be +1 804 944 567"
		),
	date: yup
		.string()
		.required("Date is required")
		.matches(
			/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/,
			"Format should be DD/MM/YYYY HH:mm"
		),
});

function CAForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ICAForm>({
		mode: "onBlur",
		defaultValues: {
			date: "",
			name: "",
			service: "",
			phone: "",
		},
		resolver: yupResolver(schema),
	});

	const { createNewAppointment } = useAppointmentService();
	const { getActiveAppointments } = useContext(AppointmentContext);

	const onSubmit: SubmitHandler<ICAForm> = async (data) => {
		const appointmentData: IAppointment = {
			id: 1,
			...data,
			canceled: false,
		};
		try {
			await createNewAppointment(appointmentData);
			reset();
			getActiveAppointments();
		} catch (e) {
			alert("Error while creating new appointment");
		}
	};

	return (
		<form className="caform" onSubmit={handleSubmit(onSubmit)}>
			<div className="caform__title">Create new appointment</div>
			<label htmlFor="name">
				Name<span>*</span>
			</label>
			<input
				{...register("name")}
				type="text"
				id="name"
				placeholder="User name"
			/>
			<div className="caform__error">{errors.name?.message}</div>

			<label htmlFor="service">
				Service<span>*</span>
			</label>
			<input
				{...register("service")}
				type="text"
				id="service"
				placeholder="Service name"
			/>
			<div className="caform__error">{errors.service?.message}</div>

			<label htmlFor="phone">
				Phone number<span>*</span>
			</label>
			<input
				{...register("phone")}
				type="tel"
				id="phone"
				placeholder="+1 890 335 372"
				title="Format should be +1 804 944 567"
			/>
			<div className="caform__error">{errors.phone?.message}</div>

			<label htmlFor="date">
				Date<span>*</span>
			</label>
			<input
				{...register("date")}
				type="text"
				id="date"
				placeholder="DD/MM/YYYY HH:mm"
				title="Format should be DD/MM/YYYY HH:mm"
			/>
			<div className="caform__error">{errors.date?.message}</div>

			<button disabled={isSubmitting}>Create</button>
		</form>
	);
}

export default CAForm;
