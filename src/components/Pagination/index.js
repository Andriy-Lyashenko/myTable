import React from "react"
import "./style.css"
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

class Pagination extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            countPerPage: '10'
        }

        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(countPerPage){
        console.log(countPerPage)
        this.setState({countPerPage})
        this.props.handleChange(countPerPage)
    }
    

    render() {
        return(
            <div className="pagination" >
                <ul>
                    {
                        renderPages(this.props.count).map((link, index) => <li key={index} onClick={ () => this.props.switchTo(link)}>
                            {index + 1}
                        </li>)
                    }
                       
                </ul>
    
                   <TextField
                        onChange={(event) => this.handleChange(event.target.value)}
                        select
                        label="Select"
                        helperText="Please select your currency"
                        value={this.state.countPerPage}
                        
                        >
                        {['10', '20', '50'].map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
            </TextField>
            </div>
        )
    }

}

export default Pagination

const renderPages = count => {
    const arr = [];

    for(let i = 1; i <= count; i++) {
        arr.push('/messages?page='+i);
    }

    return arr;
}