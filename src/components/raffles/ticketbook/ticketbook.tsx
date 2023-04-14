import { Box, Button, Grid, Typography } from "@mui/material";
import { For } from "src/components/for";
import { If } from "src/components/if";
import { TicketItem } from "src/types/ticket-item.type";

export default function TicketBook(props: any) {
  return (
    <>
      <Grid container md={9}>
        <For items={props.tickets}>
          {(item: TicketItem) => (
            <>
              <Grid item md={3} key={item.reference}>
                <Box p={2}>
                  <Button
                    disabled={item.sold}
                    variant={item.selected ? "contained" : "outlined"}
                    fullWidth
                    onClick={props.handleClick}
                    data-ticket-reference={item.reference}
                    color={"info"}
                    style={{ padding: "1rem 0" }}
                  >
                    <If condition={!item.sold}># {item.reference}</If>
                    <If condition={item.sold}>Vendido</If>
                  </Button>
                </Box>
              </Grid>
            </>
          )}
        </For>
      </Grid>
    </>
  );
}
