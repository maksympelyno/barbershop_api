import { Branch } from 'src/branch/schemas/branch.schema';

export interface JwtPayload {
  name: string;
  sub: string;
  role: string;
  branch: Branch;
}

export interface LoginResponse {
  name: string;
  role: string;
  branchId: Branch;
  access_token: string;
}
