import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  BlobProvider,
  Image,
} from "@react-pdf/renderer";
import { MdFileDownload } from "react-icons/md";

const DownloadPDF = ({ content }) => {
  const handleDownlaodPDF = ({ blob, url }) => {
    console.log(content);
    console.log(blob);
    if (blob) {
      console.log(url);
      const link = document.createElement("a");
      link.href = blob.url;
      link.download = "Task.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log("Failed to Generate PDF");
    }
  };

  return (
    <>
      <BlobProvider document={<PDFDocument content={content} />}>
        {(blob, url, loading, error) => (
          <div>
            <MdFileDownload
              size={30}
              className="cursorPointer downloadButton"
              onClick={() => handleDownlaodPDF({ blob, url })}
            />
            {/* Download PDF */}
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
          </div>
        )}
      </BlobProvider>
    </>
  );
};

const PDFDocument = ({ content }) => (
  <Document>
    <Page>
      <View
        style={{
          flexDirection: "row",
          marginTop: "15px",
          justifyContent: "center",
          fontWeight: "900",
          fontSize: "30px",
        }}
      >
        <Text>TASKS</Text>
      </View>
      {content.map((item) => (
        <View key={item.id}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* Checkbox */}
            <View>
              {item.completed ? (
                <Image
                  src="checkboxCircle.png"
                  style={styles.checkBoxImg}
                />
              ) : (
                <Image
                  src="Circle.png"
                  style={styles.checkBoxImg}
                />
              )}
            </View>

            {/* Title */}
            <View style={{ marginLeft: 10 }}>
              {item.important ? (
                <Text
                  style={styles.impTitleText}
                >
                  {item.title}
                </Text>
              ) : (
                <Text
                  style={styles.titleText}
                >
                  {item.title}
                </Text>
              )}
            </View>
          </View>

          {/* Task */}
          <View>
            <Text style={styles.taskText}>{item.text}</Text>
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

export default DownloadPDF;

const styles = StyleSheet.create({
  taskText: {
    width: "85%",
    marginLeft: "45px",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    overflow: "hidden",
  },
  impTitleText: {
    width: "450px",
    color: "goldenrod",
    marginBottom: "20px",
    marginTop: "40px",
    fontSize: "25px",
    fontWeight: "800",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    overflow: "hidden",
  },
  titleText:{
    width: "450px",
    color: "black",
    marginBottom: "20px",
    marginTop: "40px",
    fontSize: "25px",
    fontWeight: "800",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    overflow: "hidden",
  },
  checkBoxImg:{
    marginRight: "10px",
    marginLeft: "10px",
    marginBottom: "20px",
    marginTop: "40px",
    height: "20px",
    width: "20px",
  }
});
