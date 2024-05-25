import Image from "next/image";
import styles from "./page.module.css";
import ImageUpload from "./components/imageUpload";
import Head from 'next/head';
import Header from './components/header';

export default function Home() {
  return (
    <div>
      <Head>
        <title>PhotoClean</title>
        <meta name="description" content="Remove people from group photos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <h1>Welcome to PhotoClean</h1>
        <p>Your go-to solution for removing people from group photos.</p>
        <ImageUpload></ImageUpload>
      </main>
    </div>
  );
}
