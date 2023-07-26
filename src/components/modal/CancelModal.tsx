import { useState, useEffect, useRef, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import Portal from "../portal/Portal";
import useAppointmentService from "../../services/AppointmentService";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import "./modal.scss";

interface IModalProps {
	selectedId: number;
	isOpen: boolean;
	handleClose: (state: boolean) => void;
}

function CancelModal({ selectedId, handleClose, isOpen }: IModalProps) {
	const { getActiveAppointments } = useContext(AppointmentContext);
	const { cancelOneAppointment } = useAppointmentService();

	const nodeRef = useRef<HTMLDivElement>(null);

	const [btnDisabled, setBtnDisabled] = useState(false);
	const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);
	// const cancelStatusRef = useRef<boolean | null>(null);

	const handleCancelAppointment = (id: number) => {
		setBtnDisabled(true);
		cancelOneAppointment(id)
			.then((res) => {
				console.log(res, "done");
				setCancelStatus(true);
			})
			.catch(() => {
				console.log("error");
				setCancelStatus(false);
				setBtnDisabled(false);
			});
	};

	const closeModal = () => {
		handleClose(false);
		// if (cancelStatus || cancelStatusRef.current) {
		if (cancelStatus) {
			getActiveAppointments();
		}
	};

	const closeOnEscapeKey = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			closeModal();
		}
	};

	// useEffect(() => {
	// 	cancelStatusRef.current = cancelStatus;
	// }, [cancelStatus]);

	useEffect(() => {
		document.body.addEventListener("keydown", closeOnEscapeKey);

		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKey);
		};
	}, [cancelStatus]);
	// }, []);

	return (
		<Portal>
			<CSSTransition
				in={isOpen}
				timeout={500}
				unmountOnExit
				classNames="modal"
				nodeRef={nodeRef}
			>
				<div ref={nodeRef} className="modal">
					<div className="modal__body">
						<span className="modal__title">
							Are you sure you want to delete the appointment #
							{selectedId}?
						</span>
						<div className="modal__btns">
							<button
								className="modal__ok"
								disabled={btnDisabled}
								onClick={() =>
									handleCancelAppointment(selectedId)
								}
							>
								Ok
							</button>
							<button
								className="modal__close"
								onClick={() => closeModal()}
							>
								Close
							</button>
						</div>
						<div className="modal__status">
							{cancelStatus === null
								? null
								: cancelStatus
								? "Success"
								: "Error, please try again"}
						</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;
