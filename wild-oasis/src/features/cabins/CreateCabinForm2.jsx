/* eslint-disable react/prop-types */
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import FormRow from "../../ui/Formrow";
import useCreate from "../../hooks/useCreate";
import useEdit from "../../hooks/useEdit";

function CreateCabinForm({ cabinEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinEdit;
  const isEditsession = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: isEditsession ? editValues : {},
  });

  const { createMutate, createload } = useCreate();

  const { Editmutate, editload } = useEdit();

  const isWorking = createload || editload;

  function onsubmit(data) {
    // Ensure image exists before accessing
    if (!data.image) {
      toast.error("Please upload an image.");
      return;
    }

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditsession) {
      Editmutate(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onClose?.();
          },
        }
      );
    } else {
      createMutate(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onClose?.();
          },
        }
      );
    }

    console.log("Form Data Submitted:", data);
  }

  function onerror(errors) {
    console.log("Form Validation Errors:", errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onsubmit, onerror)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          {...register("max_capacity", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          {...register("regular_price", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              const regularPrice = getValues("regular_price");
              return (
                value <= regularPrice || "Discount cannot exceed regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditsession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button size="medium" variation="primary" disabled={isWorking}>
          {isEditsession ? "Edit cabin" : "Add new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
