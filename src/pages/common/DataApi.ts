const baseURL = 'http://localhost:8080';
// const baseURL = 'http://192.168.31.23:8080';

export const getModule = async (kind: string) => {
  try {
    return fetch(baseURL + '/api/get-module', {
      method: 'POST',
      body: JSON.stringify({
        kind,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(r => r.json());
  } catch (error) {
    console.log(error);
  }
};

export const getWebsite = async () => {
  try {
    return fetch(baseURL + '/api/get-website', {
      method: 'POST',
      body: JSON.stringify({
        kind: 'website',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(r => r.json());
  } catch (error) {
    console.log(error);
  }
};
