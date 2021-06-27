import styles from './styles/BoxesTable.module.css';

const BoxRow = props => {
    return (    
        <tr>
            <td>{props.name}</td>
            <td className={styles['is-number-cell']}>{props.weight}</td>
            <td style={{ backgroundColor: props.color }}></td>
            <td className={styles['is-number-cell']}>{props.shippingCost.toFixed(2)} SEK</td>
        </tr>
    );
}

export default BoxRow;