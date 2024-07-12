export interface Location {

    /**
     * The city of the location.
     */
    city: string;

    /**
     * The country of the location.
     */
    country: string;

    /**
     * The coordinates of the location.
     */
    coordinates: {
        lat: number;
        lon: number;
    };
}