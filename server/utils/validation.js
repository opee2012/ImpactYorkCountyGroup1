/**
 * Validates input in reference to mongoose schema
 * @param {*} validationError
 * @returns {string} Returns error message string
 */
exports.getValidationErrorMessage = function(validationError) {
    try {
        const errorMessages = {};
        let errorMsg = '';
        for (const field in validationError.errors) {
            errorMessages[field] = validationError.errors[field].message;
            errorMsg += ("\n" + errorMessages[field]);
            console.log(errorMessages[field]);
        }
        return errorMsg;
    } catch (error) {
        throw new Error(error.message);
    }
};