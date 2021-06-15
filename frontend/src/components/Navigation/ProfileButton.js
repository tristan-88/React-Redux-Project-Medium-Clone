import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './Navigation.css'

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const history = useHistory()
	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	

	return (
		<div className="show-menu-container">

			<div
				onClick={openMenu}
				className="user-btn_div"
			>{"User ▼"}</div>

			{showMenu && (
				<div>
					<div>
						<div className="user-name-div">User:{user.username}</div>
						<div className="user-email-div">Email:{user.email}</div>
						
					</div>
				</div>
			)}
		</div>
	);
}

export default ProfileButton;
