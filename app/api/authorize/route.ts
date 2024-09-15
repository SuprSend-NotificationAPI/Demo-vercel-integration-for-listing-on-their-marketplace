// app/api/authorize/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { code } = await request.json();

  const url = 'https://api.vercel.com/v2/oauth/access_token';
  const clientId = process.env.VERCEL_CLIENT_ID;
  const clientSecret = process.env.VERCEL_CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    console.error('Missing environment variables');
    return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log('Vercel OAuth response:', tokenData);

    if (!tokenResponse.ok) {
      return NextResponse.json({ success: false, message: tokenData.error || 'Failed to obtain access token' }, { status: tokenResponse.status });
    }

    const { access_token, team_id } = tokenData;

    // Fetch projects using the access token
    const projectsResponse = await fetch(`https://api.vercel.com/v9/projects?teamId=${team_id}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    const projectsData = await projectsResponse.json();
    
    if (projectsResponse.ok) {
      console.log('Fetched projects:');
      projectsData.projects.forEach((project: any) => {
        console.log(`- ${project.name} (ID: ${project.id})`);
      });

      return NextResponse.json({
        success: true,
        data: {
          access_token,
          team_id,
          projects: projectsData.projects,
        },
      });
    } else {
      console.error('Failed to fetch projects:', projectsData.error);
      return NextResponse.json({ success: false, message: projectsData.error || 'Failed to fetch projects' }, { status: projectsResponse.status });
    }
  } catch (error) {
    console.error('Error during authorization or fetching projects:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
