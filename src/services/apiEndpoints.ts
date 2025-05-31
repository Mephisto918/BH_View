import ApiConfig from "../config/api";

class Api{
    private BASE_URL = ApiConfig.BASE_URL
    private PORT = ApiConfig.PORT
    private adminsEndpoint = `${this.BASE_URL}${this.PORT}/api/admins`
    private ownersEndpoint = `${this.BASE_URL}${this.PORT}/api/owners`
    private tenantsEndpoint = `${this.BASE_URL}${this.PORT}/api/tenants`
    private authEndpoint = `${this.BASE_URL}${this.PORT}/api/auth`

    public admins = {
        all: <T>()=> this._get<T>(this.adminsEndpoint),
        selectById: <T>(id: string)=> this._getById<T>(this.adminsEndpoint, id),
        create: <T, D>(data: D) => this._post<T, D>(this.adminsEndpoint, data),
        update: <T, D>(data: D) => this._update<T, D>(this.adminsEndpoint, data),
        delete: <T>(id: string) => this._delete<T>(this.adminsEndpoint, id),
    }

    public owners = {
        all: <T>()=> this._get<T>(this.ownersEndpoint),
        selectById: <T>(id: string)=> this._getById<T>(this.ownersEndpoint, id),
        create: <T, D>(data: D, debugCLI: boolean = false) => this._post<T, D>(this.ownersEndpoint,data, debugCLI),
        update: <T, D>(data: D, id: string) => this._update<T, D>(this.ownersEndpoint+`/${id}`, data),
        delete: <T>(id: string) => this._delete<T>(this.ownersEndpoint, id),
    }

    public tenants = {
        all: <T>()=> this._get<T>(this.tenantsEndpoint),
        selectById: <T>(id: string)=> this._getById<T>(this.tenantsEndpoint, id),
        create: <T, D>(data: D) => this._post<T, D>(this.tenantsEndpoint, data),
        update: <T, D>(data: D, id: string) => this._update<T, D>(this.tenantsEndpoint+`/${id}`, data),
        delete: <T>(id: string) => this._delete<T>(this.tenantsEndpoint, id),
    }

    public auth = {
        login: <T, D>(data: D) => this._login<T, D>(this.authEndpoint+`/login`, data)
    }

    // HTTP wrappers
    // has _get, _getById, _post, _update(put), _delete
    private async _get<T>(url:string): Promise<T>{
        const res = await fetch(url);
        if(!res.ok) throw new Error(`Get ${url} failed: ${res.status}`);
        
        return res.json();
    }
    private async _getById<T>(url: string, id: string): Promise<T>{
        const res = await fetch(`${url}/${id}`);
        if(!res.ok) throw new Error(`Get ${url} failed: ${res.status}`);
        return res.json();
    }

    private async _post<T, D = any>(url: string, data: D, debugCLI: boolean = true): Promise<T> {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const body = await this.isValidJSON<any>(res); // parse once

        if (!res.ok) {
            if (debugCLI) console.log(`Post ${url} failed: ${res.status}, body:`, body);
            const message = body?.message || `Post ${url} failed: ${res.status}`;
            const error = body?.error || body?.errors || null;
            const errorObj = new Error(message);
            (errorObj as any).details = error;
            throw errorObj;
        }

        return body as T;  // return the already parsed JSON
    }

    private async _update<T, D = any>(url: string, data: D): Promise<T>{
        const res = await fetch(url,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(data),
        });
        if(!res.ok) throw new Error(`Update ${url} failed: ${res.status}`);
        return res.json();
    }
    
    private async _delete<T>(url: string, id: string): Promise<T | undefined> {
        const res = await fetch(`${url}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(`DELETE ${url} failed: ${res.status}`);
        
        const text = await res.text();
        try {
            return text ? JSON.parse(text) : undefined;
        } catch {
            return undefined;
        }
    }

    private async _login<T, D>(url: string, data: D): Promise<T>{
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(data),
        });
        if(!res.ok) throw new Error(`Login ${url} failed: ${res.status}`);
        return res.json();
    }

    // helper functions
    private async isValidJSON<T>(res: Response): Promise<T | { message: string }> {
        try {
            return await res.json();
        } catch {
            return { message: 'Invalid JSON response from server.' };
        }
    }
}

export default Api;

// usage
/*
    const admins = await api.admins.all<AdminType[]>();
*/