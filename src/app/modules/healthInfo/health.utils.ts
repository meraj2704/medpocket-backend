export const today =()=> new Date();
export const startOfDay =()=> new Date(today().setHours(0, 0, 0, 0));
export const endOfDay =()=> new Date(today().setHours(23, 59, 59, 999));
