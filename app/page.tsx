'use client'

import { login, signUp } from '@/app/lib/actions'
import { useState } from 'react'
export default function Page() {
	const [state, setState] = useState<string>('Login')

	const handleSubmit = (value: FormData) => {
		if (state == 'Login') {
			login(value)
		} else {
			signUp(value)
		}
	}

	const handleState = () => {
		if (state == 'Login') {
			setState('Sign up')
		} else {
			setState('Login')
		}
	}
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						{state} to your account
					</h2>
				</div>
				<form className="space-y-6">
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Username
						</label>
						<div className="mt-2">
							<input
								id="username"
								name="email"
								type="email"
								autoComplete="username"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							formAction={handleSubmit}
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-gray shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							{state}
						</button>
					</div>
				</form>
				<p className="mt-10 text-center text-sm text-gray-500">
					OR
					<br />
					<a
						href="#"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						onClick={handleState}
					>
						{state == 'Login' ? 'Create new account' : 'Login'}
					</a>
				</p>
			</div>
		</div>
	)
}
