// NavigationHeader.js
import React from "react";
import { Link } from 'react-router-dom';
import './Main.css';

function NavigationHeader({ path }) {
	return (
		<header className="main-header">
			<nav className="main-header__nav">
				<ul className="main-header__item-list">
					<li className="main-header__item">
						<Link className={path === "/flashLoan" ? "active" : ""} 
						to="/flashLoan">
							FlashLoan
						</Link>
					</li>
					{/* Add other navigation items following the same structure */}
					<li className="main-header__item">
						<Link className={path === "/flashLoanArbitrage" ? "active" : ""} 
						to="/flashLoanArbitrage">
							FlashLoanArbitrage
						</Link>
					</li>
					<li className="main-header__item">
						<Link className={path === "/dex" ? "active" : ""} 
						to="/dex">
							DEX 
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default NavigationHeader;
