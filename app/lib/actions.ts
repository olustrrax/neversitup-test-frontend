'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { type NextRequest, NextResponse } from 'next/server'

export async function login(formData: FormData) {
	const supabase = createClient()

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	}

	const { error } = await supabase.auth.signInWithPassword(data)

	if (error) {
		redirect(`/error?message=${error}`)
	}

	revalidatePath('/', 'layout')
	redirect('/todo')
}

export async function signUp(formData: FormData) {
	const supabase = createClient()

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	}
	const { error } = await supabase.auth.signUp(data)
	if (error) {
		redirect(`/error?message=${error}`)
	}

	revalidatePath('/', 'layout')
	redirect('/todo')
}


export async function signOut() {
  const supabase = createClient()

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()
	console.log(user)
  if (user) {
    await supabase.auth.signOut()
  }

  revalidatePath('/', 'layout')
	redirect('/')
}