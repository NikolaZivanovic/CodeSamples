import React from 'react';
import PropTypes from 'prop-types';
import CheckboxRow from 'Common/CheckboxRow/CheckboxRow';
import withTranslate from 'Common/withTranslate/withTranslate';
import styles from './AddAgentFormModules.scss';


const AddAgentFormModules = ( { data, roleClickCallback, translate } ) => {
    return (
        <aside>
            {
                Object.keys( data ).map( roleId => {
                    const role = data[ roleId ];
                    return (
                        <div key={roleId} className={styles.RadioContainer}>
                            <CheckboxRow
                                label={translate( role.translationKey )}
                                isChecked={role.isSelected}
                                onChangeCallback={() => roleClickCallback( roleId )}
                            />
                        </div>
                    );
                } )
            }
        </aside>
    );
};

AddAgentFormModules.propTypes = {
    data: PropTypes.object.isRequired,
    roleClickCallback: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
};

export default withTranslate( AddAgentFormModules );
