#! /bin/sh
# Script To Push SheetApp

# set scriptId and rootDir to the "Roster Mechanics (Sheet)" script for clasp
clasp settings scriptId $CLASP__PROD__SCRIPT_ID

# deploy the script with clasp (first deployment)
# clasp deploy

# deploy the script with clasp (this is after you've deloyed it once already)
clasp deploy -V $CLASP__DEV__WEBAPP_DEPLOYMENT_VERSION -d $CLASP__DEV__WEBAPP_DEPLOYMENT_DESCRIPTION -i $CLASP__DEV__WEBAPP_DEPLOYMENT_ID
