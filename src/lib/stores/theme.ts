import { writable } from "svelte/store";
import {z} from 'zod'


export const themeSchema = z.enum(['noroff', 'light', 'dark'])

type Theme = z.infer<typeof themeSchema>

export const themeStore = writable<Theme>('dark')