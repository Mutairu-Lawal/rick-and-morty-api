import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export async function getCharacters(page = 1, name = '') {
  const res = await api.get('/character', { params: { page, name } });
  return res.data;
}

export async function getCharacter(id: string) {
  const res = await api.get(`/character/${id}`);
  return res.data;
}
