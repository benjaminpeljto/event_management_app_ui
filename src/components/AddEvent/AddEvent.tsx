import { EventFormType, TicketType, type EventType } from "../../utils/types";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import { EventService } from "../../services";
import { toast } from "react-toastify";
import { Check } from "@mui/icons-material";

const validationSchema = Yup.object({
  name: Yup.string().required("Event Name is required"),
  description: Yup.string().required("Event Description is required"),
  location: Yup.string().required("Event Location is required"),
  eventCategory: Yup.string().required("Event Category is required"),
  ticketTypes: Yup.array().of(
    Yup.object().shape({
      ticketType: Yup.string().required("Ticket Type is required"),
      quantity: Yup.number()
        .min(1, "Quantity must be greater than 0")
        .required("Quantity is required"),
      typePrice: Yup.number()
        .min(1, "Type Price must be greater than 0")
        .required("Type Price is required"),
    })
  ),
  image: Yup.string().required("Image is required"),
});

const eventCategories: EventType[] = [
  "CONCERT",
  "GIG",
  "SPORT",
  "FESTIVAL",
  "THEATER",
  "FOOD",
  "SEMINAR",
];

export default function AddEvent() {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      location: "",
      eventCategory: "CONCERT",
      occuranceDateTime: new Date().toISOString(),
      ticketTypes: [
        {
          ticketType: "REGULAR",
          quantity: 0,
          typePrice: 0,
        },
      ],
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const eventForm: EventFormType = {
        ...values,
        eventCategory: values.eventCategory as EventType,
        organizerId: "",
        eventStatus: "PENDING_APPROVAL",
        ticketTypes: values.ticketTypes.map((ticket) => ({
          ...ticket,
          ticketType: ticket.ticketType as TicketType,
        })),
      };
      EventService.postEvent(eventForm)
        .then(() => {
          toast.success("Event successfully added.");
        })
        .catch((error) => {
          toast.error("Error while adding event:", error.message);
        });
    },
  });

  const [hasVipType, setHasVipType] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const toggleVipForm = () => {
    if (hasVipType) {
      setHasVipType(false);
      const updatedTicketTypes = formik.values.ticketTypes.slice(0, -1);
      formik.setFieldValue("ticketTypes", updatedTicketTypes);
    } else {
      setHasVipType(true);
      formik.setFieldValue("ticketTypes", [
        ...formik.values.ticketTypes,
        { ticketType: "VIP", quantity: 0, typePrice: 0 },
      ]);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsImageLoading(true);
    if (
      event.currentTarget.files !== null &&
      event.currentTarget.files[0] !== null
    ) {
      EventService.uploadEventPoster(event.currentTarget.files[0])
        .then((data) => {
          formik.values.image = data;
          setImageUrl(data);
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setIsImageLoading(false);
        });
    } else {
      toast.error("Try again or contact support.");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label='Event Name'
            name='name'
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Event Description'
            name='description'
            fullWidth
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Event Location'
            name='location'
            fullWidth
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                paddingRight: "5px",
                paddingLeft: "5px",
                background: "white",
                zIndex: 1,
              }}
            >
              Event Category
            </InputLabel>
            <Select
              value={formik.values.eventCategory}
              onChange={formik.handleChange}
              name='eventCategory'
              error={
                formik.touched.eventCategory &&
                Boolean(formik.errors.eventCategory)
              }
            >
              {eventCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Occurrence Date and Time'
            name='occuranceDateTime'
            type='datetime-local'
            fullWidth
            value={formik.values.occuranceDateTime}
            onChange={formik.handleChange}
            error={
              formik.touched.occuranceDateTime &&
              Boolean(formik.errors.occuranceDateTime)
            }
            helperText={
              formik.touched.occuranceDateTime &&
              formik.errors.occuranceDateTime
            }
          />
        </Grid>
        {formik.values.ticketTypes.map((ticket, index) => (
          <Grid item xs={12} key={index}>
            <TextField
              label='Ticket Type'
              name={`ticketType-${index}`}
              fullWidth
              value={ticket.ticketType}
              InputProps={{ readOnly: true }}
              sx={{ mb: "1rem" }}
            />
            <TextField
              label='Quantity'
              name={`quantity-${index}`}
              type='number'
              fullWidth
              value={ticket.quantity}
              onChange={(event) =>
                formik.setFieldValue(
                  `ticketTypes[${index}].quantity`,
                  parseInt(event.target.value, 10)
                )
              }
              sx={{ mb: "1rem" }}
            />
            <TextField
              label='Type Price'
              name={`typePrice-${index}`}
              type='number'
              fullWidth
              value={ticket.typePrice}
              onChange={(event) =>
                formik.setFieldValue(
                  `ticketTypes[${index}].typePrice`,
                  parseFloat(event.target.value)
                )
              }
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant='outlined' onClick={toggleVipForm}>
            {hasVipType ? "Remove VIP" : "Add VIP"} Ticket Type
          </Button>
        </Grid>
        <Grid item xs={12}>
          <input type='file' accept='image/*' onChange={handleImageUpload} />
          {formik.touched.image && formik.errors.image && (
            <div style={{ color: "red" }}>{formik.errors.image}</div>
          )}
          {isImageLoading && <CircularProgress />}
          {imageUrl !== "" && <Check />}
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
