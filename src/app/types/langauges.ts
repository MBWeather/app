export interface Langauges {
    /**
     * The default language for the app.
     */
    default: string;

    /**
     * The available languages for the app.
     */
    available: Language[];
}

export interface Language {
    /**
     * The short code for the language.
     * @example en
     */
    short: string;

    /**
     * The full name of the language.
     * @example English
     */
    name: string;
}