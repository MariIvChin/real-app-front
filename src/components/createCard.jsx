import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidateUsingJoi from "../utils/formikValidateUsingJoi";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createCard } from "../services/cardsServices";

const CreateCard = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    validate: formikValidateUsingJoi({
      bizName: Joi.string().min(2).max(255).required().label("Name"),
      bizDescription: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("Description"),
      bizAddress: Joi.string().min(2).max(400).required().label("Address"),
      bizPhone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/)
        .label("Phone"),
      bizImage: Joi.string().min(11).max(1024).label("Image").allow(""),
    }),
    async onSubmit(values) {
      try {
        const { bizImage, ...body } = values;

        if (bizImage) {
          body.bizImage = bizImage;
        }
        await createCard(body);
        toast("A new Card Created 🤞");
        navigate("/my-cards");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
      console.log(values);
    },
  });

  return (
    <>
      <PageHeader
        title="Create Card"
        description="Here you can to create a new card"
      />

      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          label="Name"
          type="text"
          required
          {...form.getFieldProps("bizName")}
          error={form.touched.bizName && form.errors.bizName}
        />
        <Input
          label="Description"
          type="text"
          required
          {...form.getFieldProps("bizDescription")}
          error={form.touched.bizDescription && form.errors.bizDescription}
        />
        <Input
          label="Address"
          type="text"
          required
          {...form.getFieldProps("bizAddress")}
          error={form.touched.bizAddress && form.errors.bizAddress}
        />
        <Input
          label="Phone"
          type="text"
          required
          {...form.getFieldProps("bizPhone")}
          error={form.touched.bizPhone && form.errors.bizPhone}
        />
        <Input
          label="Image"
          type="text"
          required
          {...form.getFieldProps("bizImage")}
          error={form.touched.Image && form.errors.bizImage}
        />

        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            Create Card
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateCard;
