import React from "react";
import { Container, Grid, IconButton } from "@mui/material";
import appIcons from "components/icons";
import BazaarCard from "components/BazaarCard";
import { H4, Span } from "components/Typography";
const CARD_STYLE = {
  p: "3rem",
  height: "100%",
  display: "flex",
  borderRadius: "8px",
  alignItems: "center",
  flexDirection: "column"
};
const serviceList = [{
  id: "5f9bd366-9583-4e6d-9b11-abe74b9c5d96",
  icon: "Truck",
  title: "High level of medical care",
  description: "We have a high level of medical care that does not lag behind any other country, and only verified hospitals are targeted."
}, {
  id: "121cffea-6972-41f8-8094-98dca22d17bb",
  icon: "CreditCardVerified",
  title: "Safe payment and follow-up management",
  description: "Payments are supported within the platform, and actions related to refunds and payments are also supported by the platform."
}, {
  id: "5b94f5d8-71ec-40a6-b5b8-401286deba24",
  icon: "Shield",
  title: "Easy reservation and translation support",
  description: "You can easily make a reservation according to your schedule, and we support translation for inquiries and local assistance."
}, {
  id: "8c4bb18f-d914-4269-9c7c-3c6728ba33e9",
  icon: "CustomerService",
  title: "24 hour customer support",
  description: "24/7 customer support service responds quickly and accurately"
}]

const Section12 = () => {
  return <Container sx={{
    mb: "70px"
  }}>
      <Grid container spacing={3}>
        {serviceList.map((item, ind) => {
        const Icon = appIcons[item.icon];
        return <Grid item lg={3} md={6} xs={12} key={item.id}>
              <BazaarCard hoverEffect sx={CARD_STYLE}>
                <IconButton sx={{
              width: 64,
              height: 64,
              fontSize: "1.75rem",
              backgroundColor: "grey.200"
            }}>
                  <Icon fontSize="inherit" />
                </IconButton>

                <H4 mt={2.5} mb={1.25} textAlign="center">
                  {item.title}
                </H4>

                <Span textAlign="center" color="grey.600">
                  {item.description}
                </Span>
              </BazaarCard>
            </Grid>;
      })}
      </Grid>
    </Container>;
};
export default Section12;