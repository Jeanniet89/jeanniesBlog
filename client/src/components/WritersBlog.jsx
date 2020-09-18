import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const WritersBlog = ({history}) => {
  const initialState = { title: '', text: '' };
  const [values, setValues] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/writers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then((response) => {
        if (response.ok) {
          alert('Successfully created');
          return response.json().then((writers) => {
            history.push(`/writers/new${writers._id}`);
          });
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Author Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author Name"
            required={true}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tittle</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author Name"
            required={true}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Article</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="Text for your article..."
            required={true}
            onChange={(e) => setValues({ ...values, text: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default WritersBlog;
