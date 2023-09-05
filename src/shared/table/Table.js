import React from 'react'
import './Table.css'

const Table = ({headers, data, enableUpdate, enableDelete, ...props}) => {
    console.log("ravi");
console.log("Inside Table: ",data);
const tableHeaders = headers;
const rowDataElements = data.map((objectValue, index) => {
    return(
        <tr key={index}>
            {
                Object.entries(objectValue).map(([key, value]) => {
                    if(typeof value !== 'object' && value !== null || Array.isArray(value)){
                        return(
                        Array.isArray(value)?
                        <td key={key} className='text-center'>{value.length}</td>
                        :<td key={key} scope="col" className='text-center'>{value}</td>
                    )}
                    else if(typeof value === 'object' && value !== null){
                        return Object.entries(value).map(([key, value], index) => {
                            if(index != 0){
                            return (
                                Array.isArray(value)?
                                <td key={key} className='text-center'>{value.length}</td>
                                :<td key={key} className='text-center'>{value}</td>
                            )}
                        })
                    }
                    else if(value === null){
                        return(<td key={key} className='text-center'>-</td>)
                    }
                })
            }
            
            {props.viewList ?
            <td className='text-center'>{props.viewList(objectValue)}</td>
            : null}
            {enableUpdate ?
            <td className='text-center'><button className="btn btn-warning mb-3" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => props.updateFunction(objectValue)}>Update</button></td>
            : null}
            {enableDelete ?
            <td className='text-center'><button className="btn btn-danger mb-3" onClick={() => props.deleteFunction(objectValue)}>Delete</button></td>
            :null}
            {props.extraFunction ?
            <td className='text-center'>{props.extraFunction(objectValue)}</td>
            : null}
        </tr>
    )
})
  return (
    <table class="table table-striped">
        <thead>
            <tr>
            {tableHeaders.length &&
            tableHeaders.map((value) => (<th scope="col" className='text-center col align-items-center justify-content-center'>{value}</th>)) }
            {enableUpdate ?
            <th scope="col" className='text-center'>Update</th>
            : null}
            {enableDelete ?
            <th scope="col" className='text-center'>Delete</th>
            :null}
            </tr>
        </thead>
        <tbody class="table-group-divider">
            {rowDataElements}
        </tbody>
    </table>
  )
}

export default Table
