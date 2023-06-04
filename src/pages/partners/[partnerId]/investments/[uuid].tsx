import { Box, Breadcrumbs, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import first from "lodash/first";
import cookie from "cookie";
import { Accept, FileRejection } from "react-dropzone";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Link from "next/link";
import SourceIcon from "@mui/icons-material/Source";

import { Page } from "src/components/page";
import { FileUpload } from "src/components/uploader";
import { Layout } from "src/layout/default";
import { removeFileExtension } from "src/utils/remove-fie-extension.util";
import { ContractPayload } from "src/types/contract.payload.type";
import { createContract } from "src/services/api/contracts/create-contract.service";
import { Contract } from "src/types/contract.type";
import { Pdf } from "src/components/pdf";
import { If } from "src/components/if";
import { withAuth } from "src/hofs/with-auth";
import { getContract } from "src/services/api/contracts/get-contract.service";
import { getPartner } from "src/services/api/partners/get-partner";
import { User } from "src/types/user.type";

export default function InvestmentsDetail(props: Props) {
  const partner = props.partner;
  const router = useRouter();
  const uuid = router.query.uuid as string;
  const partnerId = router.query.partnerId as string;
  const contractPayload: Partial<ContractPayload> = {
    investmentId: uuid,
    partnerId: partnerId,
  };
  const snackbar = useSnackbar();
  const [showDropzone, setShowDropzone] = useState(false);
  const [contract, setContract] = useState<Contract>({
    uuid: "",
    key: "",
    name: "",
    investmentId: "",
    partnerId: "",
    url: "",
  });

  useEffect(() => {
    getContract(uuid)
      .then(setContract)
      .catch(() => {
        setShowDropzone(true);
      });
  }, []);

  const toggleDropZone = () => {
    setShowDropzone(!showDropzone);
  };

  const handleDrop = async (files: File[], rejections: FileRejection[]) => {
    let message = "";
    if (rejections.length > 0) {
      const invalidFile = rejections[0].errors.some(
        (error) => error.code === "file-invalid-type"
      );

      const fileTooLarge = rejections[0].errors.some(
        (error) => "file-too-large" === error.code
      );

      if (invalidFile) {
        message = "El formato del archivo es inválido.";
      }

      if (fileTooLarge) {
        message = "El archivo excede los 10MB permitidos.";
      }

      snackbar.enqueueSnackbar({
        message,
        variant: "error",
      });

      return undefined;
    }

    const file = first(files) as File;
    const filename = removeFileExtension(file.name);

    try {
      const createdContract = await upload({
        file,
        name: filename,
        partnerId: contractPayload.partnerId!,
        investmentId: contractPayload.investmentId!,
      });

      setContract(createdContract);
      setShowDropzone(false);
      snackbar.enqueueSnackbar({
        message: "El contrato se ha subido exitosamente.",
        variant: "success",
      });
    } catch (error: any) {
      console.error(error);
      snackbar.enqueueSnackbar({
        message: "Ocurrió un error al procesar la solicitud.",
        variant: "error",
      });
    }
  };

  const upload = async (data: ContractPayload) => {
    const formData = new FormData();
    formData.append("file", data.file, data.file.name);
    formData.append("name", data.name);
    formData.append("investmentId", data.investmentId);
    formData.append("partnerId", data.partnerId);
    return createContract(formData);
  };

  return (
    <>
      <Layout>
        <Page>
          <Box>
            <Box my={2}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href={`/`}>
                  <a style={{ textDecoration: "none", color: "initial" }}>
                    Dashboard
                  </a>
                </Link>
                <Link color="inherit" href={`/partners`}>
                  <a style={{ textDecoration: "none", color: "initial" }}>
                    Socios
                  </a>
                </Link>
                <Typography color={"#000"}>
                  <Link
                    color="inherit"
                    href={`/partners/${partner.uuid}/investments`}
                  >
                    <a style={{ textDecoration: "none", color: "initial" }}>
                      {partner.profile.name}
                    </a>
                  </Link>
                </Typography>
              </Breadcrumbs>
            </Box>
            {Boolean(false) && (
              <Box py={3}>
                <Stack justifyContent={"center"} alignItems={"end"}>
                  <Button
                    onClick={toggleDropZone}
                    variant="contained"
                    startIcon={<SourceIcon />}
                  >
                    Actualizar contrato
                  </Button>
                </Stack>
              </Box>
            )}
            <If condition={showDropzone}>
              <FileUpload
                onDrop={handleDrop}
                multiple={false}
                maxSize={1024 * 1024 * 10}
                accept={{ "application/pdf": [".pdf"] }}
              />
            </If>
            <If condition={Boolean(contract.url)}>
              <Pdf url={contract.url} styles={{ height: "50vh" }} />
            </If>
          </Box>
        </Page>
      </Layout>
    </>
  );
}

export const getServerSideProps = withAuth(async (ctx: any) => {
  const props: Partial<Props> = {};

  const partnerId: string = ctx?.params?.partnerId;
  const tokenCookie = ctx.req?.headers.cookie;
  const { token } = cookie.parse(tokenCookie);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    props.partner = await getPartner(partnerId, config);
  } catch (error) {}

  return {
    props,
  };
});

interface Props {
  partner: User;
}
