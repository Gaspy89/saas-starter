'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    })
    await signIn('credentials', { email, password })
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto mt-12">
      <h2 className="text-xl font-semibold">Create account</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
      <button type="submit">Register</button>
    </form>
  )
}
