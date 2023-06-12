import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import * as pdfjs from "pdfjs-dist";
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import es_ES from "@react-pdf-viewer/locales/lib/es_ES.json";
import { ToolbarSlot } from "@react-pdf-viewer/toolbar";
import { IconButton, Tooltip } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import SearchIcon from "@mui/icons-material/Search";

import { Json } from "src/types/json.type";

export function Pdf(props: Props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar(Toolbar) {
      return (
        <Toolbar>
          {(props: ToolbarSlot) => {
            const {
              CurrentPageInput,
              Download,
              EnterFullScreen,
              GoToNextPage,
              GoToPreviousPage,
              NumberOfPages,
              Print,
              ShowSearchPopover,
              Zoom,
              ZoomIn,
              ZoomOut,
            } = props;
            return (
              <>
                <div style={{ padding: "0px 2px" }}>
                  <ShowSearchPopover>
                    {(props: any) => (
                      <Tooltip title="Buscar" arrow>
                        <IconButton {...props}>
                          <SearchIcon htmlColor="#CCC" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </ShowSearchPopover>
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <ZoomOut>
                    {(props: any) => (
                      <Tooltip title="Alejar" arrow>
                        <IconButton {...props}>
                          <ZoomInIcon htmlColor="#CCC" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </ZoomOut>
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <Zoom />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <ZoomIn>
                    {(props: any) => (
                      <Tooltip title="Acercar" arrow>
                        <IconButton {...props}>
                          <ZoomOutIcon htmlColor="#CCC" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </ZoomIn>
                </div>
                <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
                  <GoToPreviousPage>
                    {(props: any) => (
                      <Tooltip title="Página anterior" arrow>
                        <IconButton {...props}>
                          <KeyboardArrowUpIcon htmlColor="#FFF" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </GoToPreviousPage>
                </div>
                <div style={{ padding: "0px 2px", width: "4rem" }}>
                  <CurrentPageInput />
                </div>
                <div style={{ padding: "0px 2px", color: "#FFF" }}>
                  / <NumberOfPages />
                </div>
                <div style={{ padding: "0px 2px", color: "#FFF" }}>
                  <GoToNextPage>
                    {(props: any) => (
                      <Tooltip title="Página siguiente" arrow>
                        <IconButton {...props}>
                          <KeyboardArrowDownIcon htmlColor="#FFF" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </GoToNextPage>
                </div>
                <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
                  <EnterFullScreen>
                    {(props: any) => (
                      <Tooltip title="Pantalla completa" arrow>
                        <IconButton {...props}>
                          <FullscreenIcon htmlColor="#CCC" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </EnterFullScreen>
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <Download>
                    {(props: any) => (
                      <Tooltip title="Descargar" arrow>
                        <IconButton {...props}>
                          <DownloadIcon htmlColor="#CCC" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Download>
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <Print>
                    {(props: any) => (
                      <Tooltip title="Imprimir" arrow>
                        <IconButton {...props}>
                          <PrintIcon htmlColor="#CCC" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Print>
                </div>
              </>
            );
          }}
        </Toolbar>
      );
    },
  });

  return (
    <div style={{ minHeight: "calc(100vh - 200px)", ...props.styles }}>
      <Worker
        workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`}
      >
        <Viewer
          fileUrl={props.url}
          plugins={[defaultLayoutPluginInstance]}
          defaultScale={SpecialZoomLevel.PageFit}
          theme={"dark"}
          localization={es_ES}
        />
      </Worker>
    </div>
  );
}

interface Props {
  url: string;
  styles?: Json;
}
