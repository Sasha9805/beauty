import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

interface IPortalProps {
	children: React.ReactNode;
	wrapperId?: string;
}

function createWrapperAndAppendToBody(wrapperId: string) {
	const wrapperElement = document.createElement("div");
	wrapperElement.id = wrapperId;
	document.body.append(wrapperElement);
	return wrapperElement;
}

function Portal({ children, wrapperId = "portal-wrapper" }: IPortalProps) {
	const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
		null
	);

	useLayoutEffect(() => {
		let element = document.getElementById(wrapperId);
		let created = false;

		if (!element) {
			element = createWrapperAndAppendToBody(wrapperId);
			created = true;
		}
		setWrapperElement(element);

		return () => {
			if (created) {
				element?.remove();
			}
		};
	}, [wrapperId]);

	if (wrapperElement === null) return null;

	return createPortal(children, wrapperElement);
}

export default Portal;
