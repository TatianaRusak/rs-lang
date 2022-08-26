import { IUser } from './types/interfaces';
import { Word } from './types/Word';
import { baseUrl } from './utils/constants';

class Api {
  baseUrl: string;

  users: string;

  signIn: string;

  words: string;

  constructor() {
    this.baseUrl = baseUrl;
    this.users = `${this.baseUrl}/users`;
    this.signIn = `${this.baseUrl}/signin`;
    this.words = `${this.baseUrl}/words`;
  }

  async createUser(user: IUser): Promise<Response> {
    const response: Response = await fetch(`${this.users}`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }

  async getUser(id: string): Promise<Response> {
    const response: Response = await fetch(`${this.users}/${id}`, {
      method: 'GET',
    });
    return response;
  }

  async signInUser(user: IUser): Promise<Response> {
    const response: Response = await fetch(`${this.signIn}`, {
      method: 'POST',
      body: JSON.stringify({ email: user.email, password: user.password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }

  async deleteUser(id: string): Promise<Response> {
    const response: Response = await fetch(`${this.users}/${id}`, {
      method: 'DELETE',
    });
    return response;
  }

  async getWords(group: number, page: number): Promise<Word[]> {
    try {
      const responce = await fetch(`${this.words}?group=${group}&page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const cards = await responce.json();
      return cards;
    } catch {
      throw new Error();
    }
  }

  async getWordsForLevel(group: number): Promise<Word[]> {
    try {
      const responce = await fetch(`${this.words}?group=${group}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const cards = await responce.json();
      return cards;
    } catch {
      throw new Error();
    }
  }

  async getOneWord(id: number): Promise<Word> {
    try {
      const responce = await fetch(`${this.words}/${id}`);
      const card = await responce.json();
      return card;
    } catch {
      throw new Error();
    }
  }
}

export default Api;
