import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export function SuccessAlert(message = "") {
  toast({
    title: "SUCCESS",
    description: message,
    status: "success",
    duration: 2000,
    isClosable: true,
    position: "top",
  });
}

export function ErrorAlert(message = "") {
  toast({
    title: "FAILED",
    description: message,
    status: "error",
    duration: 3000,
    isClosable: true,
  });
}

var COUNTING_ARRAY = [
  '',
  'one ',
  'two ',
  'three ',
  'four ',
  'five ',
  'six ',
  'seven ',
  'eight ',
  'nine ',
  'ten ',
  'eleven ',
  'twelve ',
  'thirteen ',
  'fourteen ',
  'fifteen ',
  'sixteen ',
  'seventeen ',
  'eighteen ',
  'nineteen ',
];
var COUNRING_TEN_ARRAY = [
  '',
  '',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
];

export const amountToWords = (num) => {
  num = Number(num);
  if ((num = num.toString()).length > 9) return 'overflow';
  if (num === '0') return 'ZERO';
  let n = ('000000000' + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = '';
  str +=
    n[1] != 0
      ? (COUNTING_ARRAY[Number(n[1])] ||
        COUNRING_TEN_ARRAY[n[1][0]] + ' ' + COUNTING_ARRAY[n[1][1]]) +
      'crore '
      : '';
  str +=
    n[2] != 0
      ? (COUNTING_ARRAY[Number(n[2])] ||
        COUNRING_TEN_ARRAY[n[2][0]] + ' ' + COUNTING_ARRAY[n[2][1]]) + 'lakh '
      : '';
  str +=
    n[3] != 0
      ? (COUNTING_ARRAY[Number(n[3])] ||
        COUNRING_TEN_ARRAY[n[3][0]] + ' ' + COUNTING_ARRAY[n[3][1]]) +
      'thousand '
      : '';
  str +=
    n[4] != 0
      ? (COUNTING_ARRAY[Number(n[4])] ||
        COUNRING_TEN_ARRAY[n[4][0]] + ' ' + COUNTING_ARRAY[n[4][1]]) +
      'hundred '
      : '';
  str +=
    n[5] != 0
      ? (str != '' ? 'and ' : '') +
      (COUNTING_ARRAY[Number(n[5])] ||
        COUNRING_TEN_ARRAY[n[5][0]] + ' ' + COUNTING_ARRAY[n[5][1]]) +
      ''
      : '';
  return str.toUpperCase();
};

export const changeDateFormat = (date) => {
  if (date && dayjs(date).format('YYYY-MM-DD') !== "Invalid Date") {
    return dayjs(date).format('YYYY-MM-DD')
  }
  else {
    return null
  }
}