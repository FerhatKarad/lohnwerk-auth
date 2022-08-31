import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'


export default function Login() {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(undefined)

	const navigate = useNavigate()
	const { loginUser } = useContext(AuthContext)

	const handleEmail = e => setEmail(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password }

		axios.post('/auth/login', requestBody)
			.then(response => {

				const token = response.data.authToken
				loginUser(token)
				navigate('/dashboard')
			})
			.catch(err => {
				const errorDescrition = err.response.data.message
				setErrorMessage(errorDescrition)
			})
	}

	return (
		<>
			<section className="hero has-background-grey-light is-fullheight is-fullwidth">
				<div className="hero-body">
					<div className="container">
						<div className="columns is-centered">
							<div className="column is-4-desktop">
								<form onSubmit={handleSubmit} className="box">
									<p className="has-text-centered"></p>
									<div className="field mt-5">
										<label className="label">Email or Name</label>
										<div className="controls">
											<input type="text" className="input" placeholder="Username" value={email} onChange={handleEmail} />
										</div>
									</div>
									<div className="field mt-5">
										<label className="label">Password</label>
										<div className="controls">
											<input type="password" className="input" placeholder="******" value={password} onChange={handlePassword} />
										</div>
									</div>
									<div className="field mt-5">
										<button className="button is-success is-fullwidth">Login</button>
										{errorMessage && <p className='signup-message'>{errorMessage}</p>}
										<p className='signup-message'>Don´t have an account?</p>
										<Link className='link-signuptologin' to='/signup'>Signup</Link>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}



