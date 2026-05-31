import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessName, contactName, email, phone, tier, message } = body;

    console.log('=== SPONSOR ENQUIRY ===', {
      businessName,
      contactName,
      email,
      phone,
      tier,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Enquiry received. We\'ll send sponsorship packages shortly.',
    });
  } catch (error) {
    console.error('Sponsor error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
