
import Image from 'next/image'

export default function Download ({ styles }) {
  return (
    <a className={styles.download} download href="/data/latest.json">
      <Image
        width={32}
        height={32}
        src="/download.png"
        alt="Descargar datos"
      />
      Descargar últimos datos en formato JSON
    </a>
  );
}
