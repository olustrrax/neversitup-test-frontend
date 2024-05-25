'use client'

import { useSearchParams } from 'next/navigation'
export default function ErrorPage() {
	const searchParams = useSearchParams()
	const message = searchParams.get('message') || ''
	return <p>Sorry, something went wrong : {message}</p>
}
