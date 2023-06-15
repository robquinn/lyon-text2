/**
 * @OnlyCurrentDoc
 */

import getOffices from './libs/wrapper/offices';
import getRoles from './libs/wrapper/roles';
import getNinjas from './libs/wrapper/ninjas';
import getMessages from './libs/wrapper/messages';
import { onOpen, openAboutSidebar, openDialogMUI } from './libs/wrapper/ui';
import { processResponse, getSmsPreview } from './libs/form/process';
import doPost from './libs/wrapper/doPost';

export {
  doPost,
  onOpen,
  openAboutSidebar,
  openDialogMUI,
  getOffices,
  getRoles,
  getNinjas,
  processResponse,
  getSmsPreview,
  getMessages,
};

global.onOpen = onOpen;
global.doPost = doPost;
global.getOffices = getOffices;
global.getRoles = getRoles;
global.getNinjas = getNinjas;
global.processResponse = processResponse;
global.getSmsPreview = getSmsPreview;
global.getMessages = getMessages;
