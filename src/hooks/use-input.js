import { useState } from "react";

const useInput = (defaultValue, validateValue) => {
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);

    // This is true when an error should be displayed to the user
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = event => {
        setEnteredValue(event.target.value);
    };

    const inputBlurHandler = () => {
        // User has focused on input and now removes focus.
        // => Set is touched true
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue(defaultValue);
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }
};

export default useInput;