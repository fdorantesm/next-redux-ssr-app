import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { MouseEvent, MouseEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { If } from "src/components/if";
import { Layout } from "src/layout/default";
import { getCoupon } from "src/services/api/coupons/get-coupon";
import { removeCoupon, setCoupon } from "src/store/modules/slices/coupon.slice";
import { RootState } from "src/store/types/root-state.type";
import ClearIcon from "@mui/icons-material/Clear";
import { setCart, setDiscount } from "src/store/modules/slices/cart.slice";
import { removeItem } from "src/services/api/cart/remove-item";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart);
  const coupon = useSelector((state: RootState) => state.coupon);
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const [couponCode, setCouponCode] = useState(coupon.code || "");

  const proceedToPay = () => {};
  const applyCoupon = async () => {
    if (couponCode && couponCode !== coupon.code) {
      try {
        const coupon = await getCoupon(couponCode);
        const percentageDiscount = (coupon.discount / 100) * cart.total;
        const fixedDiscount = cart.total - coupon.discount;
        setCouponCode(coupon.code);
        dispatch(
          setDiscount(
            coupon.discountType === "percentage"
              ? percentageDiscount
              : fixedDiscount
          )
        );
        dispatch(
          setCoupon({
            code: coupon.code,
            description: coupon.description,
            discount: coupon.discount,
            discountType: coupon.discountType,
          })
        );
        snackbar.enqueueSnackbar({
          message: "El cupón fue aplicado a tu carrito",
          variant: "success",
        });
      } catch (error: any) {
        snackbar.enqueueSnackbar({
          message: error.data.message,
          variant: "error",
        });
      }
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    const cartResponse = await removeItem(cart.key, itemId);
    dispatch(
      setCart({
        key: cartResponse.uuid,
        items: cartResponse.items,
        total: cartResponse.total,
      })
    );
  };

  const clearCouponCode = () => {
    setCouponCode("");
    dispatch(setDiscount(0));
    dispatch(removeCoupon());
  };

  return (
    <>
      <Layout>
        <Container>
          <Grid container justifyContent={"center"}>
            <Grid item md={5}>
              <Typography variant="h5" pt={3} pb={3} textAlign={"center"}>
                Resumen del carrito
              </Typography>
              <Typography variant="overline" color="red">
                Antes de continuar con el pago revisa que el contenido del
                carrito contenga lo que agregaste antes y que el total esté
                correcto.
              </Typography>
              <Box pt={3} pb={3}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell width={10}>#</TableCell>
                      <TableCell>Boleto</TableCell>
                      <TableCell align="right">Precio</TableCell>
                      <TableCell align="right" width={50}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.items.map((item, index) => (
                      <TableRow sx={{}}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.reference}</TableCell>
                        <TableCell align="right">${item.price}</TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={(e) => handleRemoveItem(item.id)}
                            color="error"
                            disableRipple={true}
                          >
                            <ClearIcon color="error" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <If condition={Boolean(coupon.code)}>
                      <TableRow>
                        <TableCell colSpan={3}>
                          ({coupon.code}) {coupon.description}
                        </TableCell>
                        <TableCell align="right">
                          <If condition={coupon.discountType === "percentage"}>
                            - ${(coupon.discount / 100) * cart.total}
                          </If>
                          <If condition={coupon.discountType === "amount"}>
                            - ${cart.total - coupon.discount}
                          </If>
                        </TableCell>
                      </TableRow>
                    </If>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell align="right">
                        ${cart.total - cart.discount}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </Box>
              <Box>
                <Grid container alignItems={"center"}>
                  <Grid item md={9}>
                    <TextField
                      fullWidth
                      id="coupon"
                      label="¿Tienes un cupón de descuento?"
                      variant="filled"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{ cursor: "pointer" }}
                          >
                            <ClearIcon color="error" />
                          </InputAdornment>
                        ),
                        onClick: clearCouponCode,
                      }}
                    />
                  </Grid>
                  <Grid item md={3} p={1}>
                    <Button
                      fullWidth
                      size="large"
                      disableRipple={true}
                      style={{ display: "block" }}
                      onClick={applyCoupon}
                    >
                      Aplicar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={5}>
                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  onClick={proceedToPay}
                >
                  Proceeder al pago
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
}
