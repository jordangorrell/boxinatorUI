import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { HashRouter } from 'react-router-dom';
import AddBoxForm from './AddBoxForm';

// Tree to be rendered
// AddBoxForm must be wrapped in a <Router> because it contains a <Link>
const tree = <HashRouter><AddBoxForm /></HashRouter>;

// Commonly Re-used elements in tests
// Inputs
const getNameInputElement = () => screen.getByLabelText('Name');
const getWeightInputElement = () => screen.getByLabelText('Weight');
const getColorInputElement = () => screen.getByLabelText('Box Color');
const getCountrySelectElement = () => screen.getByLabelText('Country');

// Error Messages
const queryNameInputError = () => screen.queryByText('Name is required');
const queryWeightInputError = () => screen.queryByText('Weight must be non-negative');
const queryColorInputError = () => screen.queryByText('Color is required', { exact: false });
const queryCountryInputError = () => screen.queryByText('Country is required');

// Mocks
jest.mock('react-redux', () => ({
    useDispatch: jest.fn()
}));

// Test Suite
describe('AddBoxForm Component', () => {

    test('Renders form inputs', () => {
        // Arrange and Act
        render(tree);
    
        const nameInputElement = getNameInputElement();
        const weightInputElement = getWeightInputElement();
        const colorInputElement = getColorInputElement();
        const countrySelectElement = getCountrySelectElement();

        // Assert
        expect(nameInputElement).toBeInTheDocument();
        expect(weightInputElement).toBeInTheDocument();
        expect(colorInputElement).toBeInTheDocument();
        expect(countrySelectElement).toBeInTheDocument();
    });

    test('Add Form button initially disabled', () => {
        // Arrange and Act
        render(tree);
        
        const submitButtonElement = screen.getByRole('button');
    
        // Assert button disabled
        expect(submitButtonElement).toBeDisabled();
    });


    test('Add Form button not disabled when form has valid input', () => {
        // Arrange
        render(tree);

        const nameInputElement = getNameInputElement();
        const weightInputElement = getWeightInputElement();
        const colorInputElement = getColorInputElement();
        const countrySelectElement = getCountrySelectElement();

        const countryOptionElements = screen.getAllByRole('option');
        
        // Act
        // Fill out form with valid input
        userEvent.type(nameInputElement, 'test');
        userEvent.type(weightInputElement, '0');
        fireEvent.input(colorInputElement, {target: {value: "#000000"}});
        userEvent.selectOptions(countrySelectElement, countryOptionElements[1]);
    
        // Assert that button is not disabled
        const submitButtonElement = screen.getByRole('button');
        expect(submitButtonElement).not.toBeDisabled();
    });

    test('Initial render shows no form errors', () => {
        // Arrange
        render(tree);

        // Query for all error messages
        const nameInputError = queryNameInputError();
        const weightInputError = queryWeightInputError();
        const colorInputError = queryColorInputError();
        const countryInputError = queryCountryInputError();

        // Assert all error messages are null
        expect(nameInputError).toBeNull();
        expect(weightInputError).toBeNull();
        expect(colorInputError).toBeNull();
        expect(countryInputError).toBeNull();
    })

    test('Name input error displaying after input touched', () => {
        // Arrange
        render(tree);
        const nameInputElement = getNameInputElement();
        
        // Act
        // Click name input and click away
        userEvent.click(nameInputElement);
        fireEvent.blur(nameInputElement);
    
        // Assert that name input error is in DOM
        const nameInputError = queryNameInputError();
        expect(nameInputError).toBeInTheDocument();
    });

    test('Weight input error displaying after entering negative number and clicking away', () => {
        // Arrange
        render(tree);
        const weightInputElement = getWeightInputElement();

        // Act
        // Enter negative number into weight input and click away
        userEvent.type(weightInputElement, '-1');
        fireEvent.blur(weightInputElement);
    
        // Assert that weight input error is in DOM
        const weightInputError = queryWeightInputError();
        expect(weightInputError).toBeInTheDocument();
    });

    test('Color input error displaying after input touched', () => {
        // Arrange
        render(tree);
        const colorInputElement = getColorInputElement();
        
        // Act
        // Click name input and click away
        userEvent.click(colorInputElement);
        fireEvent.blur(colorInputElement);
    
        // Assert that color input error is in DOM
        const colorInputError = queryColorInputError();
        expect(colorInputError).toBeInTheDocument();
    });

    test('Country input error displaying after input touched', () => {
        // Arrange
        render(tree);
        const countrySelectElement = getCountrySelectElement();
        
        // Act
        // Click country select input and click away
        userEvent.click(countrySelectElement);
        fireEvent.blur(countrySelectElement);
    
        // Assert that country input error is in DOM
        const countryInputError = queryCountryInputError();
        expect(countryInputError).toBeInTheDocument();
    });

});