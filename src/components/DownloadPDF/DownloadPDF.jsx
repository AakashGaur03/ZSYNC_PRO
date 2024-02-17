import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  BlobProvider,
} from "@react-pdf/renderer";

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
            <button onClick={() => handleDownlaodPDF({ blob, url })}>
              Download PDF
            </button>
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
      {content.map((item) => (
        <View key={item.id} style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>Title : {item.title}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.status}>
              Status: {item.completed ? "Completed" : "Uncompleted"}
            </Text>
            <Text style={styles.important}>
              Important: {item.important ? "YES" : "NO"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Task : {item.text}</Text>
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
  },
  title: {
    // textAlign: "center",
    marginBottom: 12,
  },
  status: {},
  important: {},
  text: {},
});
export default DownloadPDF;
