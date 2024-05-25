import Image from "next/image";
import styles from "./page.module.css";
import ImageUpload from "./components/imageUpload";

export default function Home() {
  return (
    <main className={styles.main}>
      <ImageUpload></ImageUpload>
    </main>
  );
}
