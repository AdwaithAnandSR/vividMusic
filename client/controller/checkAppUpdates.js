import * as Updates from "expo-updates";

async function checkForUpdates() {
   const update = await Updates.checkForUpdateAsync();
   if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync(); // Reloads the app with the new update
   }
}
