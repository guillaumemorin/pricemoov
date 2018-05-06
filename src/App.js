import React, { Component } from 'react';
import actions from './actions';
import {Select, Toggle} from './components';
import moment from 'moment';
import './App.css';

export default class App extends Component {
    constructor(props){
        super(props);
        this.handleChangeAgencies = (event) => this.changeAgencies(event);
        this.handleChangeCategories = (event) => this.changeCategories(event);
        this.handleChangeCheckValidation = (event) => this.changeCheckValidationStatus(event);
        this.state = {
            checkValidation: false,
            prices: [],
            agency: null,
            agencies: [],
            categories: []
        }
    }
    componentWillMount(){
        actions.agency.list()
            .then((agencies) => this.setState({agencies}))
    }
    componentDidCatch() {
        this.setState({hasError: true});
    }
    changeAgencies(event) {
        const agency = event.target.value;
        this.setState({agency, category: null, prices: []});
        actions.category.list(agency)
            .then((categories) => this.setState({categories}));
    }
    changeCategories(event) {
        const {agency} = this.state;
        const category = event.target.value;
        this.setState({agency, category});
        actions.price.list(agency, category)
            .then((prices) => this.setState({prices}))
    }
    changeCheckValidationStatus(event) {
        this.setState({checkValidation: event.target.checked});
    }
    render() {
        const {checkValidation, agencies, categories, hasError, agency, category, prices} = this.state;
        if(hasError) return <div>{'Something went wrong...'}</div>;
        const formattedPricesList = prices
            .filter((priceData) => !checkValidation || priceData.isValidated)
            .sort((a, b) => a.startDate - b.startDate);
        return (
            <div>
                <div className="header">
                    <Select options={agencies}
                            placeholder={'Select your agency'}
                            onChange={this.handleChangeAgencies}
                            value={agency} />
                    <Select options={categories}
                            placeholder={'Select your category'}
                            disabled={Boolean(!agency)}
                            onChange={this.handleChangeCategories}
                            value={category} />
                </div>
                <div className="results-container">
                    {formattedPricesList.length > 0 && <div className="results-container-row-header">
                        <span className="results-container-cell">Date</span>
                        <span className="results-container-cell">Price</span>
                        <span className="results-container-cell">Suggested price</span>
                    </div>}
                    {formattedPricesList
                        .map((priceData, index) => (
                            <div className="results-container-row" key={index}>
                                <span className="results-container-cell">{moment(priceData.startDate).format("YYYY-MM-DD HH:mm:ss")}</span>
                                <span className="results-container-cell">{priceData.price}</span>
                                <span className="results-container-cell">{priceData.suggestedPrice}</span>
                            </div>
                        )
                    )}
                </div>
                <div className="toggle-container">
                    <span className="toggle-label">{'Validated'}</span>
                    <Toggle onChange={this.handleChangeCheckValidation}/>
                </div>
            </div>
        );
  }
}
