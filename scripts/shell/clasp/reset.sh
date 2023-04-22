#! /bin/sh
# Script to reset .clasp.json

# Remove the values from env vars in .env
perl -i -pe 's/(\s*\"[a-zA-Z0-9]+\"\s*:\s*\")([a-zA-Z0-9\-\_\/]*)(\",?)/\1VALUE_INJECTED_FROM_THE_ENV_FILE_AND_NEEDS_TO_BE_57_CHARS\3/g' .clasp.json
