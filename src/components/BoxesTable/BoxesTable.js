import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

import BoxRow from "./BoxRow";
import urlExtensions from "../../routing/urlExtensions";

import styles from './styles/BoxesTable.module.css';

const BoxesTable = () => {
    const boxes = useSelector(state => state.boxes);
    const boxListItems = boxes.map(box => 
        <BoxRow 
            key={box.id} 
            name={box.name}
            weight={box.weight}
            color={box.color}
            shippingCost={box.shippingCost}
        />
    );

    const totalCost = boxes.reduce((accumulator, box) => {
        return accumulator + box.shippingCost;
    }, 0).toFixed(2);

    const totalWeight = boxes.reduce((accumulator, box) => {
        return accumulator + box.weight
    }, 0).toFixed(2);
    
    return (
        <div className={styles['boxes-table-wrapper']}>
            <h1>Dispatches List</h1>
            <table className={styles['boxes-table']}>
                <thead>
                    <tr>
                        <th>Recipient</th>
                        <th>Weight (kg)</th>
                        <th>Box Colour</th>
                        <th>Shipping Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {boxListItems}
                </tbody>
            </table>
            <h2>Total Weight: {totalWeight} kilograms</h2>
            <h2>Total Cost: {totalCost} SEK</h2>
            <Link to={urlExtensions.ADD_BOX}>Add Box</Link>
        </div>
    );
        
};

export default BoxesTable; 