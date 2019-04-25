import React from "react"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import keyObj from "./"


const CountTooltip = (props)=>{
  const data = props.data;
  const time = sec =>{
    return `${new Date(sec)}`
  }
    return(
        <Paper className={props.className}>
          <Table key="id">
            <TableHead>
              <TableRow>
                <TableCell>{props.name}</TableCell>
                <TableCell>Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
        
               { (data&&
                  data.map((item, index) => {
                    console.log(item)
                    return (
                        <TableRow key={index}>  
                          <TableCell align="right">{typeof item["timestamp"] !== "undefined" 
                                                    ? (new Date(parseInt(item[props.itemName]))).toUTCString() 
                                                    : item[props.itemName]}
                          </TableCell>
                          <TableCell align="right">{item.count}</TableCell>
                          {/* {item[keyObj.count]}  Ліпше створити окремий файл з Обєктом і назвами ключів,щоб легко маніпулювати в разі змін назв ключів*/}
                        </TableRow>
                    )
                  })
               )}

            </TableBody>
          </Table>
        </Paper>
    )
}



export default CountTooltip
