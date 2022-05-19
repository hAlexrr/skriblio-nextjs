import { NextResponse } from 'next/server'

export async function redirectPage(page){
    return NextResponse.redirect(page)
}