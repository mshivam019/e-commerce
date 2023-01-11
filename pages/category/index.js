import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import Category from "../../components/Category";


export default function index() {
    const [products, setProducts] = useState([]);
  useEffect(()=>{(async () => {
    // add your Realm App Id to the .env.local file
    const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const allProducts = await user.functions.getAllProducts();
      setProducts(() => allProducts);
    } catch (error) {
      console.error(error);
    }
  })()}, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Categories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Category
            category="All Products"
            categoryCount={`${products.length} Products available`}
          />
    </div>
  )
}


