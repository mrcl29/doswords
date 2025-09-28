type HttpMethod = 'POST';

interface ApiCallOptions {
    method?: HttpMethod;
    headers?: Record<string, string>;
    params?: Record<string, string | number>;
    body?: any; // Puede ser objeto o string
    timeout?: number; // en milisegundos
}

interface ApiResponse<T = any> {
    status: number;
    success: boolean;
    data?: T;
    error?: string;
}

export default async function callApi<T = any>(url: string, options: ApiCallOptions = {}): Promise<ApiResponse<T>> {
    const {
        method = 'POST',
        headers = {},
        params,
        body,
        timeout = 100000
    } = options;

    let fullUrl = url;

    // Agregar parámetros a la URL si existen
    if (params) {
        const query = new URLSearchParams();
        for (const key in params) {
            query.append(key, String(params[key]));
        }
        fullUrl += `?${query.toString()}`;
    }

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(fullUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: body && typeof body === 'object' ? JSON.stringify(body) : body,
            signal: controller.signal
        });

        clearTimeout(id);

        const contentType = response.headers.get('content-type');
        let data: any = null;

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        return {
            status: response.status,
            success: response.ok,
            data: response.ok ? data : undefined,
            error: response.ok ? undefined : data
        };
    } catch (err: any) {
        clearTimeout(id);
        return {
            status: 500,
            success: false,
            error: err.name === 'AbortError' ? 'Request timed out' : err.message
        };
    }
}
