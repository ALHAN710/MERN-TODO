/// <reference types="vite/client" />

interface ImportMetaEnv {
    // ========== RESTFUL API BASE URL ==========
    readonly VITE_API_BASE_URL: string;
    

    // ========== REACT ROUTER PATH ==========
    readonly VITE_REACT_ROUTER_TODOS: string;
    readonly VITE_REACT_ROUTER_USERS: string;
   
    // more env variables
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}