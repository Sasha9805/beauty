import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useHttp } from "../hooks/http.hook";
import hasRequiredFields from "../utils/hasRequiredFields";

import type {
	IAppointment,
	ActiveAppointment,
} from "../shared/interfaces/appointment.interface";

dayjs.extend(customParseFormat);

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

	const cancelOneAppointment = async (id: number) => {
		return request({
			url: `${_apiBase}/${id}`,
			method: "PATCH",
			body: JSON.stringify({ canceled: true }),
		});
	};

	const createNewAppointment = async (body: IAppointment) => {
		const id = new Date().getTime();
		body.id = id;
		body.date = dayjs(body.date, "DD/MM/YYYY HH:mm").format(
			"YYYY-MM-DDTHH:mm"
		);
		return request({
			url: _apiBase,
			method: "POST",
			body: JSON.stringify(body),
		});
	};

	return {
		loadingStatus,
		getAllAppointments,
		getAllActiveAppointments,
		cancelOneAppointment,
		createNewAppointment,
	};
};

export default useAppointmentService;
