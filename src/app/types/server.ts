export interface Server {
    /**
     * The URL of the server.
     */
    url: string;

    /**
     * The API path on the server.
     */
    api: string;
    
    /**
     * The headers to add to the request.
     */
    headers: { [header: string]: string };
}