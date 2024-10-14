export const getRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  
  export const getRandomNumber = (digitCount: number): number => {
    const min = Math.pow(10, digitCount - 1); // Minimum value for the specified digit count
    const max = Math.pow(10, digitCount) - 1; // Maximum value for the specified digit count
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };