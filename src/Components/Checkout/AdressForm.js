import React, { useState, useEffect } from "react";
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import { commerce } from "../lib/commerce";

const AdressForm = ({ checkoutToken, next }) => {
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingAreas, setShippingAreas] = useState([]);
  const [shippingArea, setShippingArea] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const formattedShippingOptions = shippingOptions.map((option) => ({
    id: option.id,
    label: `${option.description} - (${option.price.formatted_with_symbol})`,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchShippingAreas = async (checkoutTokenId, countryCode) => {
    const { subdivisions } = await commerce.services.localeListShippingSubdivisions(checkoutTokenId, countryCode);
    setShippingAreas(subdivisions);
    setShippingArea(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    checkoutToken && fetchShippingCountries(checkoutToken?.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) {
      fetchShippingAreas(checkoutToken.id, shippingCountry);
    }
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingArea) {
      fetchShippingOptions(checkoutToken.id, shippingCountry, shippingArea);
    }
  }, [shippingArea]);

  const onChangeShippingCountryHandler = (event) => {
    setShippingCountry(event.target.value);
  };

  const onChangeShippingAreaHandler = (event) => {
    setShippingArea(event.target.value);
  };

  const onChangeShippingOptionHandler = (event) => {
    setShippingOption(event.target.value);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping adress
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingArea, shippingOption }))}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstname" label="First Name" />
            <FormInput required name="lastname" label="Last Name" />
            <FormInput required name="adress1" label="Adress" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="ZIP Code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} onChange={onChangeShippingCountryHandler} fullWidth>
                {Object.entries(shippingCountries).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping region</InputLabel>
              <Select value={shippingArea} onChange={onChangeShippingAreaHandler} fullWidth>
                {Object.entries(shippingAreas).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping options</InputLabel>
              <Select value={shippingOption} onChange={onChangeShippingOptionHandler} fullWidth>
                {formattedShippingOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid direction="row" container spacing={5}>
            <Grid item xs={12} sm={6} container justifyContent="flex-start" alignItems="flex-end">
              <Button component={Link} to="/cart" variant="outlined">
                Back to cart
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="flex-start">
              <Button type="submit" variant="contained" color="primary">
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AdressForm;
