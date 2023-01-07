class AppError extends Error {
    constructor(
        name,
        message,
        explanation,
        statusCode
    ){
        super();
        this.name = name;
        this.message = message;
        this.statusCode =statusCode;
        this.explanation=explanation;

    }
}

module.exports=AppError;