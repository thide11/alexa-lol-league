import { defineEventHandler } from 'h3';

export default defineEventHandler((request) => {
  return {
    working: true
  }
})