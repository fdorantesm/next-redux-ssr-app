import { Grid } from "@mui/material";

import styles from "./gallery.module.scss";

export default function Gallery(props: any) {
  return (
    <>
      <Grid container>
        {props.images.map((image: any) => (
          <Grid item md={4} className={styles.galleryItem}>
            <img
              src={"https://dummyimage.com/600x0600/000/fff"}
              className={styles.image}
              style={
                {
                  // backgroundImage: "url(https://dummyimage.com/600x0600/000/fff)",
                }
              }
              alt={image.originalName}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
