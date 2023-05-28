import { Page } from "src/components/page";
import { withAuth } from "src/hofs/with-auth";
import { Layout } from "src/layout/default";

export default function Investments() {
  return (
    <>
      <Layout>
        <Page title="Inversiones">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia unde
            autem vel error at molestias voluptatem neque, exercitationem
            mollitia assumenda vitae dignissimos deleniti est optio rerum
            laudantium deserunt adipisci quidem!
          </p>
        </Page>
      </Layout>
    </>
  );
}

export const getServerSideProps = withAuth((ctx: any) => {
  return {
    props: {},
  };
});
