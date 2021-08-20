import { makeStyles } from "@material-ui/core";

const styleLogin= makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
    height: '70vh',
    width: 280,
    margin: "2vh auto"
  },
  submitButton: {
    margin: '8px 2vh'
  }
}))
export default styleLogin

