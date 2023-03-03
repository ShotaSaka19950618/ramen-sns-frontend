import { ApiContext, User } from "types"
import { fetcher } from "utils"

export type SigninPrams = {
  username: string
  password: string
}

const signin = async (
  context: ApiContext,
  params: SigninPrams,
): Promise<User> => {
  return await fetcher(`${context.apiRootUrl.replace(/\/$/g, "")}/auth/login`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
}

export default signin
