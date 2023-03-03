import type { ApiContext, User } from "types"
import { fetcher } from "utils"

export type GetUserParams = {
  id: string
}

const getUser = async (
  context: ApiContext,
  params: GetUserParams,
): Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, "")}/users?id=${params.id}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "Context-Type": "application/json",
      },
    },
  )
}

export default getUser
