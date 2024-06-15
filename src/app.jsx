import "./app.css";
import ExcelFilePreview from "./components/ExcelFilePreview";
import ExcelFileUploader from "./components/ExcelFileUploader";
import { useState } from "preact/hooks";
import Loading from "./components/Loading";
import Error from "./components/Error";

export function App() {
  const [excelData, setExcelData] = useState([]);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleBeforeLoading() {
    setIsPreviewVisible(true);
    setLoading(true);
    setError(false);
  }

  function handleError() {
    setError(true);
    setLoading(false);
    setIsPreviewVisible(false);
  }

  function handleFileUploaderInput(data) {
    setExcelData(data);
    setLoading(false);
  }

  function renderExcelFilePreview() {
    if (loading) {
      return <Loading />;
    }
    return <ExcelFilePreview excelData={excelData} />;
  }

  return (
    <>
      {error ? <Error /> : null}
      {isPreviewVisible ? renderExcelFilePreview() : null}
      <ExcelFileUploader
        beforeLoad={handleBeforeLoading}
        onError={handleError}
        onInput={handleFileUploaderInput}
      />
    </>
  );
}
