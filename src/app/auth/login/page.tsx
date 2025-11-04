'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await signIn('credentials', { redirect: false, email, password })
    // handle redirect or messages as needed
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto mt-12">
      <h2 className="text-xl font-semibold">Sign in</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
      <button type="submit">Sign in</button>
      <button type="button" onClick={()=>signIn('google')}>Sign in with Google</button>
    </form>
  )
}
