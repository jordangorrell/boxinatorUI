import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import useInput from '../../hooks/use-input';
import actionTypes from '../../store/actionTypes';
import urlExtensions from '../../routing/urlExtensions';

import styles from './styles/AddBoxForm.module.css'
import API_BASE_URL from '../../store/baseURL';
import Loader from '../UI/Loader';

const isNotEmptyString = str => {
    return str.trim() !== '';
}

const stringNumValueIsGreaterThanZero = str => {
    return +str >= 0;
}

const isValidColor = str => {
    // Should be HEX Color of length 7.
    if (str.trim().length !== 7) {
        return false;
    }

    // If last two digits (blue digits) of HEX Color are not 00, return false.
    const blue = str.substring(5);
    return blue === '00';
}

const AddBoxForm = () => {
    const dispatch = useDispatch();
    const [isProcessingRequest, setIsProcessingRequest] = useState(false);

    // Name Field
    const {
        value: enteredName,
        isValid: isValidEnteredName,
        hasError: showNameFieldError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName
    } = useInput('', isNotEmptyString);

    // Weight Field
    const {
        value: enteredWeight,
        isValid: isValidEnteredWeight,
        hasError: showWeightFieldError,
        valueChangeHandler: weightChangeHandler,
        inputBlurHandler: weightBlurHandler,
        reset: resetWeight
    } = useInput(0, stringNumValueIsGreaterThanZero);

    // Color Field
    const {
        value: enteredColor,
        isValid: isValidEnteredColor,
        hasError: showColorFieldError,
        valueChangeHandler: colorChangeHandler,
        inputBlurHandler: colorBlurHandler,
        reset: resetColor
    } = useInput('', isValidColor);

    // Country Field
    const {
        value: enteredCountry,
        isValid: isValidEnteredCountry,
        hasError: showCountryFieldError,
        valueChangeHandler: countryChangeHandler,
        inputBlurHandler: countryBlurHandler,
        reset: resetCountry
    } = useInput('', isNotEmptyString);

    const resetForm = () => {
        resetName();
        resetWeight();
        resetColor();
        resetCountry();
    }

    const addNewBoxHandler = event => {
        event.preventDefault();
        
        setIsProcessingRequest(true);

        const newBox = {
            name: enteredName,
            weight: +enteredWeight,
            color: enteredColor,
            countryCode: enteredCountry
        };

        fetch(`${API_BASE_URL}/addbox`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newBox)
        })
        .then(response => response.json()
            .then(newBox => {
                dispatch({ type: actionTypes.ADD_BOX, newBox }) 
                resetForm();
            }))
        .finally(() => setIsProcessingRequest(false))
    }

    const buttonDisabled = 
        !isValidEnteredName || 
        !isValidEnteredWeight || 
        !isValidEnteredColor || 
        !isValidEnteredCountry;

    const nameFieldStyles = showNameFieldError ? styles.invalid : '';
    const weightFieldStyles = showWeightFieldError ? styles.invalid : '';
    const colorFieldStyles = showColorFieldError ? styles.invalid : '';
    const countryFieldStyles = showCountryFieldError ? styles.invalid : '';

    return (
            <div className={styles.container}>
                <div className={styles['form-wrapper']}>
                    <h1>Add a Box</h1>
                    <form className={styles.form} onSubmit={addNewBoxHandler}>
                        <div className={styles['form-field']}>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                className={nameFieldStyles} 
                                type="text" 
                                value={enteredName} 
                                onChange={nameChangeHandler} 
                                onBlur={nameBlurHandler} 
                            />
                            {showNameFieldError && <p className={styles['error-text']}>Name is required</p>}
                        </div>
                        <div className={styles['form-field']}>
                            <label htmlFor="weight">Weight</label>
                            <input
                                id="weight"
                                className={weightFieldStyles} 
                                type="number" 
                                placeholder='Weight' 
                                value={enteredWeight} 
                                onChange={weightChangeHandler} 
                                onBlur={weightBlurHandler} 
                            />
                            {showWeightFieldError && <p className={styles['error-text']}>Weight must be non-negative</p>}
                        </div>
                        <div className={styles['form-field']}>
                            <label htmlFor="color">Box Color</label>
                            <input 
                                id="color"
                                className={colorFieldStyles} 
                                type="color" 
                                placeholder='Box colour' 
                                value={enteredColor} 
                                onChange={colorChangeHandler} 
                                onBlur={colorBlurHandler} 
                            />
                            {showColorFieldError && <p className={styles['error-text']}>Color is required and must contain no shade of blue.</p>}
                        </div>
                        <div className={styles['form-field']}>
                            <label htmlFor="country">Country</label>
                            <select 
                                id="country"
                                className={countryFieldStyles} 
                                value={enteredCountry} 
                                onChange={countryChangeHandler} 
                                onBlur={countryBlurHandler}
                            >
                                <option></option>
                                <option value="SWE">Sweden</option>
                                <option value="CHN">China</option>
                                <option value="BRA">Brazil</option>
                                <option value="AUS">Australia</option>
                                {/* Country values are IBAN Alpha-3 Codes: https://www.iban.com/country-codes */}
                            </select>
                            {showCountryFieldError && <p className={styles['error-text']}>Country is required</p>}
                        </div>
                        <button type='submit' disabled={buttonDisabled}>{isProcessingRequest ? <Loader size={15} color="#CCC" /> : 'Add Box' }</button>
                    </form>
                </div>
                <Link to={urlExtensions.LIST_BOXES}>Dispatches</Link>
            </div>
    );
};

export default AddBoxForm;