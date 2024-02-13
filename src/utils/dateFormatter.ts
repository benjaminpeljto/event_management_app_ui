
// Function to format Java LocalDateTime to date (d,m,y)
const formatDate = (javaDateTime: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      };
  
    const jsDate = new Date(javaDateTime);
  
    const formattedDate = jsDate.toLocaleDateString('en-US', options).replace(/\//g, '.');
  
    return formattedDate;
  };
  
  const formatTime = (javaDateTime: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
  
    const jsDate = new Date(javaDateTime);
  
    const formattedTime = jsDate.toLocaleTimeString('en-US', options);
  
    return formattedTime;
  };
  
  export { formatDate, formatTime };
  