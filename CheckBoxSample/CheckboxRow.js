import React from 'react';
import PropTypes from 'prop-types';
import styles from './CheckboxRow.scss';


const CheckboxRow = ( { label, isChecked, onChangeCallback, isReadOnly } ) => {

    const getStyleClassNames = isReadOnly => {
        let stylesString = styles.InputBlock;
        if ( isReadOnly ) {
            stylesString += ' ' + styles[ 'InputBlock--Disabled' ];
        }
        return stylesString;
    };

    return (
        <label className={getStyleClassNames( isReadOnly )}>
            <span>{label}</span>
            <div className={styles.CheckboxContainer}>
                <input
                    type="checkbox"
                    name={label}
                    className={styles.RadioInput}
                    checked={isChecked}
                    onChange={isReadOnly ? undefined : onChangeCallback}
                    disabled={isReadOnly}
                    readOnly={isReadOnly}
                />
                {/*<span className={styles.Radio}/>
                <span className={styles.RadioCheck}/>*/}
                <span className={styles.Radio}>
                    <span className={styles.RadioCheck}/>
                </span>

            </div>
        </label>
    );
};

CheckboxRow.defaultProps = {
    isReadOnly: false,
};

CheckboxRow.propTypes = {
    label: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    isReadOnly: PropTypes.bool,
    onChangeCallback: PropTypes.func.isRequired,
};

export default CheckboxRow;
