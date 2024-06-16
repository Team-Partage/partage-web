import { merge } from 'lodash';
import qs from 'qs';

type FetcherRequestInit = Omit<RequestInit, 'method'>;

type Config = {
  baseURL?: string;
  defaultRequestInit?: FetcherRequestInit;
};

class Fetcher {
  private baseURL: string | URL | undefined;
  private defaultRequestInit: FetcherRequestInit | undefined;

  constructor(config?: Config) {
    this.baseURL = config?.baseURL;
    this.defaultRequestInit = config?.defaultRequestInit;
  }

  async get<T>(endpoint: string, params: object): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      if (params) {
        url.search = qs.stringify(params);
      }

      const res = await fetch(url, {
        ...this.defaultRequestInit,
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error(`HTTP ERROR status: ${res.status}`);
      }

      const data: T = await res.json();

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post<T>(endpoint: string, params: object, options?: FetcherRequestInit): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      let requestInit = this.defaultRequestInit;

      if (options) {
        requestInit = merge(this.defaultRequestInit, options);
      }

      const res = await fetch(url, {
        ...requestInit,
        method: 'POST',
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        throw new Error(`HTTP ERROR status: ${res.status}`);
      }

      const data: T = await res.json();

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async put<T>(endpoint: string, params: object, options: FetcherRequestInit): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      let requestInit = this.defaultRequestInit;

      if (options) {
        requestInit = merge(this.defaultRequestInit, options);
      }

      const res = await fetch(url, {
        ...requestInit,
        method: 'PUT',
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        throw new Error(`HTTP ERROR status: ${res.status}`);
      }

      const data: T = await res.json();

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async patch<T>(endpoint: string, params: object, options?: FetcherRequestInit): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      let requestInit = this.defaultRequestInit;

      if (options) {
        requestInit = merge(this.defaultRequestInit, options);
      }

      const res = await fetch(url, {
        ...requestInit,
        method: 'PATCH',
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        throw new Error(`HTTP ERROR status: ${res.status}`);
      }

      const data: T = await res.json();

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async delete<T>(endpoint: string): Promise<T> {
    try {
      const url = new URL(endpoint, this.baseURL);

      const res = await fetch(url, {
        ...this.defaultRequestInit,
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`HTTP ERROR status: ${res.status}`);
      }

      const data: T = await res.json();

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected handleError(error: unknown) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
    return Promise.reject(error);
  }
}

export const fetcher = new Fetcher({
  baseURL: 'http://localhost:9090',
  defaultRequestInit: { headers: { 'Content-Type': 'application/json' } },
});
