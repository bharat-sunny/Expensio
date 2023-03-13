import React from 'react';
// Used to provide error objects to show errors in the form
import { useForm } from 'react-hook-form';
// Used to provide Error messages for Schema validation errors
import { yupResolver } from '@hookform/resolvers/yup';
// Used to provide schema validation 
import * as yup from "yup";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
// Used for notifications
import { toast } from "react-toastify";

// apis
import { signup } from "../../../APIs/auth";

const schema = yup.object().shape({
  username: yup.string().min(6).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
    });
export default function Signup(){
    const {
        register,
        handleSubmit,
        formState: { isValid, errors, touchedFields, dirtyFields },
    reset,
    }= useForm({
        defaultValues: {
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
        // We need to update form when value changes
        mode: "all",
        reValidateMode: "all",
        // Mapping a schema to the particular form, to get the messages to the form
        resolver: yupResolver(schema), 
      });
    
    // checking the controls    
      const hasError = (control) => {
        return errors[control] && (touchedFields[control] || dirtyFields[control]);
      };

    const onSubmitHandler = (value) => {
        //   Logging the value from the form
        console.log(value);
        if (!isValid) {
          return;
        }
        // Signup function to call the api
        // If no error from the api, user is created succesfully
        signup(value.username, value.email, value.password)
          .then((data) => {
            if (!data.error) {
              toast.success("user created successfully");
              reset();
              // else showing the error toaster
            } else {
              toast.error(data.message);
            }
          })
          // Catching the error, like 404 page not found
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      };

    return (
        <Container fluid>
            <Row>
            <Col>
                <Form>
                <Form.Group controlId='firstNameControl'>
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" />
                </Form.Group>
                <Form.Group controlId='LastNameControl'>
                    <Form.Label>LasttName</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" />
                </Form.Group>
                <Form.Group controlId='emailControl'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email id" />
                </Form.Group>
                <Form.Group controlId='passwordControl'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>
                <Form.Group controlId='confirmPasswordControl'>
                    <Form.Label>confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Please re-enter password" />
                </Form.Group>
                <Button
                    variant="success"
                    className="mt-4 btn-block"
                    type="submit"
                    disabled={!isValid}
                >
                Signup
                </Button>
            </Form>
            </Col>
        </Row>
        </Container>
    
    );

};

