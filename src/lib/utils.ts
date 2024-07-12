import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import CryptoJS from 'crypto-js'

import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 生成唯一id
 * UUID
 * @returns
 */
export function GenerateUUID(): string {
  const uuid = uuidv4();
  return uuid.replaceAll('-', '');
}


export function md5(str: string) {
  return CryptoJS.MD5(str).toString()
}