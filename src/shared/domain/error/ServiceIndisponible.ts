export default class ServiceIndisponible extends Error {
    constructor() {
        super('Service indisponible');
    }
}