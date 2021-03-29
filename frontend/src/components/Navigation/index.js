import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import * as sessionActions from '../../store/session'
import LoginFormModal from '../LoginFormModal'
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onClick = () => dispatch(sessionActions.demoLogin());

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
            <div>
                <div>
                	<LoginFormModal />
                </div>
				<div>
					<button>
					<NavLink to="/signup">Sign Up</NavLink>	
					</button>
					
				</div>
				<div>
					<button>
					<NavLink to='/' onClick={onClick}>Demo Login</NavLink>	
					</button>
					
				</div>
			</div>
		);
	}

    return (
        <div className="nav-link_div">
			<ul>
				<li>
					<div>
						<NavLink exact to="/">Home</NavLink>
                    </div>
				{isLoaded && sessionLinks}
				</li>
			</ul>
        </div>
	);
}

export default Navigation;
