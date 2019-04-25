import React from "react"
import TextField from '@material-ui/core/TextField';


const SearchLine = (props)=>{
    return (
        <div>
           <TextField
        id="standard-search"
        label="Search"
        type="search"
        className="search_class"
        margin="normal"
            />
        </div>
    )

}


export default SearchLine
