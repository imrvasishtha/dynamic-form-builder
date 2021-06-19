/* eslint-disable max-len */
import { words } from 'lodash';

export const required = (value) => (value || typeof value === 'number' ? undefined : 'Required');

export const arrayRequired = (value) => (Array.isArray(value) && value.length > 0 ? undefined : 'Required');

export const email = (value) => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email address'
  : undefined);

export const nonZeroValue = (value) => (value > 0 ? undefined : 'Required');

export const range = (min, max) => (value) => (!(value && Number(value) < max && Number(value) > min)
  ? `Must be between ${min} and ${max - 1}`
  : undefined);

export const maxLength = (max) => (value) => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const checkForDuplicates = (array) => new Set(array).size !== array.length;
export const validate = (values) => (values.groupName && !checkForDuplicates(values.groupName)
  ? undefined
  : 'Duplicate emails');
// export const validate = (values) => {
//
//   if (values.groupName && values.groupName.length > 1) {
//
//     if (checkForDuplicates(values.groupName)) {
//
//     }
//   }
// };

export const maxLength15 = maxLength(15);
export const maxLength20 = maxLength(20);
export const maxLength10 = maxLength(10);
export const maxLength50 = maxLength(50);
export const maxLength6 = maxLength(6);
export const maxLength8 = maxLength(8);
export const maxLength4 = maxLength(4);
export const maxLength100 = maxLength(100);

export const minLength = (min) => (value) => (value && value.length < min ? `Must be ${min} characters or more` : undefined);

export const minWords = (min) => (value) => {
  const wordsTyped = words(value).length;

  return value && wordsTyped < min
    ? `${wordsTyped} words. Please enter minimum of ${min} words`
    : undefined;
};

export const maxWords = (max) => (value) => {
  const wordsTyped = words(value).length;

  return value && wordsTyped > max
    ? `${wordsTyped} words. Please enter a maximum of ${max} words`
    : undefined;
};

export const minLength4 = minLength(4);
export const minLength10 = minLength(10);
export const minLength6 = minLength(6);

export const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
});

export const allowedImageFormats = [
  'jpg',
  'png',
  'jpeg',
  'svg',
  'gif',
  'JPG',
  'PNG',
  'JPEG',
  'SVG',
  'GIF',
];
export const allowedVideoFormats = ['mp4', 'webm', 'MP4', 'WEBM', 'm3u8'];
