"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Image = {
  url: string;
};

// APIから画像を取得する関数
async function fetchCatImage(): Promise<Image> {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
}

export default function Home() {
  // 画像のURLを保持するステート
  const [imageUrl, setImageUrl] = useState<string>();

  // ボタンをクリックしたときに新しい画像を取得する
  const loadCatImage = async () => {
    setImageUrl(undefined); // 画像をリセット
    const image = await fetchCatImage();
    setImageUrl(image.url); // 画像をセット
  };

  // 最初の画像を読み込む
  // biome-ignore lint/correctness/useExhaustiveDependencies: 直接loadCatImageを依存に入れると無限ループになる。これはuseCallbackを使って解決できるが、初学者にとっては学ぶことが増えてしまうので、useCallbackを使わないことにする。
  useEffect(() => {
    loadCatImage();
  }, []);

  return (
    <div className={styles.page}>
      <button type="button" className={styles.button} onClick={loadCatImage}>
        他のにゃんこも見る
      </button>
      <div className={styles.frame}>
        {imageUrl && (
          <img className={styles.img} src={imageUrl} alt="ランダムな猫の画像" />
        )}
      </div>
    </div>
  );
}
