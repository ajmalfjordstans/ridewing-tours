import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    // Logic to send data to Mailchimp using their API
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Add your Mailchimp API integration here
    const API_KEY = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;
    const LIST_ID = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID;
    const DATACENTER = API_KEY.split('-')[1];  // e.g., us1, us2

    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `apikey ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: response.status });
    }

    return NextResponse.json({ success: 'Successfully subscribed!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
