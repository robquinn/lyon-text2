#! /bin/sh
# Script To Push SheetApp

# set scriptId and rootDir to the "Roster Mechanics (Sheet)" script for clasp
clasp settings scriptId $CLASP__DEV__SCRIPT_ID
clasp settings rootDir $CLASP__ROOT_DIR

# push the script with clasp
clasp push -f
