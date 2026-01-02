export class BadInputException extends Error {
    code = 400
    constructor(message) {
        super();
        this.message = message;
    }
}