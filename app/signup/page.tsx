"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface Project {
  id: string;
  name: string;
}

const SignupPage: React.FC = () => {
  const router = useRouter();
  const authorizationAttempted = useRef(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  useEffect(() => {
    if (authorizationAttempted.current) return;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const next = urlParams.get('next');

    if (code) {
      authorizationAttempted.current = true;
      setNextUrl(next);
      handleAuthorizationCode(code);
    }
  }, []);

  const handleAuthorizationCode = async (code: string) => {
    try {
      const response = await fetch('/api/authorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.success) {
        setAccessToken(data.data.access_token);
        setTeamId(data.data.team_id);
        setProjects(data.data.projects.map((project: any) => ({
          id: project.id,
          name: project.name,
        })));
      } else {
        console.error('Error during authorization', data.message);
      }
    } catch (error) {
      console.error('Error during authorization', error);
    }
  };

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleCreateEnvVariable = async () => {
    if (selectedProjectId && accessToken && teamId) {
      try {
        const response = await fetch('/api/create-env-variable', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken,
            teamId,
            projectId: selectedProjectId,
          }),
        });

        const data = await response.json();

        if (data.success) {
          console.log('Environment variable created successfully');
          if (nextUrl) {
            window.location.href = nextUrl;
          } else {
            router.push('/success');
          }
        } else {
          console.error('Failed to create environment variable:', data.message);
        }
      } catch (error) {
        console.error('Error creating environment variable:', error);
      }
    } else {
      console.error('Missing required information');
    }
  };

  if (projects.length === 0) {
    return <div>Loading projects...</div>;
  }

  return (
    <div>
      <h1>Select a project:</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <button onClick={() => handleProjectSelect(project.id)}>
              {project.name} {selectedProjectId === project.id ? '(Selected)' : ''}
            </button>
          </li>
        ))}
      </ul>
      {selectedProjectId && (
        <button onClick={handleCreateEnvVariable}>
          Create Environment Variable
        </button>
      )}
    </div>
  );
};

export default SignupPage;
