import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useForm } from "react-hook-form";
import useGameQueryStore from "../../store";
import { useAuth } from "../../contexts/AuthContext";
import purchaseService from "../../services/Sales/purchaseService";
import { Link, useNavigate } from "react-router-dom";

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step, register, errors, processData, selectedProduct) {
  switch (step) {
    case 0:
      return <AddressForm register={register} errors={errors} />;
    case 1:
      return <PaymentForm register={register} errors={errors} />;
    case 2:
      return (
        <Review processData={processData} selectedProduct={selectedProduct} />
      );
    default:
      throw new Error("Unknown step");
  }
}

const CheckOut = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleNext = () => {};

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const selectedProduct = useGameQueryStore((s) => s.selectedProduct);
  const selectedQuantity = useGameQueryStore((s) => s.selectedQuantity);

  const [processData, setProcessData] = React.useState(null);

  const { getCurrentUser } = useAuth();

  const onSubmit = (data) => {
    const storedPaymentString = localStorage.getItem("paymentInfo");

    let newData = {};

    if (storedPaymentString && storedPaymentString.trim() !== "") {
      const storedPayment = JSON.parse(storedPaymentString);

      newData = {
        quantity: selectedQuantity.quantity,
        customerId: getCurrentUser()._id,
        productId: selectedProduct._id,
        cardNumber: storedPayment.cardNumber,
        cardName: storedPayment.cardName,
        cvv: storedPayment.cvv,
        state: data.state,
        expDate: storedPayment.expDate,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        firstName: data.firstName,
        lastName: data.lastName,
        saveAddress: data.saveAddress,
        savePayment: data.savePayment,
      };

      console.log(newData);

    } else {
      newData = {
        quantity: selectedQuantity.quantity,
        customerId: getCurrentUser()._id,
        productId: selectedProduct._id,
        cardNumber: data.cardNumber,
        cardName: data.cardName,
        cvv: data.cvv,
        state: data.state,
        expDate: data.expDate,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        firstName: data.firstName,
        lastName: data.lastName,
        saveAddress: data.saveAddress,
        savePayment: data.savePayment,
      };
    }

    setProcessData(newData);

    localStorage.removeItem("paymentInfo");

    if (activeStep == 2) {
      purchaseService
        .Purchase(processData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setActiveStep(activeStep + 1);
  };

  React.useEffect(() => {
    console.log(processData);
  }, [processData]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="sm"
        sx={{ mb: 4, marginTop: "130px" }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
              <Link to="/">
                <Button variant="contained" color="success">
                  Home
                </Button>
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {getStepContent(
                  activeStep,
                  register,
                  errors,
                  selectedProduct,
                  processData
                )}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/")}
                    sx={{
                      mt: 3,
                      ml: 1,
                      marginLeft: "-2px",
                    }}
                    type="submit"
                    color="error"
                  >
                    Cancell
                  </Button>
                  <Box>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                      type="submit"
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default CheckOut;
