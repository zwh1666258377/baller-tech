const baseURL = 'http://localhost:8080';

export const getModule = async (kind: string) => {
  return fetch(baseURL + '/api/get-module', {
    method: 'POST',
    body: JSON.stringify({
      kind,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(r => r.json());
};

export const getWebsite = async () => {
  return fetch(baseURL + '/api/get-website', {
    method: 'POST',
    body: JSON.stringify({
      kind: 'website',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(r => r.json());
};
