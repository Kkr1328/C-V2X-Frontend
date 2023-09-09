export enum ROUTE {
    DASHBOARD = "/dashboard",
    OVERVIEW = ROUTE.DASHBOARD + "/overview",
    CAMERA = ROUTE.DASHBOARD + "/camera",
    EMERGENCY = ROUTE.DASHBOARD + "/emergency",
    HEARTBEAT = ROUTE.DASHBOARD + "/heartbeat",
    ENTITY_MANAGEMENT = "/entity_management",
    CARS = ROUTE.ENTITY_MANAGEMENT + "/cars",
    DRIVERS = ROUTE.ENTITY_MANAGEMENT + "/drivers",
    CAMERAS = ROUTE.ENTITY_MANAGEMENT + "/cameras",
    RSUS = ROUTE.ENTITY_MANAGEMENT + "/rsus",
}