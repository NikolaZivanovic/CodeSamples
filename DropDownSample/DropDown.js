import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isDataArrayValid } from 'Util/dataChecker.util';
import _noop from 'lodash/noop';
import styles from './DropDown.scss';


class DropDown extends Component {

    constructor( props ) {
        super( props );

        this.state = {
            isOpened: false,
            selectedOption: null,
        };

        if ( !props.isNullSelectionAvailable ) {
            this.state.selectedOption = props.options[ 0 ];
        }
    }

    componentDidMount() {
        document.addEventListener( 'mousedown', this.clickOutsideHandler );

        if ( !this.props.isNullSelectionAvailable ) {
            this.optionClickHandler( this.props.options[ this.props.selectedOptionIndex ] );
        }
    }

    componentWillUnmount() {
        document.removeEventListener( 'mousedown', this.clickOutsideHandler );
    }

    setWrapperRef = ( node ) => {
        this.wrapperRef = node;
    };

    clickOutsideHandler = ( event ) => {
        if ( this.wrapperRef && !this.wrapperRef.contains( event.target ) ) {
            this.closeDropDown();
        }
    };

    buttonLabelClickHandler = () => {
        this.toggleIsOpened();
    };

    toggleIsOpened = () => {
        this.setState( ( state ) => ({
            isOpened: !state.isOpened,
        }) );
    };

    closeDropDown = () => {
        this.setState( { isOpened: false } );
    };

    optionClickHandler = option => {
        this.setState( {
            selectedOption: option,
            isOpened: false,
        } );
        this.props.clickCallback( option );
    };

    getSelectedClassName = ( currentOption ) => {
        let className = '';
        if ( currentOption === this.state.selectedOption ) {
            className += ' ' + styles.DropDown__optionSelected;
        }
        return className;
    };

    render() {
        return (
            <aside className={styles.DropDown} ref={this.setWrapperRef}>

                <span className={styles.DropDown__openedState}>
                    {
                        this.state.isOpened &&
                        <i className="material-icons">arrow_drop_up</i>
                        ||
                        <i className="material-icons">arrow_drop_down</i>
                    }
                    </span>

                <button
                    className={styles.DropDown__buttonLabel}
                    onClick={this.buttonLabelClickHandler}
                >
                    {
                        ( (this.state.selectedOption && this.state.selectedOption.name) || this.state.selectedOption) ||
                        this.props.label
                    }
                    <i className={styles.DropDown__buttonLabelIcon}/>
                </button>

                {
                    this.state.isOpened &&
                    isDataArrayValid( this.props.options ) &&
                    <ul className={styles.DropDown__optionsList}>
                        {
                            this.props.isNullSelectionAvailable &&
                            <button
                                className={styles.DropDown__option + this.getSelectedClassName( null )}
                                onClick={() => this.optionClickHandler( null )}
                            >
                                {this.props.label}
                            </button>
                        }

                        {
                            this.props.options.map( option => {
                                const label = option.name || option;
                                const id = option.value || option;
                                return (
                                    <button
                                        key={id}
                                        className={styles.DropDown__option + this.getSelectedClassName( option )}
                                        onClick={() => this.optionClickHandler( option )}
                                    >
                                        {label}
                                    </button>
                                );
                            } )
                        }
                    </ul>
                }
            </aside>
        );
    }
}


DropDown.defaultProps = {
    label: 'Select...',
    options: [],
    isNullSelectionAvailable: true,
    clickCallback: _noop,
    selectedOptionIndex: 0,
};

DropDown.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array.isRequired,
    clickCallback: PropTypes.func.isRequired,
    isNullSelectionAvailable: PropTypes.bool,
    selectedOptionIndex: PropTypes.number,
};

export default DropDown;
