import styles from "../styles/ExcelFileUploader.module.css";

import readXlsxFile, { readSheetNames } from "read-excel-file";

import { Upload } from "preact-feather";

const SHEET_NAME = "месечно изравняване";
const IMPORT = "import";
const EXPORT = "export";

export default function ExcelFileUploader({ beforeLoad, onError, onInput }) {
  function addProductStock(productsMap, number, stock, type) {
    if (number && stock) {
      if (productsMap.has(number)) {
        const stocks = productsMap.get(number);
        stocks.push({ stock, type });
        productsMap.set(number, stocks);
      } else {
        productsMap.set(number, [{ stock: parseInt(stock), type }]);
      }
    }
  }

  async function handleInput(event) {
    event.preventDefault();
    beforeLoad();

    try {
      const acceptedFiles = event.target.files;
      if (acceptedFiles) {
        const file = acceptedFiles[0];
        const sheetName = await readSheetNames(file).then((names) => {
          for (const name of names) {
            if (name === SHEET_NAME) {
              return name;
            }
          }
        });
  
        const rows = await readXlsxFile(file, { sheet: sheetName });
        const productsMap = new Map();
        for (let row = 1; row < rows.length; row++) {
          const currentRow = rows[row];
          const firstNumber = currentRow[0];
          const firstStock = currentRow[1];
          const secondNumber = currentRow[2];
          const secondStock = currentRow[3];
  
          addProductStock(productsMap, firstNumber, firstStock, IMPORT);
          addProductStock(productsMap, secondNumber, secondStock, EXPORT);
        }
  
        const sortedMapArray = Array.from(productsMap).sort((a, b) =>
          a[0].toString().localeCompare(b[0].toString())
        );
  
        const data = [];
        for (const [num, stocks] of sortedMapArray) {
          const isProductNumberNaN = isNaN(num);
          const ProductNumberType = isProductNumberNaN ? String : Number;
          const productNumber = isProductNumberNaN ? num : Number(num);
  
          let row = [];
          if (stocks.length === 1) {
            const { stock, type } = stocks[0];
            switch (type) {
              case IMPORT:
                row = [
                  {
                    type: ProductNumberType,
                    value: productNumber,
                  },
                  {
                    type: Number,
                    value: Number(stock),
                  },
                ];
                break;
              case EXPORT:
                row = [
                  {
                    type: null,
                    value: null,
                  },
                  {
                    type: null,
                    value: null,
                  },
                  {
                    type: ProductNumberType,
                    value: productNumber,
                  },
                  {
                    type: Number,
                    value: Number(stock),
                  },
                ];
                break;
              default:
                console.log("Incorrect type: ", type);
            }
          } else {
            for (const { stock, type } of stocks) {
              const stockRow = [
                {
                  type: ProductNumberType,
                  value: productNumber,
                },
                {
                  type: Number,
                  value: Number(stock),
                },
              ];
              if (type === IMPORT) {
                row.unshift(...stockRow);
              } else {
                row.push(...stockRow);
              }
            }
          }
  
          data.push(row);
        }
  
        onInput(data);
      }
    } catch (error) {
      console.error("Custom error: ", error);
      onError();
    }
  }

  return (
    <>
      <label class={styles.excel_file_upload} htmlFor={styles.file_input}>
        <Upload class={styles.upload_icon} /> Качи Excel файл
      </label>
      <input
        id={styles.file_input}
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onInput={handleInput}
      />
    </>
  );
}
