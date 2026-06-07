import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

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

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Meshly <hello@meshly.pl>',
        to: process.env.CONTACT_TO_EMAIL!,
        subject: `New project inquiry${businessType ? ` — ${businessType}` : ''}`,
        text:
          `Name: ${name}\n` +
          `Business type: ${businessType || '—'}\n` +
          `Budget: ${budget || '—'}\n\n` +
          `Message:\n${message}`,
      });
    } catch (emailError) {
      console.error('[Meshly contact] Failed to send email notification:', emailError);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request.' },
      { status: 400 }
    );
  }
}
