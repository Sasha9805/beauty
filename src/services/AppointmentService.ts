import dayjs from "dayjs";
import { useHttp } from "../hooks/http.hook";
import hasRequiredFields from "../utils/hasRequiredFields";

import type {
	IAppointment,
	ActiveAppointment,
} from "../shared/interfaces/appointment.interface";

const requiredFields = ["id", "date", "name", "service", "phone", "canceled"];

const useAppointmentService = () => {
	const _apiBase = "http://localhost:3001/appointments";

	const { loadingStatus, request } = useHttp();

	const getAllAppointments = async (): Promise<IAppointment[]> => {
		const res = await request({ url: _apiBase });

		if (
			res.every((item: IAppointment) =>
				hasRequiredFields(item, requiredFields)
			)
		) {
			return res;
		}

		throw new Error("Data does not have all the fields");
	};

	const getAllActiveAppointments = async () => {
		const base = await getAllAppointments();

		const transformed: ActiveAppointment[] = base
			.filter(
				(item) =>
					!item.canceled &&
					dayjs(item.date).diff(undefined, "minute") > 0
			)
			.map((item) => {
				return {
					id: item.id,
					date: item.date,
					name: item.name,
					service: item.service,
					phone: item.phone,
				};
			});
		// const transformed: ActiveAppointment[] = base
		// 	.filter(
		// 		(item) =>
		// 			!item.canceled && dayjs(item.date).diff(undefined, "minute")
		// 	)
		// 	.map(({ canceled, ...rest }) => rest);

		return transformed;
	};

	return {
		loadingStatus,
		getAllAppointments,
		getAllActiveAppointments,
	};
};

export default useAppointmentService;
