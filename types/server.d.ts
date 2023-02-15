export interface ServerOptions extends FetchOptions {
  baseURL?: string;
  needHeader?: boolean;
  params?: paramsObj;
  data?: object;
}

export interface FetchOptions extends RequestInit {
  method?: string;
  mode?: RequestMode | undefined;
  cache?: RequestCache | undefined;
  credentials?: RequestCredentials | undefined;
  headers?: HeadersInit | undefined;
  redirect?: RequestRedirect | undefined;
  referrerPolicy?: ReferrerPolicy | undefined;
  body?: any;
}

export interface getOKRSummary {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
}

export interface getList extends getOKRSummary {
  applyView: boolean;
  viewId: number;
}

export interface paramsObj {
  [key: string]: any;
}

export interface UserInfo {
  accountId: string;
  associationNames: [];
  avatarUrls: object;
  canEdit: boolean;
  canEditRole: boolean;
  designation: object;
  directReports: [];
  displayName: string;
  email: string | null;
  firstName: string | null;
  holidayScheme: string | null;
  id: number;
  key: string;
  lastName: string | null;
  manager: object;
  policyName: string | null;
  profileUrl: string | null;
  role: object;
  selectedAttributes: [];
  showEditButton: boolean;
  status: number;
  teams: [];
  userLogin: object;
  username: string;
  workWeek: string | null;
}

export interface FilterList {
  checkUnit: boolean;
  createdByDefaultValues: [];
  cycles: [];
  cyclesDefaultValues: [];
  isVisible: boolean;
  labelCondition: string;
  labels: [];
  labelsDefaultValues: [];
  levels: [];
  levelsDefaultValues: [];
  ownerTeams: [];
  ownerTeamsDefaultValues: [];
  owners: [];
  ownersDefaultValues: Array<UserInfo>;
  selectedFilters: [];
  statuses: [];
  teamLevels: [];
  teamLevelsDefaultValues: [];
  teamTypeObjLevels: [];
  teams: [];
  teamsDefaultValues: [];
  title: string;
  units: [];
  updatedByDefaultValues: [];
}