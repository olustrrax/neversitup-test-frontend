'use client'
import TodoForm from './todo-form'
import { createClient } from '@/utils/supabase/client'
import { signOut } from '@/app/lib/actions'
import { useState, useCallback, useEffect, useMemo } from 'react'
import { Todo } from './interface'
import TodoRemove from './todo-remove'

export default function TodoPage() {
	const supabase = createClient()
	const [todos, setTodo] = useState<Todo[]>([])
	const [selectTodo, setSelectTodo] = useState<Todo | undefined>(undefined)
	const [isOpen, setOpen] = useState<boolean>(false)

	const getTodo = useCallback(async () => {
		const { data, error, status } = await supabase
			.from('todo')
			.select(`id, title, description`)
		if (error && status !== 406) {
			throw error
		}
		if (data) {
			setTodo(data)
		}
	}, [supabase])

	useEffect(() => {
		getTodo()
	}, [getTodo])

	const onRemove = async (id: string) => {
		const { error } = await supabase.from('todo').delete().eq('id', id)
		if (error) {
			throw error
		}
		getTodo()
	}

	const onSelect = (todo: Todo) => {
		setSelectTodo(todo)
		setOpen(true)
	}

	const onCreate = () => {
		setSelectTodo(undefined)
		setOpen(true)
	}

	const handleSaveTodo = async (payload: Todo) => {
		const { error } = await supabase.from('todo').upsert(payload).select()
		if (error) {
			throw error
		}
		getTodo()
		setOpen(false)
	}
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center m-auto px-6 py-12 lg:px-8">
			{todos && todos.length > 0 ? (
				todos.map((todo) => (
					<div key={todo.id} className="relative mb-5">
						<div
							className="relative  border-2 border-black rounded-lg py-3 px-6 cursor-pointer"
							onClick={() => onSelect(todo)}
						>
							<p className="2xl">Title: {todo.title}</p>
							<p>{todo.description}</p>
						</div>
						<TodoRemove id={todo.id!} title={todo.title!} remove={onRemove} />
					</div>
				))
			) : (
				<p className="flex min-h-full justify-center m-auto">
					Empty press `Create` for add new todo
				</p>
			)}
			<TodoForm
				todo={selectTodo}
				isOpen={isOpen}
				setOpen={setOpen}
				onSave={handleSaveTodo}
			/>

			<div className="flex justify-center mt-20">
				<button onClick={onCreate} className="w-52 rounded-md text-gray-900">
					+ Create
				</button>
			</div>
			<div className="flex pt-20 justify-flex-end">
				<a className="w-full text-right text-gray-900" onClick={signOut}>
					Sign out
				</a>
			</div>
		</div>
	)
}
