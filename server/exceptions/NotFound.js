export class NotFoundException extends Error {
    code = 404
    constructor(message) {
        super();
        this.message = message;
    }
}