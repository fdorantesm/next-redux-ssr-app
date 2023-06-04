import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Dropzone, { DropzoneOptions } from "react-dropzone";
import SourceIcon from "@mui/icons-material/Source";

export function FileUpload(props: DropzoneOptions) {
  return (
    <Dropzone {...props}>
      {({ getRootProps, getInputProps, open }) => (
        <Box sx={{ width: "100%", border: "2px dashed #ccc" }}>
          <Box py={3} {...getRootProps()}>
            <input {...getInputProps()} />
            <Stack
              spacing={3}
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography color={"lightslategrey"} variant="subtitle1">
                Añadir archivo(s) aquí
              </Typography>
              <Button
                variant="contained"
                onClick={open}
                startIcon={<SourceIcon />}
                size="large"
              >
                Seleccionar archivo(s)
              </Button>
            </Stack>
          </Box>
        </Box>
      )}
    </Dropzone>
  );
}
