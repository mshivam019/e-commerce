import Head from "next/head";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Footer from "../../components/Footer";

export default function index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white w-full min-h-screen">
        <Header />
        <Container>
          <h3 className="text-gray-700 text-2xl font-medium block mt-16">
            About
          </h3>
        </Container>
        <Footer />
      </div>
    </div>
  );
}
