import React from "react";

function Navbar() {
	return (
		<nav className="bg-indigo-800 text-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-xl font-bold">MyApp</div>
				<ul className="flex space-x-4">
					<li>
						<a href="#home" className="hover:text-gray-300">
							Home
						</a>
					</li>
					<li>
						<a href="#about" className="hover:text-gray-300">
							About
						</a>
					</li>
					<li>
						<a href="#services" className="hover:text-gray-300">
							Services
						</a>
					</li>
					<li>
						<a href="#contact" className="hover:text-gray-300">
							Contact
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;