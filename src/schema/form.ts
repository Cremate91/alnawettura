import { z } from "zod";

export const formSchema = z.object({
  city: z.string().min(3, {
    message: "Du musst mindestens 3 Zeichen angeben."
  }).max(50, {
    message: "Du darfst maximal 50 Zeichen angeben."
  }),
})