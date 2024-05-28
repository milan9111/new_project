export const getInitials = (name: string) => {
  if (name !== null) {
    const nameArray = name.split(' ');
    const firstNameIn = nameArray[0].charAt(0).toUpperCase();
    const lastNameIn = nameArray[nameArray.length - 1].charAt(0).toUpperCase();

    // Firts Middle Last
    // return only FL
    return firstNameIn + lastNameIn;
  }

  return '';
};
