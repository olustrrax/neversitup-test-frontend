'use client'

import { useEffect, useState, useCallback, FormEventHandler } from 'react'
import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import { Todo } from './interface'

interface Prop {
	todo: Todo | undefined
	isOpen: boolean
	setOpen: (state: boolean) => void
	onSave: (value: Todo) => void
}
export default function TodoForm({ todo, isOpen, setOpen, onSave }: Prop) {
	const [id, setId] = useState<string | undefined>(undefined)
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const onClear = useCallback(() => {
		setId(undefined)
		setTitle('')
		setDescription('')
	}, [])

	useEffect(() => {
		if (todo) {
			setId(todo?.id)
			setTitle(todo.title)
			setDescription(todo.description)
		} else {
			onClear()
		}
	}, [onClear, todo])

	const validateForm = () => {
		onSave({
			id,
			description,
			title,
		})
		onClear()
	}

	return (
		<Transition show={isOpen}>
			<Dialog className="relative z-10" onClose={setOpen}>
				<TransitionChild
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</TransitionChild>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<TransitionChild
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div className="flex w-full bg-white px-4 pb-4 pt-5">
									<form className="w-full" onSubmit={validateForm}>
										<div className="w-full justify-center">
											<label
												htmlFor="title"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												Title
											</label>
											<div className="m-2">
												<input
													id="title"
													name="title"
													type="text"
													value={title}
													onChange={(e) => setTitle(e.target.value)}
													required
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>

										<div>
											<div className="flex items-center justify-between">
												<label
													htmlFor="description"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Description
												</label>
											</div>
											<div className="m-2">
												<textarea
													id="description"
													name="description"
													value={description}
													onChange={(e) => setDescription(e.target.value)}
													required
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>
										<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
											<button
												type="submit"
												className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-grey-500 sm:ml-3 sm:w-auto"
											>
												{id ? 'Edit' : 'Create'}
											</button>
											<button
												type="button"
												className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
												onClick={() => setOpen(false)}
												data-autofocus
											>
												Cancel
											</button>
										</div>
									</form>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}
