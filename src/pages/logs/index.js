import React from "react";
import Table from "../../components/table";
import Search from "../../components/search";
import Dialog from '../../components/dialogs/log_info';


class Logs extends React.Component{
    constructor(){
        super()
        this.state = {
            open: false,
            message: "",
            logs:[]
        }

        this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen = (info) => {
        this.setState({
          open: true,
          message: info
        });
        
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    render(){
        const {
            message,
            open
        } = this.state;

        return(
            <div className="logs_section">
                <Dialog open={open} close={this.handleClose} row={message}/>
                <Search/>
                <Table openEvent={this.handleClickOpen}/>
                
            </div>
        )
    }

}


export default Logs
