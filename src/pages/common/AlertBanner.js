import {Alert} from "react-bootstrap";

const AlertBanner = (
    {
        message = "An unexpected error occurred. Please try again later",
        varient = "danger"
    }
) => {
    return (
        <Alert variant={varient} style={{backgroundColor: "red"}}>{message}</Alert>
    );
}

export default AlertBanner;