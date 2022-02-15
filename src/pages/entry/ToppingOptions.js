import {Col, Form} from "react-bootstrap";

const ToppingOptions = ({name, imagePath, updateItemCount}) => {
    const handleChange = (event) => {
        updateItemCount(event.target.checked ? 1 : 0);
    }

    return (
        <Col xs={6} sm={4} md={3} lg={2} style={{textAlign: "center"}}>
            <img alt={`${name} topping`} src={imagePath} style={{width: "75%"}}/>
            <Form.Group controlId={`${name}-topping-checkbox`}>
                <Form.Check
                    type="checkbox"
                    label={name}
                    onChange={handleChange}
                />
            </Form.Group>
        </Col>
    );
}

export default ToppingOptions;