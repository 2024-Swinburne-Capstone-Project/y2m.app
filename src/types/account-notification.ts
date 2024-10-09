import { AccountNotification as DBAccountNotification } from './db';

export interface AccountNotification extends DBAccountNotification {
  tempRead?: boolean;
}
