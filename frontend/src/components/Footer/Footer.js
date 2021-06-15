import React from "react";
import "./Footer.css";

function Footer() {
	return (
		<>
			<div className="footer-container">
				<div className="githubLink">
					<a href="https://github.com/tristan-88" target="_blank">
						<i className="fab fa-github-alt"></i>
					</a>
				</div>
				{/* <div className="about-me-div"><h1>About Me</h1></div> */}
				<div className="linkedinLink">
					<a
						href="https://www.linkedin.com/in/tristan-san-juan-75337920b/"
						target="_blank"
					>
						<i className="fab fa-linkedin"></i>
					</a>
				</div>
				<div className="porfolio-link">
					<a href="https://tristan-88.github.io/" target="_blank">
						<i className="fas fa-user-secret"></i>
					</a>
				</div>
			</div>
		</>
	);
}

export default Footer;
