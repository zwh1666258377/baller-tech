export const getModule = async (kind: string) => {
  return fetch('http://localhost:8080/api/get-module', {
    method: 'POST',
    body: JSON.stringify({
      kind,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(r => r.json());
};
