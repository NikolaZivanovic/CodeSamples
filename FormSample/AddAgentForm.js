import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Text, Select, Option } from 'informed';
import SpinLoader from 'Common/SpinLoader/SpinLoader';
import withTranslate from 'Common/withTranslate/withTranslate';
import AddAgentFormModules from './AddAgentFormModules';
import scrollToComponent from 'react-scroll-to-component';
import styles from './AddAgentForm.scss';
import { PROPERTY_NAMES_FOR_FORM_INPUT_GENERATOR, getEmptyStateParamsFromPropertyNamesArray } from '../AddAgent.helper';
import { removeEmptyParamsFromObject } from 'Util/data.helper';
import { getPermissionsFromRoles, createInitialRolesState, ROLES } from '../../Agent.util';
import ErrorWidget from 'Common/Error/ErrorWidget';
import { countryValidation } from 'Util/formValidation';


class AddAgentForm extends Component {

    state = {
        country_id: this.props.countries[ 0 ] && this.props.countries[ 0 ].id || '',
        ...getEmptyStateParamsFromPropertyNamesArray( PROPERTY_NAMES_FOR_FORM_INPUT_GENERATOR ),
        selectedRoles: createInitialRolesState( ROLES ),
        permissions: {},
    };

    componentDidMount() {
        scrollToComponent( this.formElement, { align: 'top' } );
    }

    componentDidUpdate( prevProps ) {
        if ( this.props.errorMessage !== prevProps.errorMessage ) {
            scrollToComponent( this.errorMessageElement );
        }

        if ( this.props.message !== prevProps.message ) {
            scrollToComponent( this.messageElement );
        }
    }

    inputChangeHandler = ( event, inputFieldName ) => {
        this.setState( {
            [ inputFieldName ]: event.currentTarget.value,
        } );
    };

    submitHandler = () => {
        const data = {
            country_id: this.state.country_id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
            email: this.state.email,
            state: this.state.state,
            zip_code: this.state.zip_code,
            city: this.state.city,
            address: this.state.address,
            address_2: this.state.address_2,
            home_telephone: this.state.home_telephone,
            mobile_telephone: this.state.mobile_telephone,
            modulePermissions: this.state.permissions,
        };

        const cleanedData = removeEmptyParamsFromObject( data );

        this.props.submitCallback( cleanedData );
    };

    countryChangeHandler( event ) {
        this.setState( {
            country_id: event.currentTarget.value,
        } );
    }

    roleRadioClickHandler = ( roleId ) => {
        this.setState( (prevState => {
            return {
                selectedRoles: {
                    ...prevState.selectedRoles,
                    [ roleId ]: {
                        ...prevState.selectedRoles[ roleId ],
                        isSelected: !prevState.selectedRoles[ roleId ].isSelected,
                    },
                }
            };
        }), () => {
            this.setState( prevState => ({
                permissions: getPermissionsFromRoles( prevState.selectedRoles ),
            }) );
        } );
    };

    render() {
        return (
            <Form className={styles.Form} onSubmit={this.submitHandler} autoComplete="off" ref={( element ) => {
                this.formElement = element;
            }}>
                {( { formState } ) => (
                    <Fragment>
                        <h1 className={styles.Title}>{this.props.translate( 'ACCOUNTS.ADD_AGENT.ACCOUNT_INFORMATION' )}</h1>

                        <input type="hidden" autoComplete="off"/>

                        {
                            (PROPERTY_NAMES_FOR_FORM_INPUT_GENERATOR).map( property => {

                                const LABEL_NAME_TRANSLATE_KEY = 'GENERAL.' + property.name.toLocaleUpperCase();
                                const PLACEHOLDER_TRANSLATE_KEY = 'PLACEHOLDERS.ENTER_' + property.name.toLocaleUpperCase();

                                return (
                                    <label className='genericFormColumn' key={property.name}>
                                        <span className='genericInputLabel'>
                                            {this.props.translate( LABEL_NAME_TRANSLATE_KEY )}
                                            {
                                                property.isRequired &&
                                                <span className={styles.Asterisk}>*</span>
                                            }
                                        </span>
                                        <Text
                                            field={property.name}
                                            autoCapitalize="off"
                                            autoComplete="off"
                                            className='genericFormInput'
                                            type="text"
                                            placeholder={this.props.translate( PLACEHOLDER_TRANSLATE_KEY )}
                                            value={this.state[ property.name ]}
                                            onChange={event => this.inputChangeHandler( event, property.name )}
                                            validateOnChange
                                            validate={property.validation}
                                        />
                                        {
                                            formState.errors[ property.name ] &&
                                            <ErrorWidget errorMessage={formState.errors[ property.name ]}/>
                                        }
                                    </label>
                                );
                            } )
                        }

                        {
                            this.props.countries &&
                            <label className='genericFormColumn'>
                                <span className='genericInputLabel'>
                                    {this.props.translate( 'GENERAL.COUNTRY' )}
                                    <span className={styles.Asterisk}>*</span>
                                </span>
                                <Select className='genericFormInput'
                                        field='country'
                                        name='country'
                                        value={this.state.country_id}
                                        onChange={event => this.countryChangeHandler( event )}
                                        validateOnChange
                                        validate={countryValidation}
                                >
                                    <Option value='' disabled>Select a country</Option>
                                    {
                                        this.props.countries.map( country => (
                                            <Option key={country.id} value={country.id}>{country.name}</Option>
                                        ) )
                                    }
                                </Select>
                                {
                                    formState.errors.country &&
                                    <ErrorWidget errorMessage={formState.errors.country}/>
                                }
                            </label>
                        }

                        <aside>
                            <h2>{this.props.translate( 'FORMS.ADD_AGENT.SET_ROLE_PER_MODULE' )}:</h2>
                            <AddAgentFormModules
                                roleClickCallback={this.roleRadioClickHandler}
                                data={this.state.selectedRoles}
                            />
                        </aside>

                        {
                            this.props.isLoading &&
                            <label className='formRow formRow--submit'>
                                <SpinLoader/>
                            </label>
                            ||
                            <Fragment>
                                <input
                                    className='btn btn--blue-submit'
                                    type="submit"
                                    value={this.props.translate( 'FORMS.ADD_AGENT.ADD_AGENT' )}
                                />
                                <button
                                    type="button"
                                    onClick={this.props.history.goBack}
                                    className='btn btn--back'>
                                    {this.props.translate( 'GENERAL.BACK' )}
                                </button>
                            </Fragment>
                        }

                        {
                            this.props.errorMessage &&
                            <div className={styles.Error}
                                 ref={( element ) => {
                                     this.errorMessageElement = element;
                                 }}>
                                {this.props.errorMessage}
                            </div>
                        }

                        {
                            this.props.message &&
                            <div className={styles.RegularMessage}
                                 ref={( element ) => {
                                     this.messageElement = element;
                                 }}>
                                {this.props.message}
                            </div>
                        }
                    </Fragment>
                )}
            </Form>
        );
    }
}

AddAgentForm.propTypes = {
    submitCallback: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
    message: PropTypes.string,
    history: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
    countries: PropTypes.array.isRequired,
};

export default withTranslate( AddAgentForm );
