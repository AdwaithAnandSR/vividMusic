import * as DocumentPicker from "expo-document-picker";
import Constants from "expo-constants";
import axios from "axios";
import * as FileSystem from "expo-file-system"; // Import FileSystem
import { ToastAndroid } from "react-native";

const api = Constants.expoConfig.extra.api;

const handleUpload = async ({ setShowProgress, setProgress }) => {
   try {
      const res = await DocumentPicker.getDocumentAsync({
         copyToCacheDirectory: true,
         multiple: true,
         type: "audio/*"
      });

      if (res.canceled) return;

      setShowProgress(true);
      const formData = new FormData();
      res.assets.forEach(file => {
         formData.append("audioFiles", {
            uri: file.uri,
            type: file.mimeType,
            name: file.name
         });
      });

      try {
         const uploadRes = await axios.post(`${api}/addSongs`, formData, {
            headers: {
               "Content-Type": "multipart/form-data"
            },
            onUploadProgress: progressEvent => {
               const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
               );
               setProgress(percentCompleted);
               if (percentCompleted === 100) setShowProgress(false);
            }
         });
         ToastAndroid.show("Files uploaded successfully", ToastAndroid.SHORT);

         await Promise.all(
            res.assets.map(async file => {
               await FileSystem.deleteAsync(file.uri, { idempotent: true });
            })
         );
         setProgress(0);
      } catch (error) {
         ToastAndroid.show("File upload failed!", ToastAndroid.SHORT);
         console.error("Upload error:", error);
      }
   } catch (error) {
      console.error("Document picking error:", error);
   } finally {
      setShowProgress(false); 
      setProgress(0);
   }
};

export default handleUpload;
