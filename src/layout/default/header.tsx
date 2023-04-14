import { Box, Container, Grid } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { RootState } from "src/store/types/root-state.type";
import { getCart } from "src/services/api/cart/get-cart";
import { setCart, setDiscount } from "src/store/modules/slices/cart.slice";
import { calcDiscount } from "src/utils/coupons/calc-discount.util";

export function Header() {
  const { cart, coupon } = useSelector((state: RootState) => ({
    cart: state.cart,
    coupon: state.coupon,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    getCart(cart.key).then((cartContent) => {
      const discount = coupon.code
        ? calcDiscount(cart.total, coupon.discountType, coupon.discount)
        : 0;
      dispatch(
        setCart({
          key: cartContent.uuid,
          items: cartContent.items,
          total: cartContent.total,
        })
      );
      dispatch(setDiscount(discount));
    });
  }, [cart.total, coupon.code]);

  return (
    <>
      <header>
        <Container>
          <Grid container>
            <Grid item md={6}>
              <Link href={"/"}>Home</Link>
            </Grid>
            <Grid item md={6}>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <ShoppingBasketIcon color="success" />
                <span style={{ marginLeft: "0.5rem", marginTop: "2px" }}>
                  ${cart.total - cart.discount}
                </span>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </header>
    </>
  );
}
