// Servicio API genérico que acepta cualquier tipo de datos
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
  success: boolean;
}

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T, B = any>(
    endpoint: string,
    method: string,
    body?: B,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      
      const requestOptions: RequestInit = {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      };

      if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        requestOptions.body = JSON.stringify(body);
      }

      const response = await fetch(url, requestOptions);
      let data = null;
      
      // Intentar parsear la respuesta como JSON
      try {
        if (response.status !== 204) { // No Content
          data = await response.json();
        }
      } catch (e) {
        // Si no es JSON, podría ser otro formato o vacío
        console.warn('La respuesta no es JSON válido');
      }

      return {
        data: response.ok ? data : null,
        error: response.ok ? null : (data?.message || 'Error en la petición'),
        status: response.status,
        success: response.ok
      };
    } catch (e) {
      console.error('Error en la petición:', e);
      return {
        data: null,
        error: 'Error de conexión al servidor',
        status: 0,
        success: false
      };
    }
  }

  // Métodos CRUD genéricos
  async getAll<T>(endpoint: string): Promise<ApiResponse<T[]>> {
    return this.request<T[]>(endpoint, 'GET');
  }

  async getById<T>(endpoint: string, id: string): Promise<ApiResponse<T>> {
    return this.request<T>(`${endpoint}/${id}`, 'GET');
  }

  async create<T, B = Partial<T>>(endpoint: string, data: B): Promise<ApiResponse<T>> {
    return this.request<T, B>(endpoint, 'POST', data);
  }

  async update<T, B = Partial<T>>(endpoint: string, id: string, data: B): Promise<ApiResponse<T>> {
    return this.request<T, B>(`${endpoint}/${id}`, 'PUT', data);
  }

  async patch<T, B = Partial<T>>(endpoint: string, id: string, data: B): Promise<ApiResponse<T>> {
    return this.request<T, B>(`${endpoint}/${id}`, 'PATCH', data);
  }

  async delete<T>(endpoint: string, id: string): Promise<ApiResponse<T>> {
    return this.request<T>(`${endpoint}/${id}`, 'DELETE');
  }

  // Método para peticiones personalizadas
  async custom<T, B = any>(
    endpoint: string,
    method: string,
    body?: B
  ): Promise<ApiResponse<T>> {
    return this.request<T, B>(endpoint, method, body);
  }
}

// Instancia por defecto del servicio
const apiService = new ApiService(import.meta.env.VITE_API_URL || '/api');
export default apiService; 