import { Container } from "@mui/system";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "src/layout/default";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>
          Página no encontrada | The Healthy Program By Claris & Maby
        </title>
      </Head>
      <Layout>
        <main>
          <Container>
            <div className="error-box">
              <div className="fsp24 mt30 ttu tac">
                Oops... lo que estás buscando no está por aquí
              </div>
              <p className="parragraph">
                Si estás viendo es porque posiblemente:
              </p>
              <ul className="mb50">
                <li>La dirección ingresada es incorrecta</li>
                <li>La página ha sido eliminada</li>
              </ul>
              <Link href="/">
                <a className="btn btn--orange">Ir a la página principal</a>
              </Link>
            </div>
          </Container>
        </main>
      </Layout>
    </>
  );
}
