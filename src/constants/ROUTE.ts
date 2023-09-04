export enum ROUTE {
    DASHBOARD = "/dashboard",
    OVERVIEW = ROUTE.DASHBOARD + "/overview",
    CAMERA = ROUTE.DASHBOARD + "/camera",
    EMERGENCY = ROUTE.DASHBOARD + "/emergency",
    ENTITY_MANAGEMENT = "/entity_management",
    CARS = ROUTE.ENTITY_MANAGEMENT + "/cars",
    DRIVERS = ROUTE.ENTITY_MANAGEMENT + "/drivers"
}