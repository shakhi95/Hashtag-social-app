//
export const checkIfEnglish = (str = "") => {
  //
  const validCharacters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.";

  const inValidCharacters = str
    .split("")
    .filter((ch) => !validCharacters.includes(ch));

  return inValidCharacters.length === 0;
};

export const getFarsiDate = (timeStamp) => {
  //
  // input format : 1615971938848
  //output: چهارشنبه 27 اسفند 1399 - 12:35

  const days = [
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنج شنبه",
    "جمعه",
    "شنبه",
  ];

  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const time = new Date(timeStamp);
  const hr = time.getHours(); //12
  const min = time.getMinutes(); //35
  const dayOfWeek = days[time.getDay()]; //چهارشنبه
  const farsiDate = time
    .toLocaleDateString("fa-IR")
    .replace(/([۰-۹])/g, (token) =>
      String.fromCharCode(token.charCodeAt(0) - 1728)
    )
    .split("/"); // ["1399","12","27"]
  const month = months[Number(farsiDate[1]) - 1]; // اسفند

  const result = `${dayOfWeek} ${farsiDate[2]} ${month} ${farsiDate[0]} - ${hr}:${min}`;

  return result;
};

export const howLongAgo = (timeStamp) => {
  //
  const now = new Date().getTime();
  const diff = (now - timeStamp) / 1000; // in sec
  let result = "";
  let timeAgo;

  if (diff <= 60) {
    result = "همین الان";
  }
  if (diff > 60) {
    timeAgo = Math.floor(diff / 60);
    result = `${timeAgo} دقیقه پیش`;
  }
  if (diff > 3600) {
    timeAgo = Math.floor(diff / 3600);
    result = `${timeAgo} ساعت پیش`;
  }
  if (diff > 86400) {
    timeAgo = Math.floor(diff / 86400);
    result = `${timeAgo} روز پیش`;
  }
  if (diff > 2592000) {
    timeAgo = Math.floor(diff / 2592000);
    result = `${timeAgo} ماه پیش`;
  }

  return result;
};
