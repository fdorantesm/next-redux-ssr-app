import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { BaseSyntheticEvent, useLayoutEffect, useState } from "react";

import { For } from "src/components/for";
import { Layout } from "src/layout/default";
import { addItem } from "src/services/api/cart/add-item";
import { getRaffle } from "src/services/api/raffles/get-raffle";
import { Raffle } from "src/services/api/types/raffle.type";
import { Json } from "src/types/json.type";
import { TicketItem } from "src/types/ticket-item.type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/types/root-state.type";
import { removeItem } from "src/services/api/cart/remove-item";
import { getCartItemIdByTicket } from "src/utils/cart/get-cart-item-id-by-ticket.util";
import { setCart, setDiscount } from "src/store/modules/slices/cart.slice";
import RaffleHero from "src/components/raffles/hero/hero";
import TicketBook from "src/components/raffles/ticketbook/ticketbook";
import Gallery from "src/components/raffles/gallery/gallery";
import { calcDiscount } from "src/utils/coupons/calc-discount.util";

export default function RafflePage(props: { raffle: Raffle }) {
  const ticketsState = props.raffle.ticketBook.map((ticket) => ({
    ...ticket,
    selected: false,
  }));

  const { cart, coupon } = useSelector((state: RootState) => ({
    cart: state.cart,
    coupon: state.coupon,
  }));

  const discount = coupon.code
    ? calcDiscount(cart.total, coupon.discountType, coupon.discount)
    : 0;

  const dispatch = useDispatch();
  const [raffle] = useState<Raffle>(props.raffle);
  const [tickets, setTickets] = useState<TicketItem[]>(ticketsState);

  const snackbar = useSnackbar();

  useLayoutEffect(() => {
    if (cart.items.length > 0) {
      cart.items
        .filter((item) => item.raffleId === raffle.uuid)
        .forEach((item) => {
          toggleTicketSelectionByReference(item.reference, true);
        });
    } else {
      tickets
        .filter((ticket) => ticket.selected)
        .forEach((ticket) =>
          toggleTicketSelectionByReference(ticket.reference, false)
        );
    }
  }, [cart]);

  const toggleTicketSelectionByReference = (
    reference: string,
    value: boolean
  ) => {
    const ticketIndex = tickets.findIndex(
      (ticket) => ticket.reference === reference
    );

    if (ticketIndex >= 0) {
      tickets[ticketIndex].selected = value;
      const updatedTickets = tickets;
      updatedTickets;
      setTickets(updatedTickets);
    }
  };

  const handleClick = async (e: BaseSyntheticEvent) => {
    const reference = e.currentTarget.getAttribute("data-ticket-reference");
    const selectedTicketIndex = tickets.findIndex(
      (ticket: TicketItem) => ticket.reference === reference
    );
    const ticket = tickets[selectedTicketIndex];
    const selected = tickets[selectedTicketIndex].selected;

    try {
      if (!ticket.selected && !ticket.sold) {
        const cartResult = await addItem(cart.key, {
          reference,
          raffleId: raffle.uuid,
        });
        snackbar.enqueueSnackbar({
          message: `Boleto ${reference} agregado al carrito`,
          variant: "success",
        });
        ticket.selected = !selected;
        const updatedTickets = [...tickets];
        setTickets(updatedTickets);
        dispatch(
          setCart({
            key: cartResult.uuid,
            items: cartResult.items,
            total: cartResult.total,
          })
        );
        dispatch(setDiscount(discount));
      }

      if (ticket.selected) {
        const itemId = getCartItemIdByTicket(
          cart.items,
          raffle.uuid,
          reference
        );
        if (itemId) {
          const removeResponse = await removeItem(cart.key, itemId);
          snackbar.enqueueSnackbar({
            message: `Boleto ${reference} retirado del carrito`,
            variant: "info",
          });
          ticket.selected = !selected;
          const updatedTickets = [...tickets];
          setTickets(updatedTickets);
          dispatch(
            setCart({
              key: removeResponse.uuid,
              items: removeResponse.items,
              total: removeResponse.total,
            })
          );
          dispatch(setDiscount(discount));
        }
      }
    } catch (error) {
      snackbar.enqueueSnackbar({
        message: "Ocurrió un error...",
        variant: "error",
      });
    }
  };

  return (
    <>
      <Layout>
        <RaffleHero raffle={raffle} />
        <Container>
          <Grid container justifyContent={"center"}>
            <Grid container md={9}>
              <Gallery images={raffle.prize.images} />
            </Grid>
          </Grid>
          <Box>
            <Grid container md={12} justifyContent={"center"}>
              <Grid item md={9}>
                <Typography variant="subtitle1" fontSize={32} p={2}>
                  Boletos
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems={"center"} justifyContent={"center"}>
              <TicketBook tickets={tickets} handleClick={handleClick} />
            </Grid>
            <Grid container justifyContent={"center"} pt={5} pb={5}>
              <Grid item>
                <Link href={"/cart"}>
                  <Button variant="contained" size="large" color="success">
                    Ir a pagar
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const slug: string = ctx?.params?.slug;
  const props: Json = {};

  try {
    if (slug) {
      props.raffle = await getRaffle(slug);
    }
  } catch (error) {}

  return {
    props,
  };
}
