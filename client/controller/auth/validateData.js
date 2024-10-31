import { Text } from 'react-native';

const validateData = (data, setMessage) => {
   if (data.username.trim().length < 5 || data.password.trim().length < 5) {
      setMessage(
         <Text
            style={{
               color: "red",
               marginHorizontal: "auto",
               marginVertical: 30
            }}>
            all fields required atleast 5 charectors!
         </Text>
      );
      return false;
   }
   return true;
};

export default validateData