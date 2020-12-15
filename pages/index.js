import Head from "next/head";
import Link from "next/link";
import Header from "@components/Header";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/7-day-per-million">
        <a>7-day-per-million</a>
      </Link>
      <Link href="/14-day-per-1e5">
        <a>14-day-per-1e5</a>
      </Link>
      <Link href="/weekly-change">
        <a>weekly-change</a>
      </Link>
      <Link href="/chart">
        <a>chart</a>
      </Link>

      <main>
        <Header title="Välkommen till min app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <Footer />
    </div>
  );
}
