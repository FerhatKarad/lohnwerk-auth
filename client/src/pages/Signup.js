import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {

	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(undefined)

	const navigate = useNavigate()

	const handleEmail = e => setEmail(e.target.value)
	const handleName = e => setName(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password, name }

		axios.post('/auth/signup', requestBody)
			.then(response => {
				navigate('/login')
			})
			.catch(error => {
				const errorDescrition = error.response.data.message
				setErrorMessage(errorDescrition)
			})
	}

	return (
		<section className="hero has-background-grey-light is-fullheight is-fullwidth">
			<div className="hero-body">
				<div className='container'>
					<div className="columns is-centered">
						<div className="column is-4-desktop">
						<form onSubmit={handleSubmit} className="box">
                                <p className="has-text-centered"></p>
                                <div className="field mt-5">
                                    <label className="label">Name</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Name"
                                            value={name} onChange={handleName} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Email" value={email} onChange={handleEmail} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={handlePassword} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Register</button>
									{errorMessage && <p className='signup-message'>{errorMessage}</p>}
                                </div>
								<p className='signup-message'>Already have an account?</p>
								<Link className='link-signuptologin' to='/login'>Login</Link>
                            </form>

						</div>
					</div>
				</div>
				</div>
		</section>
	)
}