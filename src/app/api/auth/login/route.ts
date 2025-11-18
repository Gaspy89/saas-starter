import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
        }

        // 1️⃣ Sign in the user
        const { data, error } = await supabaseServer.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            console.error('Login error:', error)
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        // 2️⃣ Return session + user info
        return NextResponse.json({
            user: data.user,
            session: data.session,
        })
    } catch (err: any) {
        console.error('Catch error:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
