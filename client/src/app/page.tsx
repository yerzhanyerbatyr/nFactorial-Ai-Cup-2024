import Image from "next/image";
import styles from "./page.module.css";
import Main from "./components/imageUpload";
import Head from 'next/head';
import Footer from './components/footer'

export default function Home() {
  return (
    <div>
      <main>
        <div className="welcome-container">
          <img src="https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/share/1fa84.jpg"></img>
          <h1>Welcome to PhotoClean</h1>
          <p>Your go-to solution for removing people from group photos.</p>
        </div>
        <div className="uploader-container">
          <Main></Main>
        </div>
        <Footer></Footer>
      </main>
    </div>
  );
}
