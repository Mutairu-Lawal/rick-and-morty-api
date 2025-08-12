import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export async function getCharacters(page = 1, name = '', status = '') {
  const params: Record<string, string | number> = { page };
  if (name) params.name = name;
  if (status && status !== 'all') params.status = status;
  const res = await api.get('/character', { params });
  return res.data;
}

export async function getCharacter(id: string) {
  const res = await api.get(`/character/${id}`);
  return res.data;
}
