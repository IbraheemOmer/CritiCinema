import {Form,Button} from 'react-bootstrap';
import './ReviewForm.css';

const ReviewForm = ({handleSubmit,revText,labelText,defaultValue}) => {
  return (

    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{labelText}</Form.Label>
            <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
        </Form.Group>
        <button style={{borderRadius: "10px"}} variant="outline-info" onClick={handleSubmit}>Submit</button>
    </Form>   

  )
}

export default ReviewForm
