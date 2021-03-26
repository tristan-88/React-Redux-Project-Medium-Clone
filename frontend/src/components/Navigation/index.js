import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from '../LoginFormModal'
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
            <>
                <div>
                <LoginFormModal />
			
                </div>
                <div>
				<NavLink to="/signup">Sign Up</NavLink>
                </div>
			</>
		);
	}

    return (
        <div>
		<ul>
                <li>
                    <div>

				<NavLink exact to="/">
					Home
				</NavLink>
                    </div>
				{isLoaded && sessionLinks}
			</li>
		</ul>
        </div>
	);
}

export default Navigation;
