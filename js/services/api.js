const API_URL = 'http://localhost:3000';

export const api = {
    async post(endpoint, data) {
        try {
            const response = await fetch(${API_URL}${endpoint}, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            const json = await response.json();
            if (!response.ok) throw new Error(json.erro || 'Erro na requisição');
            return json;
        } catch (error) {
            throw error; 
        }
    }
};