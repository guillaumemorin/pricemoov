import React, { Component } from 'react';
import actions from './actions';
import {Select, Toggle} from './components';
import moment from 'moment';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.handleChangeAgencies = (event) => this.changeAgencies(event);
        this.handleChangeCategories = (event) => this.changeCategories(event);
        this.handleChangeValidated = (event) => this.changeValidated(event);
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
        this.setState({agency});
        actions.category.list(agency)
            .then((categories) => this.setState({categories}));
    }
    changeCategories(event) {
        const {agency} = this.state;
        const category = event.target.value;
        actions.price.list(agency, category)
            .then((prices) => this.setState({prices}))
    }
    changeValidated(event) {
        this.setState({checkValidation: event.target.checked});
    }
    render() {
        const {checkValidation, agencies, categories, hasError, agency, prices} = this.state;
        if(hasError) return <div>{'Something went wrong...'}</div>;
        console.log('>>>>', checkValidation)

        return (
            <div>
                <div className="header">
                    <Select options={agencies}
                            placeholder={'Select your agency'}
                            onChange={this.handleChangeAgencies} />
                    <Select options={categories}
                            placeholder={'Select your category'}
                            disabled={Boolean(!agency)}
                            onChange={this.handleChangeCategories} />
                </div>
                <div className="results-container">
                    {prices.length > 0 && <div className="results-container-row">
                        <span className="results-container-cell">Date</span>
                        <span className="results-container-cell">Price</span>
                        <span className="results-container-cell">Suggested price</span>
                    </div>}
                    {prices.map((priceData, index) => {
                        if(checkValidation && !priceData.isValidated) return null;
                        return (
                            <div className="results-container-row" key={index}>
                                <span className="results-container-cell">{moment(priceData.startDate).format("YYYY-MM-DD HH:mm:ss")}</span>
                                <span className="results-container-cell">{priceData.price}</span>
                                <span className="results-container-cell">{priceData.suggestedPrice}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="toggle-container">
                    <span className="toggle-label">{'Validated'}</span>
                    <Toggle onChange={this.handleChangeValidated}/>
                </div>
            </div>
        );
  }
}

export default App;
