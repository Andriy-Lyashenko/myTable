import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InfoButton from "../button"
import CountTooltip from "../CountToolTip"
import Pagination from "../Pagination"
import MessageTooltip from "../MessageTooltip"
import "./style.css"

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  head:{
    color: "white"
  },
  // table: {
  //   minWidth: 700,
  // },
  // head_row:{
  //   background: "red",
  //   padding: "0px",
  //   color: "white"
  // },
  // alignCenter:{
  //  padding:"0px",
  //  width:"20px"
  // }
});



class SimpleTable extends React.Component {
  constructor(){
      super()
      this.state={
          data:[],
          pages: 0,
          filter: defaultFilter,
          activePage: "",
          isLoaded: false,
          countPerPage: 4
      }
      this.compareBy.bind(this);
      this.sortBy.bind(this);
      this.switchTo = this.switchTo.bind(this);
      this.setFilter = this.setFilter.bind(this);
      this.handleChange = this.handleChange.bind(this)
      
  }

  componentDidMount(){
      fetch("https://7de84526-7b12-4f6b-b253-89358ae11fd0.mock.pstmn.io/messages?type=error&sort_by=count&order_by=desc&page=1").then(resp=>resp.json()).then(data=>{
          this.setState({data:data.messages, pages: data.metaInfo.pagesCount,activePage:"https://7de84526-7b12-4f6b-b253-89358ae11fd0.mock.pstmn.io/messages?page=1",isLoaded:true})
          console.log(data.messages)
          console.log(data.metaInfo)
      })
      
  }

  switchTo(link) {
    const { filter } = this.state;
    const activePage = `https://7de84526-7b12-4f6b-b253-89358ae11fd0.mock.pstmn.io${link}`;

    const params = getParams(filter);

    fetch(activePage + params).then(resp=>resp.json()).then(data=>{
          this.setState({data:data.messages, pages: data.metaInfo.pagesCount, activePage});
          console.log(data.metaInfo.pagesCount)
    })
  }

  setFilter( type ) {
    const { filter, activePage,isLoaded} = this.state;
    if(!isLoaded){
     return false
    }
    let index = null;

    const param = filter.find( (param, ind) => {
      if(param.type == type) {
        index = ind;
        return true;
      }
    });

    if(!param)
      return false;
      
      
    const newValue = switchParamFilter(param.type, param.value);

    param.value = newValue;
    filter[index] = param;

    this.setState({ filter });

    const params = getParams(filter);

    fetch(activePage + params).then(resp=>resp.json()).then(data=>{
      this.setState({data:data.messages, pages: data.metaInfo.pagesCount, activePage});
      console.log(data.metaInfo.pagesCount)
    })
  }
 
  


  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
 
  sortBy(key) {
    let arrayCopy = [...this.state.data];
    arrayCopy.sort(this.compareBy(key));
    this.setState({data: arrayCopy});
  }

  // handle change elements for table
  
  handleChange(countPerPage){
    const pageSize = "pageSize"
    this.setState({countPerPage})
    const { filter, activePage } = this.state;

    const params = getParams(filter);

    fetch(activePage + params + `&${pageSize}=`+ countPerPage).then(resp=>resp.json()).then(data=>{
      this.setState({data:data.messages, pages: data.metaInfo.pagesCount, activePage});
      console.log(data.metaInfo.pagesCount)
    })
  }
  

  render(){
   const classes = this.props.classes;
   const props = this.props;
   const {data, pages, countPerPage} = this.state;
   

    return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
              <TableCell className={classes.head_row} align="center">#</TableCell>
                <TableCell className={classes.head_row}>Message</TableCell>
                <TableCell className={classes.head_row} onClick={() => this.setFilter('sort_by')} align="right">Count</TableCell>
                <TableCell className={classes.head_row} align="right">Last occurrence</TableCell>
                <TableCell className={classes.head_row} align="right">Controller</TableCell>
                <TableCell className={classes.head_row} align="right">Endpoint</TableCell>
                <TableCell className={classes.head_row} align="right">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row,index) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell className={classes.alignCenter} align="center" >{index+1}</TableCell>
                    <TableCell className="row_message_hover">
                       {row.msg}
                       <MessageTooltip message={row.msg}/>
                    </TableCell>   
                    <TableCell className="row_hover_count" onClick={() => props.openEvent(row.count)} align="right">
                       {row.count}
                       <CountTooltip data={row.countBySites} name="Countries" className="row_count_tooltip" itemName="name"/>
                    </TableCell> 
                    <TableCell className="row_hover_count_date" align="right">
                        test
                        <CountTooltip data={row.occurredByDates} name="Message" className="row_count_tooltip_date" itemName="timestamp" />
                    </TableCell>
                    <TableCell onClick={() => props.openEvent(row.controller)} align="right">{row.controller}</TableCell>
                    <TableCell onClick={() => props.openEvent(row.endpoint)} align="right">{row.endpoint}</TableCell>
                    <TableCell align="right"><InfoButton/></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        
          <Pagination nextPage={this.nextPage} countPerPage={countPerPage} count={pages} switchTo={this.switchTo} handleChange={this.handleChange}/>
        </Paper>
        
      );
  }

  
}




SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);

const getParams = arrParams => {
  let str = '';

  arrParams.map(param => {
    const { type, value } = param;

    str += `&${type}=${value}`;
  })

  return str;
}

const defaultFilter = [
  { type: 'sort_by', value: 'count' },
  { type: 'order_by', value: 'desc' },
  { type: 'type', value: 'error'}
]

const switchParamFilter = (type, value) => {
  switch(type) {
    case 'order_by': 
      return value == 'desc' ? 'asc' : 'desc';
    case 'sort_by': 
      return value == 'count' ? 'occurred_date': 'count';

    default: return '';
  }
}