import React from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { AlertCircleOutline } from '@styled-icons/evaicons-outline/AlertCircleOutline';
import { useTranslation } from 'react-i18next';
import { useFirebase } from 'react-redux-firebase';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Layout from '../components/layout/Layout';

const CreateUser = () => {
    // Hooks
    const router = useRouter();
    const firebase = useFirebase();
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required(t("The name is required")),
            email: Yup.string()
                .email(t("The email is not valid"))
                .required(t("The email is required")),
            password: Yup.string()
                .required(t("The password is required"))
                .min(6, t("The password must be at least 6 characters"))
        }),
        onSubmit: values => createNewUser(values)
    });

    // Create user
    const createNewUser = async ({ name, email, password }) => {
        try {
            await firebase.createUser(
                { email, password },
                { name, email }
            );
            router.push('/');
        } catch (error) {
            toast.error(t(error.code), { className: 'bg-danger' });
        }
    };

    // Alert message
    const alert = (visible, message) => visible && (
        <Alert variant="danger mt-2 d-flex">
            <AlertCircleOutline
                style={{ width: "1.4em" }}
                className="mr-2"
            />
            {message}
        </Alert>
    );

    return (
        <Layout>
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8} xl={6}>
                    <h1 className="text-center mb-4">
                        {t("Create user")}
                    </h1>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label className="text-primary">
                                {t("Name")}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t("Enter your name")}
                                maxLength="15"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {alert(
                                formik.touched.name && formik.errors.name,
                                formik.errors.name
                            )}
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label className="text-primary">
                                {t("Email address")}
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={t("Enter your email")}
                                maxLength="40"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {alert(
                                formik.touched.email && formik.errors.email,
                                formik.errors.email
                            )}
                            <Form.Text className="text-muted">
                                {t("We'll never share your email with anyone")}.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label className="text-primary">
                                {t("Password")}
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder={t("Enter your password")}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {alert(
                                formik.touched.password && formik.errors.password,
                                formik.errors.password
                            )}
                        </Form.Group>
                        <Button
                            className="mt-4 text-white"
                            variant="secondary"
                            type="submit"
                        >
                            {t("Create user")}
                        </Button>
                        <Link href="/login">
                            <a className="mt-4 d-block">
                                <p>{t("I already have an user account. Let's login!")}</p>
                            </a>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Layout>
    );
}

export default CreateUser;