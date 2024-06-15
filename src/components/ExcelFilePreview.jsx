import styles from "../styles/ExcelFilePreview.module.css";
import excelScreenshot from "../assets/excel-screenshot-min.png";
import { Download } from "preact-feather";
import writeXlsxFile from "write-excel-file";

const HEADER_ROW = [
  {
    value: "Изделие №",
  },
  {
    value: "Общо",
  },
  {
    value: "Изделие №",
  },
  {
    value: "Общо",
  },
];
const fileName = "месечно изравняване";

export default function ExcelFilePreview({ excelData }) {
  async function handleDownload(event) {
    event.preventDefault();
    const data = [HEADER_ROW, ...excelData];
    await writeXlsxFile(data, { fileName });
  }

  return (
    <section class={styles.excel_file_preview} onClick={handleDownload}>
      <img
        class={styles.img}
        src={excelScreenshot}
        alt="Excel file screenshot"
        title="Изтегли файл"
      />
      <Download class={styles.download_icon} />
    </section>
  );
}
