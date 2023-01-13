import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as Realm from "realm-web";

import Header from "../../components/Header";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Products from "../../components/Products";

const CategoryDetails = () => {
  const [category, setCategory] = useState();
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      if (query.category) {
        // add your Realm App Id to the .env.local file
        const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();
        try {
          const user = await app.logIn(credentials);
          const oneCategory = await user.functions.getOneCategory(
            query.category
          );
          setCategory(() => oneCategory);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [query]);

  return (
    <>
      {category && (
        <>
          <Head>
            <title>MongoDB E-Commerce- {query.category}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="bg-white w-full min-h-screen">
            <Header />
            <Container>
              <Products products={category} />
            </Container>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default CategoryDetails;
