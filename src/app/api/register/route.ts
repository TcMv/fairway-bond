import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { parentName, childName, email, phone, childDetails } = body;

    // Log to console for now — wire up email/n8n/webhook later
    console.log('=== REGISTER INTEREST ===', {
      parentName,
      childName,
      email,
      phone,
      childDetails,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Registration received. We\'ll be in touch.',
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
