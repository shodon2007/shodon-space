import { UserLogData } from "src/shared/types/UserTypes/UserLogType";
import { UserType } from "src/shared/types/UserTypes/userType";

export const LoginUser = async (user: UserLogData): Promise<void | UserType> => {


  const req = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })

  const res: UserType | { msgErr: string } = await req.json()
  if (!req.ok) return console.error(`Login is failed - ${res}`);

  return res as UserType
}