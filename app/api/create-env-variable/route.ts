import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { accessToken, teamId, projectId } = await request.json();

  if (!accessToken || !teamId || !projectId) {
    return NextResponse.json({ success: false, message: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.vercel.com/v10/projects/${projectId}/env?teamId=${teamId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'MY_API_KEY',
        value: '1fortooth',
        type: 'encrypted',
        target: ['production', 'preview', 'development'],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Environment variable created:', data);
      return NextResponse.json({ success: true, data });
    } else {
      console.error('Failed to create environment variable:', data);
      return NextResponse.json({ success: false, message: data.error || 'Failed to create environment variable' }, { status: response.status });
    }
  } catch (error) {
    console.error('Error creating environment variable:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
