import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/auth'

export default function Navbar() {

	const [isActive, setisActive] = useState(false)
	const { isLoggedIn, logoutUser } = useContext(AuthContext)



	return (
		<nav className='navbar' role='navigation' aria-label='main navigation'>
			<div className='navbar-brand'>
				<Link to='/'>
					<img src='https://lohnwerk.com/apple-touch-icon.png?v=Gv6AbKk54q' width="80" alt="logo" />
				</Link>

				<button
					onClick={() => {
						setisActive(!isActive)
					}}
					
					className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
				>
					<span aria-hidden='true'></span>
					<span aria-hidden='true'></span>
					<span aria-hidden='true'></span>
				</button>
			</div>
			<div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
				{isLoggedIn ? (
					<div className='navbar-end'>
						<div className='navbar-item'>
							<Link to='/dashboard' className='navbar-item'>Dashboard</Link>
							<button onClick={logoutUser} className="button is-light">Log Out</button>
						</div>
					</div>
				) : (
					<div className='navbar-start'>
						<div className='navbar-item'>
							<Link to='/signup' className='navbar-item'> Signup</Link>
							<Link to='/login' className='navbar-item'>Login</Link>
						</div>
					</div>
				)}

			</div>
		</nav>
	)
}
