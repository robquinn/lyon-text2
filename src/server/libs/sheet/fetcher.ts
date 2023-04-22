import OfficeResolver from '../utils/office';
import SheetManipulator from './manipulator';

export default class SheetFetcher
  extends SheetManipulator
  implements SheetFetcher.Instance
{
  offices(): SheetFetcher.Offices {
    const rows = this.sheetObject.getData();

    const offices: string[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const rawOffice = row.Office;
      const office = new OfficeResolver(
        rawOffice as OfficeResolver.Office
      ).getActual();
      if (!offices.includes(office)) offices.push(office);
    }
    return offices.sort();
  }

  roles(): SheetFetcher.Roles {
    const rows = this.sheetObject.getData();

    const roles: string[] = [];

    for (let i = 0; i < rows.length; i++) {
      const role = rows[i].Role as string;
      const userRoles = role.split(',').map((r) => r.trim());
      for (let j = 0; j < userRoles.length; j++) {
        const userRole = userRoles[j];
        if (!roles.includes(userRole)) roles.push(userRole);
      }
    }
    return roles.sort().map((r) => r.trim());
  }

  users(): SheetFetcher.Users {
    return this.sheetObject.getData();
  }

  messages(id: string): SheetFetcher.Messages {
    const rows = this.sheetObject.getData();

    const messages: SheetFetcher.Message[] = [];

    for (let i = 0; i < rows.length; i++) {
      const message = rows[i];
      if (id === message['Batch ID'])
        messages.push(message as unknown as SheetFetcher.Message);
    }
    return messages as SheetFetcher.Messages;
  }
}
