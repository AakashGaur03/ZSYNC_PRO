import { useContext } from "react"
import SnackbarContext from "../Contexts/SnackbarContext"




const Snackbar = () =>{
    const {snackbarMessage} =useContext(SnackbarContext)
    console.log(snackbarMessage)
    return(
        <>
        {/* <h1>{snackbarMessage?snackbarMessage:""}</h1>
        <h1>Hello</h1> */}
        <div className="snackBarClass">{snackbarMessage?snackbarMessage:""}</div>
        </>
    )
}

export default Snackbar