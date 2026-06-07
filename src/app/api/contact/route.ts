import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, businessType, budget, message } = body;

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name and message are required.' },
        { status: 400 }
      );
    }

    // TODO: wire up email delivery (Resend, Nodemailer, etc.)
    console.log('[Meshly contact]', { name, businessType, budget, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request.' },
      { status: 400 }
    );
  }
}
